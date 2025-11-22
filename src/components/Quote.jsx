import { ImQuotesLeft } from "react-icons/im";

export default function Quote({
    text = "You have a right to perform your prescribed duty, but you are not entitled to the fruits of actions.",
    author = "Bhagavad Gita",
}) {
    return (
        <div className="relative p-5 w-[95%] bg-white/1 border dark:border-gray-800 rounded-xl hover:bg-gray-800/30 transition">
            <ImQuotesLeft
                aria-hidden="true"
                /* smaller, left-aligned background svg */
                className="absolute left-6 top-1/2 -translate-y-1/2 w-40 h-32 sm:w-48 sm:h-40 text-zinc-100/20 dark:text-white/10 z-0 pointer-events-none"
            />

            {/* content sits above the SVG so it overlaps */}
            <div className="relative z-10 px-6 sm:px-10 flex flex-col justify-center min-h-[120px]">
                <p className="relative z-20 italic text-pretty font-mono font-medium text-zinc-300 dark:text-dark-white-300 leading-relaxed">
                    “{text}”
                </p>

                <p className="mt-4 text-right italic text-pretty text-white font-mono text-highlight hover:text-orange-400 transition duration-300">
                    — {author}
                </p>
            </div>
        </div>
    );
}