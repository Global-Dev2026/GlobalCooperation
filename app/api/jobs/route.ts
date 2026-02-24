import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get("department");
        const location = searchParams.get("location");
        const type = searchParams.get("type");

        // Build filter object
        const where: any = {
            isActive: true,
        };

        if (department && department !== "all") {
            where.department = department;
        }
        if (location && location !== "all") {
            where.location = location;
        }
        if (type && type !== "all") {
            where.type = type;
        }

        // Fetch jobs with filters
        const jobs = await prisma.job.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            data: jobs,
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch jobs",
            },
            { status: 500 },
        );
    }
}
