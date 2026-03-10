import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

        await prisma.application.delete({
            where: { id: appId },
        });

        return NextResponse.json({
            success: true,
            message: "Application deleted successfully",
        });
    } catch (error) {
        console.error("Failed to delete application", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete application" },
            { status: 500 }
        );
    }
}
