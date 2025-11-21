import React from "react";
import { posts as allPosts } from "@/blogs/Posts";

export default function BlogPostView({ slug, onNavigate = () => { } }) {
    const post = allPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="p-6 rounded-md border border-gray-800 bg-black/20 text-gray-300">
                <div className="mb-4">
                    <button
                        onClick={() => onNavigate("/blogs")}
                        className="text-sm px-3 py-1 rounded-md bg-black/30 border border-gray-800"
                    >
                        ← Back to Blog
                    </button>
                </div>
                <div>Post not found.</div>
            </div>
        );
    }

    const PostComponent = post.component;
    const date = post.date || post.publishedAt || null;

    const handleShare = async () => {
        const url = window.location.href;
        const shareData = { title: post.title, text: post.excerpt, url };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                /* ignore */
            }
        } else {
            // fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(url);
                alert("Link copied to clipboard");
            } catch {
                window.open(url, "_blank");
            }
        }
    };

    return (
        <article className="w-full max-w-3xl mx-auto">
            {/* Back + meta row */}
            <div className="flex items-center justify-between mb-4 gap-4">
                <div>
                    <button
                        onClick={() => onNavigate("/blogs")}
                        className="text-sm px-3 py-1 rounded-md bg-black/30 text-gray-300 border border-gray-800 hover:bg-black/40 transition"
                    >
                        ← Back to Blog
                    </button>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-400">
                    {date && (
                        <time dateTime={date} className="flex items-center gap-2">
                            <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{new Date(date).toLocaleDateString()}</span>
                        </time>
                    )}

                    <button
                        onClick={handleShare}
                        className="text-sm px-3 py-1 rounded-md bg-black/30 border border-gray-800 hover:bg-black/40 transition flex items-center gap-2"
                        title="Share"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v14" />
                        </svg>
                        Share
                    </button>
                </div>
            </div>

            {/* Hero */}
            {post.image ? (
                <div className="relative w-full rounded-lg overflow-hidden mb-6">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
            ) : null}

            {/* Title / tags / excerpt */}
            <header className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                    {(post.tags || []).map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded-full bg-black/40 border border-gray-800 text-gray-200">
                            {t}
                        </span>
                    ))}
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
                    {post.title}
                </h1>

                {post.excerpt && <p className="text-gray-400 mb-4">{post.excerpt}</p>}
            </header>

            <div className="w-full h-px bg-gray-700/30 my-6" />

            {/* content */}
            <div className="prose prose-invert max-w-none text-gray-200">
                <PostComponent />
            </div>

            <div className="w-full h-px bg-gray-700/30 my-8" />

            {/* footer actions */}
            <footer className="flex items-center justify-between text-sm text-gray-400">
                <div>Thanks for reading — feel free to share or browse other posts.</div>
                <div className="flex items-center gap-3">
                    <button onClick={handleShare} className="text-xs px-3 py-1 rounded-md bg-black/30 border border-gray-800 hover:bg-black/40 transition">
                        Share
                    </button>
                </div>
            </footer>
        </article>
    );
}