import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Careers from "@/components/sections/Careers";

export default function CareersPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <Careers />
            </main>
            <Footer />
        </>
    );
}
