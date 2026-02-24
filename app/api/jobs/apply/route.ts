import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { z } from "zod";

// Validator for application data
const applicationSchema = z.object({
    jobId: z.string().min(1, "Job ID is required"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    resumeUrl: z.string().url("Invalid URL for Resume/CV"),
    coverLetter: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validation = applicationSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed",
                    errors: validation.error.format()
                },
                { status: 400 }
            );
        }

        const { jobId, name, email, resumeUrl, coverLetter } = validation.data;

        // Check if job exists
        const job = await prisma.job.findUnique({
            where: { id: jobId },
        });

        if (!job) {
            return NextResponse.json(
                { success: false, message: "Job not found" },
                { status: 404 }
            );
        }

        // Create application in database
        const application = await prisma.application.create({
            data: {
                jobId,
                name,
                email,
                resumeUrl,
                coverLetter,
            },
        });

        // Send email to HR
        // Ideally this would go to a configured HR email, falling back to a default
        const hrEmail = process.env.HR_EMAIL || "hr@globalsoftsolution.com";

        try {
            if (resend) {
                await resend.emails.send({
                    from: 'Global Soft Solution <careers@globalsoftsolution.com>',
                    to: hrEmail,
                    subject: `New Application for ${job.title}: ${name}`,
                    html: `
            <h1>New Job Application</h1>
            <p><strong>Job:</strong> ${job.title}</p>
            <p><strong>Candidate:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Resume:</strong> <a href="${resumeUrl}">${resumeUrl}</a></p>
            <hr />
            <h3>Cover Letter:</h3>
            <p>${coverLetter || "No cover letter provided."}</p>
          `,
                });

                // Send confirmation to applicant
                await resend.emails.send({
                    from: 'Global Soft Solution <careers@globalsoftsolution.com>',
                    to: email,
                    subject: `Application Received: ${job.title}`,
                    html: `
            <h1>Application Received</h1>
            <p>Dear ${name},</p>
            <p>Thank you for applying for the <strong>${job.title}</strong> position at Global Soft Solution.</p>
            <p>We have received your application and will review it shortly. If your qualifications match our needs, we will contact you for an interview.</p>
            <br />
            <p>Best regards,</p>
            <p>Global Soft Solution HR Team</p>
          `,
                });
            } else {
                console.log("RESEND_API_KEY not set, skipping emails");
            }
        } catch (emailError) {
            console.error("Failed to send emails:", emailError);
            // Continue execution, don't fail the request just because email failed
        }

        return NextResponse.json({
            success: true,
            message: "Application submitted successfully",
            data: application,
        });

    } catch (error) {
        console.error("Error submitting application:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to submit application",
            },
            { status: 500 }
        );
    }
}
