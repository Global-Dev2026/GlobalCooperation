import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const applications = await prisma.application.findMany({
            where: {
                jobId: id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ success: true, data: applications });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch applications" },
            { status: 500 }
        );
    }
}
