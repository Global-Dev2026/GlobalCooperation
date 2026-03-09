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

        // Check if Supabase is configured
        if (!supabase) {
            console.error("Supabase client is not initialized. Check environment variables.");
            return NextResponse.json(
                { success: false, message: "Server configuration error: Document storage not available" },
                { status: 500 }
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
        const hrEmail = process.env.HR_EMAIL || "jobs@globalsoftsl.com";
        // Use verified domain sender — must match a verified domain in Resend
        const emailFrom = "jobs@globalsoftsl.com";

        let emailError: string | null = null;

        try {
            if (resend) {
                // Email to HR/Recruitment team with resume attached
                const hrResult = await resend.emails.send({
                    from: `Global Cooperation Careers <${emailFrom}>`,
                    to: hrEmail,
                    replyTo: email,
                    subject: `New Job Application: ${job.title} — ${name}`,
                    html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <h1 style="color: #841818; margin-bottom: 20px;">New Job Application</h1>

                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="margin-top: 0; color: #333;">Position Details</h3>
                    <p><strong>Job Title:</strong> ${job.title}</p>
                    <p><strong>Department:</strong> ${job.department}</p>
                    <p><strong>Location:</strong> ${job.location}</p>
                    <p><strong>Type:</strong> ${job.type}</p>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3 style="border-bottom: 2px solid #841818; padding-bottom: 5px; color: #333;">Candidate Information</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3 style="border-bottom: 2px solid #841818; padding-bottom: 5px; color: #333;">Cover Letter</h3>
                    <p style="white-space: pre-wrap; background-color: #fff; padding: 10px; border: 1px solid #eee; border-radius: 5px;">${coverLetter || "No cover letter provided."}</p>
                </div>

                <div style="padding-top: 15px; border-top: 1px solid #eee; font-size: 0.9em; color: #666;">
                    <p><em>The candidate&apos;s resume (${resume.name}) is attached to this email as a PDF.</em></p>
                    <p>View online: <a href="${resumeUrl}" style="color: #841818;">Open Resume</a></p>
                    <p><strong>Reply to this email</strong> to contact the candidate directly at ${email}.</p>
                </div>
            </div>
          `,
                    attachments: [
                        {
                            filename: resume.name,
                            content: resumeBuffer,
                        }
                    ]
                });

                if (hrResult.error) {
                    console.error("[Resend] HR email error:", hrResult.error);
                    emailError = hrResult.error.message;
                } else {
                    console.log("[Resend] HR email sent, id:", hrResult.data?.id);
                }

                // Confirmation email to applicant
                const applicantResult = await resend.emails.send({
                    from: `Global Cooperation <${emailFrom}>`,
                    to: email,
                    subject: `Application Received: ${job.title}`,
                    html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <h1 style="color: #841818; margin-bottom: 20px;">Application Received</h1>
                <p>Dear ${name},</p>
                <p>Thank you for applying for the <strong>${job.title}</strong> position at <strong>Global Cooperation</strong>.</p>
                <p>We have successfully received your application and resume. Our recruitment team will review your qualifications, and if they match our needs, we will contact you for an interview.</p>
                <p>Thank you for your interest in joining our team.</p>
                <br />
                <div style="border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px;">
                    <p style="margin: 0; font-weight: bold; color: #841818;">Global Cooperation HR Team</p>
                    <p style="margin: 0; color: #666; font-size: 0.9em;">Sri Lanka | jobs@globalsoftsl.com</p>
                </div>
            </div>
          `,
                });

                if (applicantResult.error) {
                    console.error("[Resend] Applicant confirmation email error:", applicantResult.error);
                } else {
                    console.log("[Resend] Applicant confirmation sent, id:", applicantResult.data?.id);
                }
            } else {
                console.warn("[Email] RESEND_API_KEY is not set — skipping email sending.");
                emailError = "Email service not configured";
            }
        } catch (err) {
            console.error("[Email] Unexpected error sending emails:", err);
            emailError = err instanceof Error ? err.message : "Unknown error";
            // We do NOT fail the request — the application is already saved in DB
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
