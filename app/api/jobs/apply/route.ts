import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { z } from "zod";

import { supabase } from "@/lib/supabase";

// Validator for application data
const applicationSchema = z.object({
    jobId: z.string().min(1, "Job ID is required"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    coverLetter: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const jobId = formData.get("jobId") as string;
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const coverLetter = formData.get("coverLetter") as string;
        const resume = formData.get("resume") as File | null;

        const body = { jobId, name, email, coverLetter };

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

        if (!resume) {
            return NextResponse.json(
                { success: false, message: "Resume file is required" },
                { status: 400 }
            );
        }

        if (resume.size > 2 * 1024 * 1024) {
            return NextResponse.json(
                { success: false, message: "Resume file size must be less than 2MB" },
                { status: 400 }
            );
        }

        if (resume.type !== "application/pdf") {
            return NextResponse.json(
                { success: false, message: "Resume must be a PDF file" },
                { status: 400 }
            );
        }

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

        // Upload resume to Supabase Storage
        const resumeBuffer = Buffer.from(await resume.arrayBuffer());
        const fileName = `${Date.now()}-${resume.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("resumes")
            .upload(fileName, resumeBuffer, {
                contentType: "application/pdf",
                upsert: false
            });

        if (uploadError) {
            console.error("Supabase upload error:", uploadError);
            return NextResponse.json(
                { success: false, message: "Failed to upload resume document" },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from("resumes")
            .getPublicUrl(uploadData.path);

        const resumeUrl = publicUrlData.publicUrl;

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
            <hr />
            <h3>Cover Letter:</h3>
            <p>${coverLetter || "No cover letter provided."}</p>
            <p><em>Resume attached as PDF.</em></p>
          `,
                    attachments: [
                        {
                            filename: resume.name,
                            content: resumeBuffer,
                        }
                    ]
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
            <p>We have received your application and resume successfully. If your qualifications match our needs, we will contact you for an interview.</p>
            <br />
            <p>Best regards,</p>
            <p>Global Soft Solution HR Team</p>
          `,
                });
            } else {
                console.log("RESEND_API_KEY not set, skipping emails", { attachments: resume.name });
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
