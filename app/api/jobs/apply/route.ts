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

        // ── Validate text fields ──────────────────────────────────────
        const validation = applicationSchema.safeParse({ jobId, name, email, coverLetter });
        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: validation.error.format() },
                { status: 400 }
            );
        }

        // ── Validate resume file ──────────────────────────────────────
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

        // ── Check if job exists ───────────────────────────────────────
        const job = await prisma.job.findUnique({ where: { id: jobId } });
        if (!job) {
            return NextResponse.json(
                { success: false, message: "Job not found" },
                { status: 404 }
            );
        }

        // ── Read resume into buffer (used for email attachment) ───────
        const resumeBuffer = Buffer.from(await resume.arrayBuffer());

        // ── Upload resume to Supabase (best-effort, non-blocking) ─────
        let resumeUrl = "";
        try {
            if (supabase) {
                const fileName = `${Date.now()}-${resume.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from("resumes")
                    .upload(fileName, resumeBuffer, { contentType: "application/pdf", upsert: false });

                if (uploadError) {
                    console.warn("[Supabase] Resume upload failed (non-fatal):", uploadError.message);
                } else {
                    const { data: publicUrlData } = supabase.storage
                        .from("resumes")
                        .getPublicUrl(uploadData.path);
                    resumeUrl = publicUrlData.publicUrl;
                    console.log("[Supabase] Resume uploaded:", resumeUrl);
                }
            } else {
                console.warn("[Supabase] Client not initialised — skipping cloud storage.");
            }
        } catch (storageErr) {
            console.warn("[Supabase] Unexpected storage error (non-fatal):", storageErr);
        }

        // ── Save application to database ──────────────────────────────
        const application = await prisma.application.create({
            data: { jobId, name, email, resumeUrl, coverLetter },
        });
        console.log("[DB] Application saved, id:", application.id);

        // ── Send emails via Resend ────────────────────────────────────
        const hrEmail = process.env.HR_EMAIL || "jobs@globalsoftsl.com";
        const emailFrom = "jobs@globalsoftsl.com"; // Must be a Resend-verified domain

        if (!resend) {
            console.warn("[Email] RESEND_API_KEY is not set — skipping emails.");
        } else {
            // 1️⃣  Email to HR team with CV attached
            try {
                const hrResult = await resend.emails.send({
                    from: `Global Cooperation Careers <${emailFrom}>`,
                    to: hrEmail,
                    replyTo: email,
                    subject: `New Job Application: ${job.title} — ${name}`,
                    html: `
                        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                            <div style="background:#841818;padding:24px 28px;">
                                <h1 style="margin:0;color:#fff;font-size:22px;">New Job Application</h1>
                                <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">via globalsoftsl.com Careers Portal</p>
                            </div>
                            <div style="padding:24px 28px;">
                                <table style="width:100%;border-collapse:collapse;margin-bottom:20px;background:#f9fafb;border-radius:8px;">
                                    <tr><td colspan="2" style="padding:10px 14px;font-weight:700;color:#374151;border-bottom:1px solid #e5e7eb;">Position Details</td></tr>
                                    <tr>
                                        <td style="padding:8px 14px;color:#6b7280;width:40%;">Job Title</td>
                                        <td style="padding:8px 14px;font-weight:600;color:#111827;">${job.title}</td>
                                    </tr>
                                    <tr style="background:#fff;">
                                        <td style="padding:8px 14px;color:#6b7280;">Department</td>
                                        <td style="padding:8px 14px;font-weight:600;color:#111827;">${job.department}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:8px 14px;color:#6b7280;">Location</td>
                                        <td style="padding:8px 14px;font-weight:600;color:#111827;">${job.location}</td>
                                    </tr>
                                    <tr style="background:#fff;">
                                        <td style="padding:8px 14px;color:#6b7280;">Type</td>
                                        <td style="padding:8px 14px;font-weight:600;color:#111827;">${job.type}</td>
                                    </tr>
                                </table>

                                <table style="width:100%;border-collapse:collapse;margin-bottom:20px;background:#f9fafb;border-radius:8px;">
                                    <tr><td colspan="2" style="padding:10px 14px;font-weight:700;color:#374151;border-bottom:1px solid #e5e7eb;">Candidate Information</td></tr>
                                    <tr>
                                        <td style="padding:8px 14px;color:#6b7280;width:40%;">Full Name</td>
                                        <td style="padding:8px 14px;font-weight:600;color:#111827;">${name}</td>
                                    </tr>
                                    <tr style="background:#fff;">
                                        <td style="padding:8px 14px;color:#6b7280;">Email</td>
                                        <td style="padding:8px 14px;"><a href="mailto:${email}" style="color:#841818;font-weight:600;">${email}</a></td>
                                    </tr>
                                </table>

                                <div style="margin-bottom:20px;">
                                    <p style="margin:0 0 8px;font-weight:700;color:#374151;">Cover Letter</p>
                                    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px;white-space:pre-wrap;color:#374151;font-size:14px;line-height:1.6;">
                                        ${coverLetter || "<em style='color:#9ca3af;'>No cover letter provided.</em>"}
                                    </div>
                                </div>

                                <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:14px;font-size:13px;color:#374151;">
                                    <p style="margin:0 0 6px;"><strong>📎 Resume attached:</strong> ${resume.name}</p>
                                    ${resumeUrl ? `<p style="margin:0;"><strong>🔗 Online copy:</strong> <a href="${resumeUrl}" style="color:#841818;">Open Resume</a></p>` : ""}
                                    <p style="margin:8px 0 0;color:#6b7280;font-size:12px;">Hit <strong>Reply</strong> to contact this candidate directly at ${email}</p>
                                </div>
                            </div>
                        </div>
                    `,
                    attachments: [{ filename: resume.name, content: resumeBuffer }],
                });

                if (hrResult.error) {
                    console.error("[Resend] HR email FAILED:", hrResult.error);
                } else {
                    console.log("[Resend] HR email sent successfully, id:", hrResult.data?.id);
                }
            } catch (hrEmailErr) {
                console.error("[Resend] HR email exception:", hrEmailErr);
            }

            // 2️⃣  Confirmation email to the applicant
            try {
                const applicantResult = await resend.emails.send({
                    from: `Global Cooperation <${emailFrom}>`,
                    to: email,
                    subject: `Application Received: ${job.title}`,
                    html: `
                        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                            <div style="background:#841818;padding:24px 28px;">
                                <h1 style="margin:0;color:#fff;font-size:22px;">Application Received ✓</h1>
                                <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">Global Cooperation Careers</p>
                            </div>
                            <div style="padding:24px 28px;">
                                <p style="color:#374151;">Dear <strong>${name}</strong>,</p>
                                <p style="color:#374151;">Thank you for applying for the <strong>${job.title}</strong> position at <strong>Global Cooperation</strong>.</p>
                                <p style="color:#374151;">We have successfully received your application and resume. Our team will review your qualifications, and if they match our needs, we will be in touch to arrange an interview.</p>
                                <p style="color:#6b7280;font-size:13px;">If you have any questions, feel free to reply to this email.</p>
                                <div style="border-top:1px solid #e5e7eb;margin-top:24px;padding-top:16px;">
                                    <p style="margin:0;font-weight:700;color:#841818;">Global Cooperation HR Team</p>
                                    <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">Sri Lanka &nbsp;|&nbsp; jobs@globalsoftsl.com</p>
                                </div>
                            </div>
                        </div>
                    `,
                });

                if (applicantResult.error) {
                    console.error("[Resend] Applicant confirmation FAILED:", applicantResult.error);
                } else {
                    console.log("[Resend] Applicant confirmation sent, id:", applicantResult.data?.id);
                }
            } catch (applicantEmailErr) {
                console.error("[Resend] Applicant email exception:", applicantEmailErr);
            }
        }

        return NextResponse.json({
            success: true,
            message: "Application submitted successfully",
            data: application,
        });

    } catch (error) {
        console.error("[Apply] Fatal error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to submit application" },
            { status: 500 }
        );
    }
}
