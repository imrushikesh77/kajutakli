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
                    Hi, I'm{' '}
                    <span aria-hidden>
                        {"Rushikesh".split('').map((ch, i) => {
                            const isSpace = ch === ' ';
                            const inFirstPart = i < 5; // "Rushi" -> orange, "kesh" -> blue
                            const color = isSpace ? undefined : (inFirstPart ? '#DB4400' : '#0048FF');

                            const onPointerEnter = (ev) => {
                                const el = ev.currentTarget;
                                if (!el) return;
                                const rect = el.getBoundingClientRect();
                                const x = ((ev.clientX - rect.left) / rect.width) * 100;
                                const y = ((ev.clientY - rect.top) / rect.height) * 100;
                                el.style.setProperty('--mx', `${x}%`);
                                el.style.setProperty('--my', `${y}%`);
                                const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                                el.style.setProperty('--r', reduced ? '150%' : '0%');
                                requestAnimationFrame(() => el.style.setProperty('--r', '150%'));
                            };

                            const onPointerLeave = (ev) => {
                                const el = ev.currentTarget;
                                if (!el) return;
                                el.style.setProperty('--r', '0%');
                            };

                            if (isSpace) return <span key={i} className="inline-block w-2" />;

                            return (
                                <span
                                    key={i}
                                    data-char={ch}
                                    className="name-letter inline-block relative select-none"
                                    onPointerEnter={onPointerEnter}
                                    onPointerLeave={onPointerLeave}
                                    style={{ ['--c']: color }}
                                >
                                    {ch}
                                </span>
                            );
                        })}
                    </span>{' '}
                    — <span className="text-gray-300 font-semibold">A Software Developer.</span>
                </h2>
                <p className="mt-4 text-gray-300 max-w-3xl">
                    I love to build scalable backend systems using{" "}
                    <span className="lang lang-orange">TypeScript</span>,{" "}
                    <span className="lang lang-blue">Python</span>,{" "}
                    <span className="lang lang-orange">C#</span>, and{" "}
                    <span className="lang lang-blue">PostgreSQL</span>. Focused on writing clean,
                    maintainable code and delivering high-quality software solutions.
                </p>
                <style>{`
                   .lang {
                     font-weight: 600;
                     display: inline-inline;
                     padding-bottom: 2px;
                     background-repeat: no-repeat;
                     background-position: 0 100%;
                     background-size: 0% 2px;
                     transition: background-size 360ms cubic-bezier(.2,.9,.2,1), color 200ms;
                     -webkit-font-smoothing: antialiased;
                   }
                   .lang:hover { background-size: 100% 2px; }
                   .lang-orange { color: #DB4400; background-image: linear-gradient(#DB4400, #DB4400); }
                   .lang-blue   { color: #0048FF; background-image: linear-gradient(#0048FF, #0048FF); }
 
                  /* per-letter name hover reveal */
                  .name-letter {
                    --mx: 50%;
                    --my: 50%;
                    --r: 0%;
                    --c: #DB4400;
                    position: relative;
                    display: inline-block;
                    line-height: 1;
                    /* render glyphs from pseudos to avoid stroke/halo */
                    color: transparent;
                    padding: 0 1px;
                    -webkit-font-smoothing: antialiased;
                    backface-visibility: hidden;
                    transform: translateZ(0);
                    will-change: opacity, transform;
                  }

                  .name-letter::before {
                    content: attr(data-char);
                    position: absolute;
                    inset: 0;
                    color: #ffffff;
                    pointer-events: none;
                    text-shadow: none;
                    -webkit-text-stroke: 0px transparent;
                    -webkit-font-smoothing: antialiased;
                    backface-visibility: hidden;
                    transform: translateZ(0);
                    z-index: 1;
                  }

                  .name-letter::after {
                    content: attr(data-char);
                    position: absolute;
                    inset: 0;
                    color: var(--c);
                    pointer-events: none;
                    text-shadow: none;
                    -webkit-text-stroke: 0px transparent;
                    -webkit-font-smoothing: antialiased;
                    backface-visibility: hidden;
                    transform: translateZ(0);
                    z-index: 2;
                    clip-path: circle(var(--r) at var(--mx) var(--my));
                    -webkit-clip-path: circle(var(--r) at var(--mx) var(--my));
                    transition: clip-path 420ms cubic-bezier(.2,.9,.2,1), -webkit-clip-path 420ms cubic-bezier(.2,.9,.2,1);
                    will-change: clip-path;
                  }

                   @media (prefers-reduced-motion: reduce) {
-                    .lang { transition: none; }
+                    .lang { transition: none; }
+                    .name-letter::after { transition: none; }
                   }
                 `}</style>
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