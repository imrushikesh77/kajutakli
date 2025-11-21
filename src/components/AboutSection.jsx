import Skills from "./Skills";
import Experience from "./Experience";
import Zensar from "@/assets/logos/zensar.jpeg";
import Catalinko from "@/assets/logos/catalinko.jpeg";

export default function AboutSection() {
    const skills = [
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "C#" },
        { name: "Python" },
        { name: "React" },
        { name: "PostgreSQL" },
        { name: "Docker" },
    ];

    const experience = [
        {
            title: "Software Engineer",
            company: "Zensar Technologies",
            companyLogo: Zensar,
            period: "Jan 2025 - Present",
            location: "Pune, India",
            bullets: [
                "Architected and delivered an AI‑driven, agentic automation framework leveraging OpenAI CUA, Playwright, and Python to autonomously operate complex canvas-based slot game UIs.",
                "Engineered API-driven automation workflows and multi-agent coordination using AWS Strands and Temporal to enable resilient, fault-tolerant orchestration of long-running pipelines.",
                "Built a .NET orchestration backend with PostgreSQL and AWS S3 for robust test lifecycle management, metrics collection, and artifact storage.",
                "Containerized agent and service stacks with Docker and produced CI-friendly images to ensure consistent, scalable, environment-agnostic execution.",
                "Automated processes that previously required 30+ manual hours per run, scaling execution to hundreds of concurrent workflows and dramatically reducing manual intervention and time-to-feedback."
            ],
        },
        {
            title: "Backend Developer Intern",
            company: "Catalinko Technologies",
            companyLogo: Catalinko,
            period: "Mar 2024 - Apr 2024",
            location: "Remote",
            bullets: [
                "Engineered a robust Cart & Wishlist service using AWS Lambda and GraphQL, improving data retrieval times by 50% and reducing infrastructure costs.",
                "Enhanced application performance by integrating backend APIs with the React Native frontend, delivering a faster and more responsive user experience.",
            ],
        },
    ];

    return (
        <div className="w-full">
            <header className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    Hi, I'm Rushikesh — <span className="text-gray-300 font-semibold">A Software developer (Backend).</span>
                </h2>
                <p className="mt-4 text-gray-300 max-w-3xl">
                    I love to build scalable backend systems using TypeScript, Python, C#, and PostgreSQL.
                    Focused on writing clean, maintainable code and delivering high-quality software solutions.
                </p>
            </header>

            <div className="mb-8">
                <h3 className="text-sm text-gray-300 font-medium mb-3">Technologies & Tools</h3>
                <Skills items={skills} />
            </div>

            <div className="mb-8">
                <div className="w-full h-px bg-gray-700/40 my-4" />
                <Experience items={experience} />
            </div>
        </div>
    );
}