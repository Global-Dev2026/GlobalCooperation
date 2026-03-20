import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InternshipPrograms from "@/components/sections/InternshipPrograms";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Internship Programs",
    description: "Kickstart your career with hands-on experience in software engineering, marketing, HR, and more at Global Cooperation (Pvt) Ltd.",
};

export default function InternshipsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <InternshipPrograms />
            </main>
            <Footer />
        </>
    );
}
