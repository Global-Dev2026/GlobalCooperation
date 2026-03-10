import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { auth } from "@/auth";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; appId: string }> }
) {
    try {
        const session = await auth();
        // @ts-ignore
        if (!session || session?.user?.role !== "ADMIN") {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { appId } = await params;

        // ── 1. Fetch the application to get the resumeUrl before deleting ──
        const application = await prisma.application.findUnique({
            where: { id: appId },
            select: { resumeUrl: true },
        });

        if (!application) {
            return NextResponse.json(
                { success: false, message: "Application not found" },
                { status: 404 }
            );
        }

        // ── 2. Delete the CV file from Supabase Storage ──────────────────
        if (application.resumeUrl && supabase) {
            try {
                // Extract the storage path from the public URL.
                // Public URL format:
                //   https://<ref>.supabase.co/storage/v1/object/public/resumes/<filePath>
                // We need just the part after "/resumes/" — that's the bucket-relative path.
                const url = new URL(application.resumeUrl);
                // pathname: /storage/v1/object/public/resumes/<filePath>
                const bucketPrefix = "/storage/v1/object/public/resumes/";
                if (url.pathname.startsWith(bucketPrefix)) {
                    const filePath = url.pathname.slice(bucketPrefix.length);
                    const { error: storageError } = await supabase.storage
                        .from("resumes")
                        .remove([decodeURIComponent(filePath)]);

                    if (storageError) {
                        // Log but don't fail the whole request — the DB record
                        // should still be removed even if storage cleanup fails.
                        console.warn(
                            "[Supabase] Failed to delete resume from storage:",
                            storageError.message
                        );
                    } else {
                        console.log("[Supabase] Resume deleted from storage:", filePath);
                    }
                }
            } catch (storageErr) {
                console.warn("[Supabase] Storage delete error (non-fatal):", storageErr);
            }
        }

        // ── 3. Delete the application record from the database ───────────
        await prisma.application.delete({
            where: { id: appId },
        });

        return NextResponse.json({
            success: true,
            message: "Application and resume deleted successfully",
        });
    } catch (error) {
        console.error("Failed to delete application", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete application" },
            { status: 500 }
        );
    }
}
