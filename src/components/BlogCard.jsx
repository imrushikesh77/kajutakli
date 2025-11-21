export default function BlogCard({ post }) {
    return (
        <article className="group rounded-lg overflow-hidden border border-gray-800 bg-black/18 transition-transform duration-180 ease-out hover:-translate-y-0.5 hover:border-gray-700 hover:bg-gray-800/30 transition">
            <div
                className="h-40 bg-center bg-cover transition-filter duration-220 ease-out group-hover:brightness-105"
                style={{
                    backgroundImage: `url(${post.image || "/placeholder-blog.jpg"})`,
                }}
                role="img"
                aria-label={post.title}
            />

            <div className="p-4">
                <h3 className="text-lg font-medium text-white leading-snug mb-1">{post.title}</h3>
                <p className="text-sm text-gray-300 mb-3 line-clamp-3">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2">
                    {(post.tags || []).map((t) => (
                        <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-full bg-black/30 border border-gray-800 text-gray-200 transition-colors duration-160 ease-out group-hover:bg-white/5"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}