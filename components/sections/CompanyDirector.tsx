"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BOARD_OF_DIRECTORS } from "@/lib/constants";

interface CompanyDirectorProps {
    directorIds: readonly string[];
    companyColor?: string;
}

export default function CompanyDirector({
    directorIds,
    companyColor = "#841818",
}: CompanyDirectorProps) {
    const directors = directorIds
        .map((id) => BOARD_OF_DIRECTORS.find((d) => d.id === id))
        .filter(Boolean) as (typeof BOARD_OF_DIRECTORS)[number][];

    if (directors.length === 0) return null;

    const isSingle = directors.length === 1;

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-px w-8" style={{ backgroundColor: companyColor }} />
                        <span
                            className="text-xs font-bold tracking-[0.25em] uppercase"
                            style={{ color: companyColor }}
                        >
                            Leadership
                        </span>
                        <div className="h-px w-8" style={{ backgroundColor: companyColor }} />
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                        {isSingle ? "Meet Our Director" : "Meet Our Directors"}
                    </h2>
                </div>

                {/* Director Card(s) */}
                <div
                    className={
                        isSingle
                            ? "max-w-2xl mx-auto"
                            : "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                    }
                >
                    {directors.map((director) => (
                        <div
                            key={director.id}
                            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10 flex flex-col sm:flex-row items-center gap-8"
                        >
                            {/* Photo */}
                            <div className="flex-shrink-0">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200">
                                    <Image
                                        src={director.image}
                                        alt={director.name}
                                        width={112}
                                        height={112}
                                        className="object-cover object-top w-full h-full"
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-center sm:text-left space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {director.name}
                                    </h3>
                                    <p
                                        className="text-sm font-semibold mt-1"
                                        style={{ color: companyColor }}
                                    >
                                        {director.position}
                                    </p>
                                    {director.education && (
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {director.education}
                                        </p>
                                    )}
                                </div>
                                <div className="h-px w-10 bg-gray-200 mx-auto sm:mx-0" />
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {director.bio}
                                </p>
                                {director.linkedin && director.linkedin !== "#" && (
                                    <Link
                                        href={director.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                                        style={{ color: companyColor }}
                                    >
                                        Connect on LinkedIn <ArrowRight className="w-4 h-4" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
