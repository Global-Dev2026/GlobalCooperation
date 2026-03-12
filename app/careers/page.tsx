import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Careers from "@/components/sections/Careers";
import { prisma } from "@/lib/prisma";

// Fetch jobs directly on the server — no client-side waterfall
async function getJobs() {
    try {
        const jobs = await prisma.job.findMany({
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
        });
        return jobs;
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        return [];
    }
}

export default async function CareersPage() {
    const jobs = await getJobs();

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <Careers initialJobs={jobs} />
            </main>
            <Footer />
        </>
    );
}
