import React from "react";

function getInitials(name = "") {
    return (name || "")
        .split(/\s+/)
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export default function Experience({ items = [] }) {
    return (
        <section>
            <h4 className="text-lg font-semibold text-white mb-4">Experience</h4>
            <div className="flex flex-col gap-6">
                {items.map((e, idx) => (
                    <article
                        key={idx}
                        className="p-4 rounded-md border border-gray-800 bg-white/1 hover:bg-gray-800/30 transition"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="w-12 h-12 flex-shrink-0 rounded-md bg-gray-900/40 border border-gray-800 overflow-hidden flex items-center justify-center">
                                    {e.companyLogo ? (
                                        <img
                                            src={e.companyLogo}
                                            alt={`${e.company} logo`}
                                            className="w-full h-full object-contain p-1"
                                        />
                                    ) : (
                                        <span className="text-sm font-semibold text-gray-200">
                                            {getInitials(e.company)}
                                        </span>
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <div className="text-sm text-gray-300 font-semibold truncate">
                                        {e.title}
                                    </div>
                                    <div className="text-xs text-gray-400 truncate">
                                        {e.company} · {e.location}
                                    </div>
                                </div>
                            </div>

                            <div className="text-xs text-gray-400">{e.period}</div>
                        </div>

                        <ul className="mt-3 list-disc list-inside text-gray-300 text-sm space-y-1">
                            {(e.bullets || []).map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}