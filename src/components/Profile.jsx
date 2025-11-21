import profileImg from "@/assets/profile.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const FLAG_URL = "https://knowindia.india.gov.in/assets/images/national_flag_inner.jpg";
const FAVICONS = {
    x: "https://x.com/favicon.ico",
    github: "https://github.com/favicon.ico",
    linkedin: "https://www.linkedin.com/favicon.ico",
};

export default function Profile({
    profileSrc,
    xHref = "https://x.com/kaju_takli",
    githubHref = "https://github.com/imrushikesh77",
    linkedinHref = "https://www.linkedin.com/in/imrushikesh77",
}) {
    const imgSrc = profileSrc || profileImg;

    const Icons = {
        x: FaXTwitter, // use Twitter icon for X branding (or replace with FaX if available)
        github: FaGithub,
        linkedin: FaLinkedin,
    };

    const ICON_COLOR = {
        x: "#ffffffff",         // X: black (or use '#1DA1F2' for old Twitter blue)
        github: "#9CA3AF",    // subtle gray for dark theme
        linkedin: "#0A66C2",  // LinkedIn blue
    };

    const socials = [
        { key: "x", title: "X (Twitter)", subtitle: "@kaju_takli", href: xHref, Icon: Icons.x },
        { key: "github", title: "GitHub", subtitle: "imrushikesh77", href: githubHref, Icon: Icons.github },
        { key: "linkedin", title: "LinkedIn", subtitle: "imrushikesh77", href: linkedinHref, Icon: Icons.linkedin },
    ];

    return (
        <div className="w-full flex justify-between items-start bg-transparent p-3 rounded-md border-b-[0.5px] border-gray-700/30">
            {/* Left: avatar (larger) with flag and name/bio placed bottom-right of avatar */}
            <div className="flex items-center w-[66%] min-w-0 gap-3">
                <img
                    src={imgSrc}
                    alt="profile"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full ring-1 ring-gray-700/60 bg-transparent select-none object-cover flex-shrink-0"
                />

                {/* text block always to the right of avatar; truncation prevents overflow */}
                <div className="mt-10 sm:mt-13 flex flex-col justify-center min-w-0">
                    <div className="font-semibold text-white leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl truncate max-w-[20ch]">
                        Kaju Takli
                    </div>
                    <div className="mt-0 sm:mt-1 text-sm sm:text-base text-gray-300">
                        <i>nullptr.</i>
                    </div>
                    <div className="mt-0 sm:mt-1 text-sm text-gray-300 whitespace-nowrap">
                        India
                    </div>
                </div>

                {/* spacer kept for layout parity on wide screens */}
                <div className="ml-[calc(40px+0.75rem)] hidden sm:block" />
            </div>

            {/* responsive rules for socials (550px / 460px) */}
            <style>{`
              /* default: show title+subtitle, socials column stretches */
              .social-subtitle { display: inline-block; }
              .social-title { display: inline-block; }
              .social-text { display: flex; }
              .social-item { width: 100%; display: flex; }
              .icon-wrapper svg { width: 20px; height: 20px; }
              .chev { display: inline-block; } /* default: show chevron */

              /* <= 550px: hide subtitle, hide chevron, show icon + title only, center social boxes and shrink to content */
              @media (max-width: 550px) {
                .social-subtitle { display: none !important; }
                .chev { display: none !important; }
                .socials-col { width: auto !important; max-width: none !important; align-items: center !important; }
                .social-item { 
                  width: auto !important;
                  padding: 6px 10px !important;
                  justify-content: center !important;
                  gap: .5rem !important;
                }
                .icon-wrapper { width: 36px !important; height: 36px !important; border-radius: 8px !important; }
                .icon-wrapper svg { width: 18px !important; height: 18px !important; }
              }

              /* <= 460px: hide titles, hide chevron, show icons only as square buttons aligned to the right */
              @media (max-width: 460px) {
                .social-title { display: none !important; }
                .social-text { display: none !important; }
                .chev { display: none !important; }
                .social-item {
                  width: 44px !important;
                  height: 44px !important;
                  padding: 0 !important;
                  border-radius: 8px !important;
                  justify-content: center !important;
                }
                .icon-wrapper {
                  width: 100% !important;
                  height: 100% !important;
                  border-radius: 8px !important;
                }
                .icon-wrapper svg { width: 20px !important; height: 20px !important; }
                /* keep the column aligned to the right when only icons remain */
                .socials-col { width: auto !important; max-width: none !important; align-items: flex-end !important; }
              }
            `}</style>

            {/* Right: social links (smaller) */}
            <div className="flex flex-col items-stretch w-[34%] max-w-[220px] space-y-2 min-w-0 socials-col">
                {socials.map((s) => {
                    const Icon = s.Icon;
                    const color = ICON_COLOR[s.key] || "#FFF";
                    return (
                        <a
                            key={s.key}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-item w-full flex items-center justify-between gap-2 bg-transparent border border-gray-800/60 rounded-md px-2 py-1.5 hover:bg-gray-800/30 transition"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <div
                                    className="icon-wrapper w-9 h-9 rounded-full bg-[#0b0b0b] flex items-center justify-center overflow-hidden border border-gray-700"
                                    aria-hidden="true"
                                >
                                    <Icon className="w-5 h-5" color={color} />
                                </div>

                                <div className="social-text flex flex-col min-w-0">
                                    <span className="social-title text-sm font-medium text-white truncate">{s.title}</span>
                                    <span className="social-subtitle text-xs text-gray-400 truncate">{s.subtitle}</span>
                                </div>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" className="chev w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    );
                })}
            </div>
        </div >
    );
}