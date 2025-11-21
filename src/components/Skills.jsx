import {
    SiTypescript,
    SiJavascript,
    SiPython,
    SiReact,
    SiPostgresql,
    SiDocker,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const ICON_MAP = {
    "TypeScript": SiTypescript,
    "JavaScript": SiJavascript,
    "C#": VscVscode,
    "Python": SiPython,
    "React": SiReact,
    "PostgreSQL": SiPostgresql,
    "Docker": SiDocker,
};

const ICON_COLOR = {
    "TypeScript": "#3178c6",
    "JavaScript": "#f7df1e",
    "C#": "#68217A",
    "Python": "#3776ab",
    "React": "#61dafb",
    "PostgreSQL": "#336791",
    "Docker": "#2496ed",
};

export default function Skills({ items = [] }) {
    return (
        <div className="flex flex-wrap gap-3">
            {items.map((s) => {
                const Icon = ICON_MAP[s.name];
                const color = ICON_COLOR[s.name] || "currentColor";
                return (
                    <span
                        key={s.name}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/1 border border-gray-800 text-sm transform transition duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-gray-800/30 transition group"
                        role="listitem"
                        aria-label={s.name}
                    >
                        {Icon ? (
                            <Icon
                                className="w-4 h-4 opacity-90 transition-opacity duration-150 group-hover:opacity-100"
                                color={color}
                                aria-hidden="true"
                            />
                        ) : (
                            // colored fallback dot
                            <span
                                className="w-3 h-3 rounded-full inline-block"
                                style={{ background: color }}
                                aria-hidden="true"
                            />
                        )}
                        <span className="font-medium text-gray-100">{s.name}</span>
                    </span>
                );
            })}
        </div>
    );
}