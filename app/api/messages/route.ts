import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import {
  resend,
  EMAIL_CONFIG,
  createContactEmailHtml,
  createContactEmailText,
} from "@/lib/email";

// Validation schema
const messageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  turnstileToken: z.string().min(1, "CAPTCHA token is required"),
});

// Verify Cloudflare Turnstile token
async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
        }),
      },
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verifying Turnstile token:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = messageSchema.parse(body);

    // Verify CAPTCHA token
    const isCaptchaValid = await verifyTurnstileToken(
      validatedData.turnstileToken,
    );

    if (!isCaptchaValid) {
      return NextResponse.json(
        {
          success: false,
          message: "CAPTCHA verification failed. Please try again.",
        },
        { status: 400 },
      );
    }

    // Save to database
    const message = await prisma.message.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
      },
    });

    // Send email notification
    try {
      if (resend) {
        await resend.emails.send({
          from: EMAIL_CONFIG.from,
          to: EMAIL_CONFIG.to,
          replyTo: validatedData.email,
          subject: `New Contact Form Message from ${validatedData.name}`,
          html: createContactEmailHtml(validatedData),
          text: createContactEmailText(validatedData),
        });
      } else {
        console.warn("Resend not configured - skipping email notification");
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Don't fail the request if email fails - message is still saved
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
        data: { id: message.id },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error saving message:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.issues,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again.",
      },
      { status: 500 },
    );
  }
}

// Optional: GET endpoint to retrieve messages (for admin panel)
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 50, // Limit to last 50 messages
    });

    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch messages",
      },
      { status: 500 },
    );
  }
}
