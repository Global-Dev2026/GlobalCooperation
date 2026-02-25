import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Global Tech (Private) Limited | Global Cooperation Group",
    description:
        "Global Tech (Private) Limited is Sri Lanka's trusted technology partner — delivering CCTV security systems, air conditioning solutions, and expert IT support and maintenance services.",
    keywords: [
        "Global Tech Sri Lanka",
        "CCTV installation Sri Lanka",
        "AC solutions Sri Lanka",
        "IT support Sri Lanka",
        "HVAC services",
        "security systems",
        "Global Cooperation Group",
    ],
    openGraph: {
        title: "Global Tech (Private) Limited",
        description:
            "Your trusted technology infrastructure partner in Sri Lanka — specializing in CCTV systems, AC solutions, and professional IT maintenance.",
        type: "website",
    },
};

export default function GlobalTechLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
