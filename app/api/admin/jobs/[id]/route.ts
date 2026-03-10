import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/auth";

const jobSchema = z.object({
    title: z.string().min(3),
    department: z.string().min(2),
    location: z.string().min(2),
    type: z.string().min(2),
    description: z.string().min(10),
    requirements: z.array(z.string()),
    responsibilities: z.array(z.string()),
    benefits: z.array(z.string()),
});

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        // @ts-ignore
        if (!session || session?.user?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const id = (await params).id;
        const body = await request.json();

        const validation = jobSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: validation.error.format() },
                { status: 400 }
            );
        }

        const job = await prisma.job.update({
            where: { id },
            data: validation.data,
        });

        return NextResponse.json({ success: true, data: job });
    } catch (error) {
        console.error("Failed to update job", error);
        return NextResponse.json({ success: false, message: "Failed to update job" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        // @ts-ignore
        if (!session || session?.user?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const id = (await params).id;

        await prisma.job.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
        console.error("Failed to delete job", error);
        return NextResponse.json({ success: false, message: "Failed to delete job" }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        // @ts-ignore
        if (!session || session?.user?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const id = (await params).id;
        const { isActive } = await request.json();

        if (typeof isActive !== "boolean") {
            return NextResponse.json({ success: false, message: "Invalid value for isActive" }, { status: 400 });
        }

        const job = await prisma.job.update({
            where: { id },
            data: { isActive },
        });

        return NextResponse.json({ success: true, data: job });
    } catch (error) {
        console.error("Failed to toggle job status", error);
        return NextResponse.json({ success: false, message: "Failed to update job status" }, { status: 500 });
    }
}

