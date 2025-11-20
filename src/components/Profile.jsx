import profileImg from "@/assets/profile.png";

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
        x: (props) => (
            <svg viewBox="0 0 24 24" {...props}>
                <path
                    d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                    fill="currentColor"
                />
            </svg>
        ),
        github: (props) => (
            <svg viewBox="0 0 24 24" {...props}>
                <path
                    d="M12 .297a12 12 0 00-3.793 23.4c.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.302-.536-1.52.117-3.166 0 0 1.008-.323 3.3 1.23a11.5 11.5 0 016 0c2.29-1.553 3.297-1.23 3.297-1.23.656 1.646.244 2.864.12 3.166.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.096.823 2.21 0 1.596-.014 2.882-.014 3.276 0 .32.216.694.825.576A12 12 0 0012 .297"
                    fill="currentColor"
                />
            </svg>
        ),
        linkedin: (props) => (
            <svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" {...props}>
                <path
                    d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
                    fill="currentColor"
                />
            </svg>
        ),
    };

    const socials = [
        { key: "x", title: "X (Twitter)", subtitle: "@kaju_takli", href: xHref, Icon: Icons.x },
        { key: "github", title: "GitHub", subtitle: "imrushikesh77", href: githubHref, Icon: Icons.github },
        { key: "linkedin", title: "LinkedIn", subtitle: "imrushikesh77", href: linkedinHref, Icon: Icons.linkedin },
    ];

    return (
        <div className="w-full flex justify-between items-start bg-transparent p-3 rounded-md border-b-[0.5px] border-gray-700/30">
            {/* Left: avatar (larger) with flag and name/bio placed bottom-right of avatar */}
            <div className="flex items-start w-[66%] min-w-0">
                <div className="relative flex-shrink-0">
                    <img
                        src={imgSrc}
                        alt="profile"
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full ring-1 ring-gray-700/60 bg-transparent select-none object-cover"
                    />

                    {/* larger flag at top-left of avatar */}
                    {/* <img
                        src={FLAG_URL}
                        alt="IN"
                        className="absolute -top-1 -left-1 w-14 h-10 sm:w-16 sm:h-12 rounded-sm border-[0.5px] border-white/10 shadow-sm object-cover"
                    /> */}

                    {/* username + bio placed to the right-bottom of avatar (bottom-ish) */}
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 sm:top-auto sm:bottom-2 sm:-translate-y-0">
                        <div className="text-xl sm:text-2xl font-semibold text-white leading-tight">kajutakli</div>
                        <div className="text-sm text-gray-300">nullptr.</div>
                    </div>
                </div>

                {/* keep this empty spacer so layout remains stable */}
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
                    return (
                        <a
                            key={s.key}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-item w-full flex items-center justify-between gap-2 bg-transparent border border-gray-800/60 rounded-md px-2 py-1.5 hover:bg-gray-800/30 transition"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="icon-wrapper w-9 h-9 rounded-full bg-[#0b0b0b] flex items-center justify-center overflow-hidden border border-gray-700">
                                    <Icon className="w-5 h-5 text-white" />
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