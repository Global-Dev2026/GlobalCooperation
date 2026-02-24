import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Global Tech (Private) Limited | Global Cooperation Group",
    description:
        "Global Tech (Pvt) Ltd is Sri Lanka's trusted technology partner — delivering POS systems, computer hardware, CCTV installation, custom software, website solutions, and supermarket advisory services.",
    keywords: [
        "Global Tech Sri Lanka",
        "POS systems Sri Lanka",
        "CCTV installation",
        "computer hardware supply",
        "custom software development",
        "supermarket advisory",
        "IT solutions Sri Lanka",
        "Global Cooperation Group",
    ],
    openGraph: {
        title: "Global Tech (Private) Limited",
        description:
            "Your one-stop technology partner in Sri Lanka — POS systems, hardware, CCTV, software, and expert advisory.",
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
