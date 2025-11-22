import profileImg from "@/assets/profile.png";
import React, { useEffect, useRef, useState } from "react";
import { RiTwitterXLine } from "react-icons/ri";
import { LiaMediumM, LiaLinkedinIn, LiaGithub } from "react-icons/lia";
import { createPortal } from "react-dom";

export default function Profile({
    profileSrc,
    xHref = "https://x.com/kaju_takli",
    githubHref = "https://github.com/imrushikesh77",
    linkedinHref = "https://www.linkedin.com/in/imrushikesh77",
    mediumHref = "https://medium.com/@ikajutakli",
}) {
    const imgSrc = profileSrc || profileImg;
    const avatarRef = useRef(null);
    const [showSticky, setShowSticky] = useState(false);
    const [anchorPos, setAnchorPos] = useState({ left: 16, top: 16, width: 0 });

    useEffect(() => {
        const el = avatarRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                // when original avatar is NOT intersecting viewport, show sticky
                setShowSticky(!entry.isIntersecting);
            },
            { threshold: 0 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // compute top-left of the "middle section" (closest centered/container ancestor)
    useEffect(() => {
        let raf = 0;

        function findAnchor(el) {
            // walk up from avatarRef to find a centered/container element
            let cur = el?.parentElement;
            while (cur && cur !== document.body) {
                const style = window.getComputedStyle(cur);
                // prefer elements with auto margins (centered) or common container classes
                if (style.marginLeft === "auto" && style.marginRight === "auto") return cur;
                if (cur.classList.contains("mx-auto") || cur.classList.contains("container") || /max-w-/.test([...cur.classList].join(" "))) return cur;
                cur = cur.parentElement;
            }
            // fallback to body
            return document.body;
        }

        function updatePos() {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const anchor = findAnchor(avatarRef.current);
                const rect = anchor.getBoundingClientRect();

                // include the anchor's horizontal padding so the belt covers the full inner area
                const style = window.getComputedStyle(anchor);
                const padL = parseFloat(style.paddingLeft) || 0;
                const padR = parseFloat(style.paddingRight) || 0;
                // expand left by padding-left and expand width by both paddings
                let left = rect.left - padL;
                let width = rect.width + padL + padR;
                // clamp to viewport so the belt never overflows the visible area
                left = Math.max(0, left);
                width = Math.min(width, window.innerWidth - left);
                const top = rect.top;
                setAnchorPos({ left, top, width });
            });
        }

        // initial
        updatePos();
        window.addEventListener("resize", updatePos);
        window.addEventListener("scroll", updatePos, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", updatePos);
            window.removeEventListener("scroll", updatePos);
        };
    }, []);

    const Icons = {
        x: RiTwitterXLine, // use Twitter icon for X branding (or replace with FaX if available)
        github: LiaGithub,
        linkedin: LiaLinkedinIn,
        medium: LiaMediumM,
    };

    const ICON_COLOR = {
        x: "#ffffffff",
        github: "#ffffffff",
        linkedin: "#ffffffff",
        medium: "#ffffffff",
    };

    const socials = [
        { key: "x", title: "X", subtitle: "@kaju_takli", href: xHref, Icon: Icons.x },
        { key: "github", title: "GitHub", subtitle: "imrushikesh77", href: githubHref, Icon: Icons.github },
        { key: "linkedin", title: "LinkedIn", subtitle: "imrushikesh77", href: linkedinHref, Icon: Icons.linkedin },
        { key: "medium", title: "Medium", subtitle: "@kajutakli", href: mediumHref, Icon: Icons.medium },
    ];

    return (
        <div className="w-full flex justify-between items-center bg-transparent p-3 rounded-md border-b-[0.5px] border-gray-700/30">
            {/* Left: avatar (larger) with flag and name/bio placed bottom-right of avatar */}
            <div className="flex items-center w-[66%] min-w-0 gap-3">
                <img
                    ref={avatarRef}
                    src={imgSrc}
                    alt="profile"
                    className="w-30 h-30 sm:w-40 sm:h-40 rounded-full ring-1 ring-gray-700/60 bg-transparent select-none object-cover flex-shrink-0"
                />

                {/* text block always to the right of avatar; truncation prevents overflow */}
                <div className="mt-10 sm:mt-13 flex flex-col justify-center min-w-0">
                    <div className="font-semibold text-white leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl truncate max-w-[20ch]">
                        {/*
                          Per-letter animated name.
                          - Kaju letters use orange (#FF7A18)
                          - Takli letters use blue (#1E90FF)
                          - On pointer enter we set CSS vars (--mx, --my) and animate --r via clip-path on ::after
                        */}
                        {"Kaju Takli".split('').map((ch, i) => {
                            const isSpace = ch === ' ';
                            const inFirstWord = i < 4; // "Kaju" length = 4
                            const color = isSpace ? undefined : (inFirstWord ? '#DB4400' : '#0048FF');

                            const handlePointerEnter = (ev) => {
                                const el = ev.currentTarget;
                                if (!el) return;
                                const rect = el.getBoundingClientRect();
                                const x = ((ev.clientX - rect.left) / rect.width) * 100;
                                const y = ((ev.clientY - rect.top) / rect.height) * 100;
                                // set center
                                el.style.setProperty('--mx', `${x}%`);
                                el.style.setProperty('--my', `${y}%`);
                                // start small then expand to fill
                                const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                                el.style.setProperty('--r', reduced ? '150%' : '0%');
                                // force reflow then expand (for animation)
                                // use requestAnimationFrame to ensure the initial value is applied
                                requestAnimationFrame(() => {
                                    el.style.setProperty('--r', '150%');
                                });
                            };

                            const handlePointerLeave = (ev) => {
                                const el = ev.currentTarget;
                                if (!el) return;
                                const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                                el.style.setProperty('--r', reduced ? '0%' : '0%');
                            };

                            if (isSpace) {
                                return <span key={i} className="inline-block w-2" />;
                            }

                            return (
                                <span
                                    key={i}
                                    data-char={ch}
                                    className="name-letter inline-block relative select-none"
                                    onPointerEnter={handlePointerEnter}
                                    onPointerLeave={handlePointerLeave}
                                    // assign the color var so CSS can pick it for ::after
                                    style={{ ['--c']: color }}
                                >
                                    {ch}
                                </span>
                            );
                        })}
                    </div>
                    <style>{`
                      .name-letter {
                        --mx: 50%;
                        --my: 50%;
                        --r: 0%;
                        --c: #FF7700;
                        position: relative;
                        display: inline-block;
                        line-height: 1;
                        /* make the actual element paint-less — rendered by pseudos to avoid halo/stroke */
                        color: transparent;
                        padding: 0 1px;
                        -webkit-font-smoothing: antialiased;
                        backface-visibility: hidden;
                        transform: translateZ(0);
                        will-change: opacity, transform;
                      }

                      /* base white glyph (beneath) */
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

                      /* colored overlay duplicates the character and is revealed with clip-path circle */
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
                        /* reveal via circular clip centered at pointer entry */
                        clip-path: circle(var(--r) at var(--mx) var(--my));
                        -webkit-clip-path: circle(var(--r) at var(--mx) var(--my));
                        transition: clip-path 420ms cubic-bezier(.2,.9,.2,1), -webkit-clip-path 420ms cubic-bezier(.2,.9,.2,1);
                        will-change: clip-path;
                      }

                      /* respect reduced motion: jump instead of animate */
                      @media (prefers-reduced-motion: reduce) {
                        .name-letter::after {
                          transition: none;
                        }
                      }
                     `}</style>
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

            {/* Right: socials as centered 2x2 icon grid */}
            <div className="grid grid-cols-2 gap-3 justify-items-center content-center">
                {socials.map((s) => {
                    const Icon = s.Icon;
                    const color = ICON_COLOR[s.key] || "#FFF";
                    return (
                        <a
                            key={s.key}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.title}
                            className="w-14 h-14 sm:w-14 sm:h-14 rounded-lg border border-gray-800/60 flex items-center justify-center bg-transparent hover:bg-gray-800/30 transition-transform duration-150 ease-out hover:-translate-y-0.5"
                        >
                            {/* icon fills the whole box */}
                            <Icon
                                className="w-full h-full p-1"
                                color={color}
                                aria-hidden="true"
                                preserveAspectRatio="xMidYMid slice"
                            />
                        </a>
                    );
                })}
            </div>
            {/* render sticky avatar into document.body so it isn't clipped by transformed/overflowed parents */}
            {typeof document !== "undefined" &&
                createPortal(
                    // glassy/blurry "belt" anchored to middle section behind the sticky avatar
                    // - rigid top & bottom borders only (border-t & border-b)
                    // - left/right edges smoothly fade using CSS mask-image
                    <div
                        aria-hidden="true"
                        style={{
                            left: `${anchorPos.left}px`,
                            top: `${anchorPos.top}px`,
                            width: `${anchorPos.width}px`,
                            height: "56px",
                            // fade the left/right edges via mask so borders/contents vanish smoothly
                            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                            maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                        }}
                        className={
                            "fixed rounded-md overflow-hidden backdrop-blur-md bg-white/5 dark:bg-white/5 border-t border-b border-gray-700/30 z-[9998] transition-all duration-200 " +
                            (showSticky ? "opacity-100" : "opacity-0 pointer-events-none")
                        }
                    />,
                    document.body
                )}
            {typeof document !== "undefined" &&
                createPortal(
                    // center avatar vertically inside the 56px belt by placing top at belt midpoint
                    <img
                        src={imgSrc}
                        alt=""
                        aria-hidden
                        style={{
                            left: `${anchorPos.left}px`,
                            // belt height is 56px -> place top at anchor top + 28px then translateY(-50%)
                            top: `${anchorPos.top + 28}px`,
                            // use inline transform to keep translateY(-50%) plus scale for the show/hide animation
                            transform: showSticky ? "translateY(-50%) scale(1)" : "translateY(-50%) scale(.9)",
                        }}
                        className={
                            "fixed w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-1 ring-gray-700/60 bg-transparent z-[9999] transition-all duration-200 " +
                            (showSticky ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
                        }
                    />,
                    document.body
                )}
        </div >
    );
}