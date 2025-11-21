import { useEffect, useCallback, useState } from "react";
import AboutSection from "./AboutSection";
import BlogsSection from "./BlogsSection";
import BlogPostView from "./BlogPostView";
// future: import ProjectsSection from "./ProjectsSection";

// derive initial active tab + slug synchronously to avoid flashing wrong content on refresh
function getInitialState() {
    if (typeof window === "undefined") {
        return { active: "about", slug: null };
    }
    const path = (window.location && window.location.pathname) || "/";
    if (!path || path === "/") return { active: "about", slug: null };
    const parts = path.split("/").filter(Boolean);
    if (parts[0] === "blogs") {
        return { active: "blogs", slug: parts[1] || null };
    }
    return { active: "about", slug: null };
}

export default function SectionTabs() {
    const initial = getInitialState();
    const [active, setActive] = useState(initial.active);
    const [openSlug, setOpenSlug] = useState(initial.slug);

    const parsePath = useCallback(() => {
        if (typeof window === "undefined") return;
        const path = window.location.pathname || "/";
        if (path === "/" || path === "") {
            setActive("about");
            setOpenSlug(null);
            return;
        }
        const parts = path.split("/").filter(Boolean);
        if (parts[0] === "blogs") {
            setActive("blogs");
            setOpenSlug(parts[1] || null);
            return;
        }
        setActive("about");
        setOpenSlug(null);
    }, []);

    useEffect(() => {
        // keep state in sync with back/forward navigation
        const onPop = () => parsePath();
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, [parsePath]);

    const navigate = (to) => {
        if (typeof window === "undefined") return;
        if (window.location.pathname !== to) {
            window.history.pushState({}, "", to);
        }
        parsePath();
    };

    const tabs = [
        { id: "about", label: "About" },
        { id: "blogs", label: "Blogs" }
    ];

    return (
        <section className="w-full my-6">
            <nav className="w-full flex gap-4 px-4 sm:px-6">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => {
                            setActive(t.id);
                            setOpenSlug(null);
                            if (t.id === "about") navigate("/");
                            if (t.id === "blogs") navigate("/blogs");
                        }}
                        aria-pressed={active === t.id}
                        className={`text-base sm:text-lg font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center min-w-[88px]
              ${active === t.id ? "bg-brand-accent/10 text-white" : "text-gray-400 hover:text-white/90"}
            `}
                    >
                        {t.label}
                    </button>
                ))}
            </nav>

            <div className="w-full mt-6 px-4 sm:px-6">
                <div className="transition-opacity duration-200">
                    {openSlug ? (
                        <BlogPostView slug={openSlug} onNavigate={navigate} />
                    ) : (
                        <>
                            {active === "about" && <AboutSection />}
                            {active === "blogs" && <BlogsSection onOpenPost={(slug) => navigate(`/blogs/${slug}`)} />}
                            {active === "projects" && (
                                <div className="p-6 rounded-md border border-gray-800 bg-black/20 text-gray-400">
                                    Projects section coming next.
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}