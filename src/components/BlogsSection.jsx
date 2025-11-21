import BlogCard from "./BlogCard";
import { posts as allPosts } from "@/blogs/Posts";
import { useMemo, useState } from "react";

export default function BlogsSection({ onOpenPost = () => { } }) {
    const [selectedTag, setSelectedTag] = useState(null);

    // derive tag counts from posts
    const tags = useMemo(() => {
        const counts = {};
        allPosts.forEach((p) => {
            (p.tags || []).forEach((t) => {
                counts[t] = (counts[t] || 0) + 1;
            });
        });
        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    }, []);

    const filtered = useMemo(() => {
        if (!selectedTag) return allPosts;
        return allPosts.filter((p) => (p.tags || []).includes(selectedTag));
    }, [selectedTag]);

    return (
        <section className="w-full">
            <header className="mb-6">
                <h2 className="mt-2 text-gray-300 max-w-3xl">
                    Thoughts, tutorials, and insights on engineering and programming.
                </h2>
            </header>

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="text-sm font-medium text-gray-300 mb-3">Popular Tags</div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`text-xs px-3 py-1 rounded-full ${!selectedTag ? "bg-brand-accent/20 text-white" : "bg-black/30 text-gray-200"} border border-gray-800`}
                        >
                            All <span className="opacity-70 ml-1">({allPosts.length})</span>
                        </button>

                        {tags.map((t) => (
                            <button
                                key={t.name}
                                onClick={() => setSelectedTag((s) => (s === t.name ? null : t.name))}
                                className={`text-xs px-3 py-1 rounded-full border border-gray-800 ${selectedTag === t.name ? "bg-brand-accent/20 text-white" : "bg-black/30 text-gray-200 hover:bg-white/1 transition"}`}
                            >
                                {t.name} <span className="opacity-70 ml-1">({t.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-gray-700/30 my-6" />

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg text-white font-semibold">Latest Posts <span className="text-gray-400 text-sm">({filtered.length} posts)</span></h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filtered.map((p) => (
                        <div key={p.slug} className="block">
                            {/* use onClick to open post via parent navigate (prevents full page reload) */}
                            <button
                                onClick={() => onOpenPost(p.slug)}
                                className="w-full text-left"
                                aria-label={`Open ${p.title}`}
                            >
                                <BlogCard post={p} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}