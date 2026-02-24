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

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        // @ts-ignore
        if (!session || session?.user?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const validation = jobSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: validation.error.format() },
                { status: 400 }
            );
        }

        const job = await prisma.job.create({
            data: validation.data,
        });

        return NextResponse.json({ success: true, data: job });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to create job" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ success: true, data: jobs });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch jobs" }, { status: 500 });
    }
}
