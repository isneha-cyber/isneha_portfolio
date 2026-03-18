import { useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { projects } from "../data/projects";

function useGSAP(cb, deps = []) {
  useEffect(() => {
    let cleanup = () => {};
    const existing = window.gsap && window.ScrollTrigger;
    const run = () => {
      const gsap = window.gsap;
      const ST = window.ScrollTrigger;
      gsap.registerPlugin(ST);
      cleanup = cb(gsap, ST) ?? (() => {});
    };
    if (existing) {
      run();
    } else {
      const s1 = document.createElement("script");
      const s2 = document.createElement("script");
      s1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      s2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      s1.onload = () => {
        document.head.appendChild(s2);
        s2.onload = run;
      };
      document.head.appendChild(s1);
    }
    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default function WorkDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex] ?? projects[0];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const heroTitleRef = useRef(null);
  const sidebarRef = useRef(null);
  const galleryRef = useRef(null);
  const nextRef = useRef(null);
  const safetyTimerRef = useRef(null);
  const videoRef = useRef(null); // ✅ INSIDE component

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  // ✅ Force video play with muted via JS — INSIDE component
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, [project.videoUrl]);

  useGSAP(
    (gsap, ST) => {
      ST.getAll().forEach((t) => t.kill());
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);

      if (heroTitleRef.current) {
        gsap.set(heroTitleRef.current, { yPercent: 100, opacity: 0 });
      }

      gsap.fromTo(
        heroTitleRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.2 }
      );

      safetyTimerRef.current = setTimeout(() => {
        if (heroTitleRef.current) {
          gsap.set(heroTitleRef.current, { yPercent: 0, opacity: 1, clearProps: "transform,opacity" });
        }
      }, 2000);

      const staggerEls = sidebarRef.current?.querySelectorAll(".gsap-stagger");
      if (staggerEls?.length) {
        gsap.fromTo(
          staggerEls,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.5 }
        );
      }

      galleryRef.current?.querySelectorAll(".gsap-img").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 8, opacity: 0, scale: 1.04 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      galleryRef.current?.querySelectorAll(".gsap-text").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      if (nextRef.current) {
        gsap.fromTo(
          nextRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: nextRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      return () => {
        ST.getAll().forEach((t) => t.kill());
        if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      };
    },
    [slug]
  );

  const handleNextClick = useCallback(() => {
    navigate(`/works/${nextProject.slug}`);
  }, [navigate, nextProject.slug]);

  return (
    <div
      className="workdetail-root"
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f0ede8",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400&display=swap');

        .workdetail-root *,
        .workdetail-root *::before,
        .workdetail-root *::after { box-sizing: border-box; }

        .workdetail-root ::-webkit-scrollbar { width: 4px; }
        .workdetail-root ::-webkit-scrollbar-track { background: #0a0a0a; }
        .workdetail-root ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }

        .font-display { font-family: 'Playfair Display', serif; }
        .font-mono { font-family: 'DM Mono', monospace; }

        .img-hover {
          filter: grayscale(75%);
          transition: filter 0.7s ease, transform 0.7s ease;
          will-change: filter, transform;
        }
        .img-hover:hover {
          filter: grayscale(0%);
          transform: scale(1.04);
        }

        .link-line { position: relative; display: inline-flex; align-items: center; gap: 6px; }
        .link-line::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #f0ede8;
          transition: width 0.4s ease;
        }
        .link-line:hover::after { width: 100%; }

        .next-hover .next-title {
          transition: transform 0.7s cubic-bezier(.22,1,.36,1);
          display: inline-block;
        }
        .next-hover:hover .next-title { transform: scale(1.05) translateY(-4px); }

        .next-hover .next-bg {
          opacity: 0.15;
          filter: grayscale(70%);
          transition: opacity 0.8s ease, filter 0.8s ease;
        }
        .next-hover:hover .next-bg {
          opacity: 0.35;
          filter: grayscale(0%);
        }

        .grid-lines {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 0;
          display: grid; grid-template-columns: repeat(9, 1fr);
        }
        .grid-line { border-right: 1px solid rgba(240,237,232,0.04); height: 100%; }

        @media (max-width: 639px) { .grid-lines { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 640px) and (max-width: 1023px) { .grid-lines { grid-template-columns: repeat(6, 1fr); } }

        @media (max-width: 1023px) {
          .sidebar-el { border-bottom: 1px solid rgba(240,237,232,0.08) !important; }
          .img-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 1024px) {
          .main-layout { flex-direction: row !important; }
          .sidebar-el {
            width: 38% !important;
            height: 100vh !important;
            position: sticky !important;
            top: 0 !important;
            border-right: 1px solid rgba(240,237,232,0.07) !important;
          }
          .content-el { width: 62% !important; }
        }
      `}</style>

      <div className="grid-lines">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="grid-line" />
        ))}
      </div>

      <main
        className="main-layout"
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
          overflowX: "hidden",
        }}
      >
        {/* ─── LEFT SIDEBAR ─── */}
        <aside
          ref={sidebarRef}
          className="sidebar-el"
          style={{
            width: "100%",
            padding: "clamp(2rem, 5vw, 5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <div>
            <div className="gsap-stagger" style={{ marginBottom: "3rem" }}>
              <Link to="/works" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    width: 36, height: 36,
                    background: "#f0ede8",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </div>
              </Link>
            </div>

            <div style={{ overflow: "hidden", marginBottom: "1.5rem", paddingBottom: "0.3em", paddingTop: "0.1em" }}>
              <h1
                ref={heroTitleRef}
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 6vw, 7rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: "#f0ede8",
                  willChange: "transform, opacity",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {project.title.toUpperCase()}
              </h1>
            </div>

            <div className="gsap-stagger" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
              <span className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "rgba(240,237,232,0.35)", textTransform: "uppercase" }}>
                {project.category}
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(240,237,232,0.08)" }} />
              <a href={project.visitUrl} target="_blank" rel="noopener noreferrer"
                className="link-line font-mono"
                style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,237,232,0.5)", textDecoration: "none" }}>
                VISIT SITE
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            <p className="gsap-stagger" style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)", color: "rgba(240,237,232,0.6)", lineHeight: 1.75, marginBottom: "3rem", maxWidth: 420 }}>
              {project.about}
            </p>

            <div className="gsap-stagger">
              <p className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(240,237,232,0.25)", textTransform: "uppercase", marginBottom: "1rem", paddingTop: "2rem", borderTop: "1px solid rgba(240,237,232,0.07)" }}>
                Team
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {project.members.map((m) => (
                  <li key={m.handle} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: 500 }}>{m.name}</p>
                      <p className="font-mono" style={{ fontSize: "0.65rem", color: "rgba(240,237,232,0.3)", marginTop: 2 }}>{m.handle}</p>
                    </div>
                    <span className="font-mono" style={{ fontSize: "0.62rem", color: "rgba(240,237,232,0.25)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {m.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="gsap-stagger" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "1.2rem" }}>
              {[
                <path key="tw" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
                <g key="li">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </g>,
              ].map((paths, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(240,237,232,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ cursor: "pointer", transition: "stroke 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.stroke = "#f0ede8")}
                  onMouseLeave={(e) => (e.currentTarget.style.stroke = "rgba(240,237,232,0.3)")}>
                  {paths}
                </svg>
              ))}
            </div>
            <a href={project.visitUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.6rem 1.2rem", border: "1px solid rgba(240,237,232,0.15)", borderRadius: 100, fontSize: "0.7rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", color: "rgba(240,237,232,0.6)", transition: "border-color 0.3s, color 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(240,237,232,0.5)"; e.currentTarget.style.color = "#f0ede8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(240,237,232,0.15)"; e.currentTarget.style.color = "rgba(240,237,232,0.6)"; }}>
              Visit Website
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </aside>

        {/* ─── RIGHT CONTENT ─── */}
        <section
          ref={galleryRef}
          className="content-el"
          style={{ width: "100%", padding: "clamp(1rem, 3vw, 2.5rem)", display: "flex", flexDirection: "column", gap: "clamp(1rem, 2vw, 1.5rem)" }}
        >
          {/* VIDEO */}
          {project.videoUrl && (
            <div
              className="gsap-img"
              style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#111", aspectRatio: "16/9" }}
            >
              <video
                ref={videoRef}
                key={project.videoUrl}
                src={project.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.6))", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "1.2rem", left: "1.4rem" }}>
                <span className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.4)" }}>
                  Project Overview — {project.year}
                </span>
              </div>
            </div>
          )}

          {/* IMAGES 2×2 */}
          <div className="gsap-img img-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(0.5rem, 1.2vw, 1rem)" }}>
            {project.images.map((src, i) => (
              <div key={i} style={{ position: "relative", borderRadius: 10, overflow: "hidden", background: "#111", aspectRatio: "4/3" }}>
                <img src={src} alt={`${project.title} view ${i + 1}`} className="img-hover"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", bottom: "0.8rem", right: "0.9rem" }}>
                  <span className="font-mono" style={{ fontSize: "0.55rem", letterSpacing: "0.14em", color: "rgba(240,237,232,0.3)", textTransform: "uppercase" }}>
                    {String(i + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ─── NEXT PROJECT ─── */}
      <div
        ref={nextRef}
        className="next-hover"
        style={{ position: "relative", zIndex: 1, overflow: "hidden", background: "#0d0d0d", cursor: "pointer", borderTop: "1px solid rgba(240,237,232,0.07)" }}
        onClick={handleNextClick}
      >
        <img src={nextProject.images?.[0]} alt="" className="next-bg"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(6rem, 18vw, 14rem) 2rem", textAlign: "center" }}>
          <span className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(240,237,232,0.3)", marginBottom: "1.2rem", display: "block" }}>
            Next Project
          </span>
          <h2 className="next-title font-display" style={{ fontSize: "clamp(5rem, 14vw, 13rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.86, color: "#f0ede8" }}>
            {nextProject.title.toUpperCase()}
          </h2>
          <div style={{ marginTop: "2.5rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: "0.68rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(240,237,232,0.45)", border: "1px solid rgba(240,237,232,0.18)", padding: "0.6rem 1.4rem", borderRadius: 100 }}>
              View Project
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}