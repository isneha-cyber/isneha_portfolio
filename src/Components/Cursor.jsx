import { useEffect, useRef, useState, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const COLORS = {
  dot: "#ffffff",
  ring: "rgba(107,114,128,1)",
  ringHover: "rgba(107,114,128,1)",
  ringText: "rgba(107,114,128,1)",
  ringMagnetic: "rgba(107,114,128,1)",
};

const SIZE = { dot: 7, ring: 42 };

const INTERACTIVE_SELECTOR =
  "a, button, [data-cursor-hover], [data-cursor-text], [data-cursor-magnetic]";

// ─── GSAP Loader (CDN, no install) ────────────────────────────────────────────
function loadGSAP() {
  return new Promise((resolve) => {
    if (window.gsap) return resolve(window.gsap);
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    s.onload = () => resolve(window.gsap);
    document.head.appendChild(s);
  });
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const gsapRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const stateRef = useRef("idle"); // idle | hover | text | magnetic
  const lastTouchedEl = useRef(null);
  const touchStartPos = useRef({ x: 0, y: 0 });

  const [cursorText, setCursorText] = useState("");
  const [visible, setVisible] = useState(false);

  // ── RAF loop: smooth ring follow ──────────────────────────────────────────
  const tick = useCallback(() => {
    if (!gsapRef.current) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    const gsap = gsapRef.current;
    const lerpFactor = stateRef.current === "magnetic" ? 0.08 : 0.13;

    ring.current.x += (mouse.current.x - ring.current.x) * lerpFactor;
    ring.current.y += (mouse.current.y - ring.current.y) * lerpFactor;

    if (ringRef.current) {
      gsap.set(ringRef.current, {
        x: ring.current.x - SIZE.ring / 2,
        y: ring.current.y - SIZE.ring / 2,
      });
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // ── Shared position update ────────────────────────────────────────────────
  const updatePosition = useCallback((x, y) => {
    mouse.current = { x, y };
    if (dotRef.current && gsapRef.current) {
      gsapRef.current.set(dotRef.current, {
        x: x - SIZE.dot / 2,
        y: y - SIZE.dot / 2,
      });
    }
  }, []);

  // ── Mouse move ────────────────────────────────────────────────────────────
  const onMouseMove = useCallback(
    (e) => {
      updatePosition(e.clientX, e.clientY);
      setVisible(true);
    },
    [updatePosition]
  );

  // ── Enter / Leave ─────────────────────────────────────────────────────────
  const onEnter = useCallback((e) => {
    const el = e.currentTarget ?? e;
    const text = el.dataset?.cursorText || "";
    const isMagnetic = el.hasAttribute?.("data-cursor-magnetic");
    const gsap = gsapRef.current;
    if (!gsap || !ringRef.current || !dotRef.current || !labelRef.current)
      return;

    if (isMagnetic) {
      stateRef.current = "magnetic";
      gsap.to(ringRef.current, {
        scale: 2.2,
        borderColor: COLORS.ringMagnetic,
        duration: 0.4,
        ease: "expo.out",
      });
      gsap.to(dotRef.current, { scale: 0, duration: 0.3, ease: "expo.out" });
    } else if (text) {
      stateRef.current = "text";
      setCursorText(text);
      gsap.to(ringRef.current, {
        scale: 2.8,
        borderColor: COLORS.ringText,
        duration: 0.4,
        ease: "expo.out",
      });
      gsap.to(dotRef.current, { scale: 0, duration: 0.3, ease: "expo.out" });
      gsap.to(labelRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(2)",
      });
    } else {
      stateRef.current = "hover";
      gsap.to(ringRef.current, {
        scale: 1.7,
        borderColor: COLORS.ringHover,
        duration: 0.4,
        ease: "expo.out",
      });
      gsap.to(dotRef.current, { scale: 1.8, duration: 0.3, ease: "expo.out" });
    }
  }, []);

  const onLeave = useCallback(() => {
    stateRef.current = "idle";
    const gsap = gsapRef.current;
    if (!gsap || !ringRef.current || !dotRef.current || !labelRef.current)
      return;

    gsap.to(ringRef.current, {
      scale: 1,
      borderColor: COLORS.ring,
      duration: 0.5,
      ease: "expo.out",
    });
    gsap.to(dotRef.current, { scale: 1, duration: 0.4, ease: "expo.out" });
    gsap.to(labelRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
    setTimeout(() => setCursorText(""), 200);
  }, []);

  // ── Click / tap flash ─────────────────────────────────────────────────────
  const triggerClickFlash = useCallback(() => {
    const gsap = gsapRef.current;
    if (!gsap || !ringRef.current) return;
    gsap.fromTo(
      ringRef.current,
      { scale: stateRef.current === "idle" ? 1 : 1.7 },
      { scale: 0.6, duration: 0.12, ease: "power3.in", yoyo: true, repeat: 1 }
    );
  }, []);

  // ── Touch handlers ────────────────────────────────────────────────────────
  const onTouchStart = useCallback(
    (e) => {
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;

      // Record start position to detect scroll vs tap
      touchStartPos.current = { x, y };

      // Snap ring immediately to finger position
      ring.current = { x, y };
      updatePosition(x, y);
      setVisible(true);

      // Detect if finger landed on an interactive element
      const el = document.elementFromPoint(x, y);
      const interactive = el?.closest(INTERACTIVE_SELECTOR);
      if (interactive) {
        lastTouchedEl.current = interactive;
        onEnter({ currentTarget: interactive, dataset: interactive.dataset });
      }
    },
    [updatePosition, onEnter]
  );

  const onTouchMove = useCallback(
    (e) => {
      // NO e.preventDefault() — allow native scroll to work freely
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - touchStartPos.current.x);
      const dy = Math.abs(touch.clientY - touchStartPos.current.y);

      // If moved more than 8px it's a scroll — hide cursor and bail
      if (dx > 8 || dy > 8) {
        setVisible(false);
        if (lastTouchedEl.current) {
          onLeave();
          lastTouchedEl.current = null;
        }
        return;
      }

      updatePosition(touch.clientX, touch.clientY);
    },
    [updatePosition, onLeave]
  );

  const onTouchEnd = useCallback(() => {
    triggerClickFlash();
    if (lastTouchedEl.current) {
      onLeave();
      lastTouchedEl.current = null;
    }
    // Hide cursor immediately after finger lifts
    setVisible(false);
  }, [triggerClickFlash, onLeave]);

  // ── Init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;

    loadGSAP().then((gsap) => {
      if (!mounted) return;
      gsapRef.current = gsap;

      // Only hide native cursor on real pointer devices (mouse/trackpad)
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      if (hasFinePointer) {
        document.documentElement.style.cursor = "none";
      }

      gsap.set(dotRef.current, { x: -50, y: -50 });
      gsap.set(ringRef.current, { x: -50, y: -50 });

      rafRef.current = requestAnimationFrame(tick);

      // Attach mouse hover listeners to interactive elements
      const attachHoverListeners = () => {
        const targets = document.querySelectorAll(INTERACTIVE_SELECTOR);
        targets.forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
      };

      attachHoverListeners();

      // Re-attach on DOM mutations (dynamic content)
      const observer = new MutationObserver(attachHoverListeners);
      observer.observe(document.body, { childList: true, subtree: true });

      // Mouse events
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("click", triggerClickFlash);
      window.addEventListener("mouseleave", () => setVisible(false));
      window.addEventListener("mouseenter", () => setVisible(true));

      // Touch events — all passive: true so scroll is never blocked
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });

      return () => observer.disconnect();
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", triggerClickFlash);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.documentElement.style.cursor = "";
    };
  }, [tick, onMouseMove, triggerClickFlash, onTouchStart, onTouchMove, onTouchEnd]);

  return (
    <>
      {/* DOT */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: SIZE.dot,
          height: SIZE.dot,
          background: COLORS.dot,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
          willChange: "transform",
          transition: "opacity 0.3s",
        }}
      />

      {/* RING */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: SIZE.ring,
          height: SIZE.ring,
          border: `1.5px solid ${COLORS.ring}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          willChange: "transform",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.3s",
        }}
      >
        {/* TEXT LABEL inside ring */}
        <span
          ref={labelRef}
          style={{
            fontSize: "0.5rem",
            fontFamily: "'DM Mono', 'Courier New', monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#fff",
            opacity: 0,
            transform: "scale(0.5)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          {cursorText}
        </span>
      </div>
    </>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// DEMO PAGE — shows all cursor states
// ─────────────────────────────────────────────────────────────────────────────
export function CursorDemo() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        color: "#f0ede8",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3rem",
        padding: "4rem 2rem",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <Cursor />

      <div style={{ textAlign: "center", maxWidth: 560 }}>
        <p
          style={{
            fontSize: "0.65rem",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.3)",
            marginBottom: "1rem",
          }}
        >
          Custom Cursor — All States
        </p>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#f0ede8",
          }}
        >
          Move your mouse around
        </h1>
      </div>

      {/* Triggers grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          width: "100%",
          maxWidth: 800,
        }}
      >
        <Card label="Default Hover" sub="data-cursor-hover" attr={{ "data-cursor-hover": true }}>
          Hover me — ring grows &amp; brightens
        </Card>

        <Card label="Text Label" sub='data-cursor-text="VIEW"' attr={{ "data-cursor-text": "VIEW" }}>
          Hover me — label appears in ring
        </Card>

        <Card label="Magnetic" sub="data-cursor-magnetic" attr={{ "data-cursor-magnetic": true }}>
          Hover me — ring turns sluggish
        </Card>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          data-cursor-text="OPEN"
          style={{
            background: "rgba(240,237,232,0.05)",
            border: "1px solid rgba(240,237,232,0.1)",
            borderRadius: 12,
            padding: "2rem",
            textDecoration: "none",
            color: "#f0ede8",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span style={{ fontSize: "0.6rem", fontFamily: "'DM Mono',monospace", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.35)" }}>Link Element</span>
          <span style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(240,237,232,0.65)" }}>{"<a> tags trigger automatically"}</span>
        </a>

        <button
          style={{
            background: "#f0ede8",
            color: "#0c0c0c",
            border: "none",
            borderRadius: 12,
            padding: "2rem",
            fontFamily: "'DM Sans',sans-serif",
            cursor: "none",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span style={{ fontSize: "0.6rem", fontFamily: "'DM Mono',monospace", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>Button Element</span>
          <span style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(10,10,10,0.7)" }}>{"<button> tags trigger automatically"}</span>
        </button>

        <Card label="Click Test" sub="try clicking" attr={{ "data-cursor-hover": true }}>
          Click anywhere — ring pulses inward
        </Card>
      </div>

      {/* Code snippet */}
      <div
        style={{
          background: "#111",
          border: "1px solid rgba(240,237,232,0.08)",
          borderRadius: 12,
          padding: "1.5rem 2rem",
          maxWidth: 800,
          width: "100%",
        }}
      >
        <p style={{ fontSize: "0.6rem", fontFamily: "'DM Mono',monospace", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.25)", marginBottom: "1rem" }}>Usage</p>
        <pre style={{ fontSize: "0.78rem", fontFamily: "'DM Mono',monospace", color: "rgba(240,237,232,0.6)", lineHeight: 1.8, overflow: "auto" }}>{`// 1. Mount once in your app root
import Cursor from './Cursor'
<Cursor />

// 2. Hover state (ring grows)
<div data-cursor-hover>…</div>

// 3. Text label in ring
<div data-cursor-text="VIEW">…</div>

// 4. Magnetic (slow follow)
<div data-cursor-magnetic>…</div>

// <a> and <button> trigger automatically`}</pre>
      </div>
    </div>
  );
}

// ─── Helper card for demo ─────────────────────────────────────────────────────
function Card({ label, sub, attr, children }) {
  return (
    <div
      {...attr}
      style={{
        background: "rgba(240,237,232,0.04)",
        border: "1px solid rgba(240,237,232,0.09)",
        borderRadius: 12,
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transition: "border-color 0.3s",
      }}
    >
      <span style={{ fontSize: "0.6rem", fontFamily: "'DM Mono',monospace", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.35)" }}>{label}</span>
      <span style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(240,237,232,0.65)" }}>{children}</span>
      <span style={{ fontSize: "0.62rem", fontFamily: "'DM Mono',monospace", color: "rgba(240,237,232,0.2)", marginTop: 4 }}>{sub}</span>
    </div>
  );
}