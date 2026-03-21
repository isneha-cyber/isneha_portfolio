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

// ─── GSAP Loader ──────────────────────────────────────────────────────────────
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
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const labelRef = useRef(null);
  const gsapRef  = useRef(null);

  const mouse         = useRef({ x: -200, y: -200 });
  const ringPos       = useRef({ x: -200, y: -200 });
  const rafRef        = useRef(null);
  const stateRef      = useRef("idle");
  const isTouchingRef = useRef(false);
  const lastTouchedEl = useRef(null);
  const activeFingers = useRef(0);

  const [cursorText, setCursorText] = useState("");
  const [visible,    setVisible]    = useState(false);

  // ── RAF loop: smooth ring lerp ────────────────────────────────────────────
  const tick = useCallback(() => {
    const gsap = gsapRef.current;
    if (!gsap) { rafRef.current = requestAnimationFrame(tick); return; }

    const lerpFactor = stateRef.current === "magnetic" ? 0.07 : 0.13;
    ringPos.current.x += (mouse.current.x - ringPos.current.x) * lerpFactor;
    ringPos.current.y += (mouse.current.y - ringPos.current.y) * lerpFactor;

    if (ringRef.current) {
      gsap.set(ringRef.current, {
        x: ringPos.current.x - SIZE.ring / 2,
        y: ringPos.current.y - SIZE.ring / 2,
      });
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // ── Move cursor elements ──────────────────────────────────────────────────
  const moveCursor = useCallback((x, y, snapRing = false) => {
    mouse.current = { x, y };
    if (snapRing) ringPos.current = { x, y };
    const gsap = gsapRef.current;
    if (dotRef.current && gsap) {
      gsap.set(dotRef.current, { x: x - SIZE.dot / 2, y: y - SIZE.dot / 2 });
    }
  }, []);

  // ── Enter state ───────────────────────────────────────────────────────────
  const enterState = useCallback((el) => {
    const text       = el.dataset?.cursorText || "";
    const isMagnetic = el.hasAttribute?.("data-cursor-magnetic");
    const gsap       = gsapRef.current;
    if (!gsap || !ringRef.current || !dotRef.current || !labelRef.current) return;

    if (isMagnetic) {
      stateRef.current = "magnetic";
      gsap.to(ringRef.current, { scale: 2.2, borderColor: COLORS.ringMagnetic, duration: 0.35, ease: "expo.out" });
      gsap.to(dotRef.current,  { scale: 0, duration: 0.25, ease: "expo.out" });
    } else if (text) {
      stateRef.current = "text";
      setCursorText(text);
      gsap.to(ringRef.current,  { scale: 2.8, borderColor: COLORS.ringText, duration: 0.35, ease: "expo.out" });
      gsap.to(dotRef.current,   { scale: 0, duration: 0.25, ease: "expo.out" });
      gsap.to(labelRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" });
    } else {
      stateRef.current = "hover";
      gsap.to(ringRef.current, { scale: 1.7, borderColor: COLORS.ringHover, duration: 0.35, ease: "expo.out" });
      gsap.to(dotRef.current,  { scale: 1.8, duration: 0.25, ease: "expo.out" });
    }
  }, []);

  // ── Leave state ───────────────────────────────────────────────────────────
  const leaveState = useCallback(() => {
    stateRef.current = "idle";
    const gsap = gsapRef.current;
    if (!gsap || !ringRef.current || !dotRef.current || !labelRef.current) return;
    gsap.to(ringRef.current,  { scale: 1, borderColor: COLORS.ring, duration: 0.45, ease: "expo.out" });
    gsap.to(dotRef.current,   { scale: 1, duration: 0.35, ease: "expo.out" });
    gsap.to(labelRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
    setTimeout(() => setCursorText(""), 200);
  }, []);

  // ── Pulse flash ───────────────────────────────────────────────────────────
  const pulseFlash = useCallback(() => {
    const gsap = gsapRef.current;
    if (!gsap || !ringRef.current) return;
    const scaleMap = { idle: 1, hover: 1.7, text: 2.8, magnetic: 2.2 };
    const from = scaleMap[stateRef.current] ?? 1;
    gsap.fromTo(
      ringRef.current,
      { scale: from },
      { scale: from * 0.5, duration: 0.1, ease: "power3.in", yoyo: true, repeat: 1 }
    );
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // MOUSE HANDLERS (delegated — works for dynamic elements automatically)
  // ─────────────────────────────────────────────────────────────────────────
  const onMouseMove = useCallback((e) => {
    moveCursor(e.clientX, e.clientY);
    setVisible(true);
  }, [moveCursor]);

  const onMouseOver = useCallback((e) => {
    const el = e.target.closest(INTERACTIVE_SELECTOR);
    if (el) enterState(el);
  }, [enterState]);

  const onMouseOut = useCallback((e) => {
    const el = e.target.closest(INTERACTIVE_SELECTOR);
    if (el && !el.contains(e.relatedTarget)) leaveState();
  }, [leaveState]);

  // ─────────────────────────────────────────────────────────────────────────
  // TOUCH HANDLERS — full parity with desktop
  // ─────────────────────────────────────────────────────────────────────────

  // touchstart: snap cursor to finger, detect interactive element
  const onTouchStart = useCallback((e) => {
    activeFingers.current = e.touches.length;
    isTouchingRef.current = true;
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // Snap ring immediately so it doesn't fly in from off-screen
    moveCursor(x, y, true);
    setVisible(true);

    const el = document.elementFromPoint(x, y);
    const interactive = el?.closest(INTERACTIVE_SELECTOR);
    if (interactive) {
      lastTouchedEl.current = interactive;
      enterState(interactive);
    }
  }, [moveCursor, enterState]);

  // touchmove: follow finger continuously, update hover state if element changes
  const onTouchMove = useCallback((e) => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    moveCursor(x, y);
    setVisible(true);

    // Re-check which element is under finger and update state accordingly
    const el = document.elementFromPoint(x, y);
    const nowOn = el?.closest(INTERACTIVE_SELECTOR) || null;

    if (nowOn !== lastTouchedEl.current) {
      if (lastTouchedEl.current) leaveState();
      lastTouchedEl.current = nowOn;
      if (nowOn) enterState(nowOn);
    }
  }, [moveCursor, leaveState, enterState]);

  // touchend: pulse, clean up, fade cursor out
  const onTouchEnd = useCallback((e) => {
    activeFingers.current = e.touches.length;

    if (e.touches.length === 0) {
      isTouchingRef.current = false;
      pulseFlash();

      if (lastTouchedEl.current) {
        leaveState();
        lastTouchedEl.current = null;
      }

      // Keep visible briefly so user can see the pulse, then fade
      setTimeout(() => {
        if (!isTouchingRef.current) setVisible(false);
      }, 500);
    }
  }, [pulseFlash, leaveState]);

  // touchcancel: clean reset
  const onTouchCancel = useCallback(() => {
    isTouchingRef.current = false;
    activeFingers.current = 0;
    if (lastTouchedEl.current) { leaveState(); lastTouchedEl.current = null; }
    setVisible(false);
  }, [leaveState]);

  // ─────────────────────────────────────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;

    loadGSAP().then((gsap) => {
      if (!mounted) return;
      gsapRef.current = gsap;

      // Hide native cursor only on fine-pointer devices (mouse/trackpad)
      if (window.matchMedia("(pointer: fine)").matches) {
        document.documentElement.style.cursor = "none";
      }

      gsap.set(dotRef.current,  { x: -200, y: -200 });
      gsap.set(ringRef.current, { x: -200, y: -200 });

      rafRef.current = requestAnimationFrame(tick);

      // Mouse — delegated on document (auto-handles dynamic elements)
      document.addEventListener("mousemove",  onMouseMove,  { passive: true });
      document.addEventListener("mouseover",  onMouseOver,  { passive: true });
      document.addEventListener("mouseout",   onMouseOut,   { passive: true });
      document.addEventListener("click",      pulseFlash,   { passive: true });
      document.addEventListener("mouseleave", () => setVisible(false));
      document.addEventListener("mouseenter", () => setVisible(true));

      // Touch — all passive so scroll is never blocked
      window.addEventListener("touchstart",  onTouchStart,  { passive: true });
      window.addEventListener("touchmove",   onTouchMove,   { passive: true });
      window.addEventListener("touchend",    onTouchEnd,    { passive: true });
      window.addEventListener("touchcancel", onTouchCancel, { passive: true });
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);

      document.removeEventListener("mousemove",  onMouseMove);
      document.removeEventListener("mouseover",  onMouseOver);
      document.removeEventListener("mouseout",   onMouseOut);
      document.removeEventListener("click",      pulseFlash);

      window.removeEventListener("touchstart",  onTouchStart);
      window.removeEventListener("touchmove",   onTouchMove);
      window.removeEventListener("touchend",    onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);

      document.documentElement.style.cursor = "";
    };
  }, [tick, onMouseMove, onMouseOver, onMouseOut, pulseFlash,
      onTouchStart, onTouchMove, onTouchEnd, onTouchCancel]);

  return (
    <>
      {/* DOT */}
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: SIZE.dot, height: SIZE.dot,
          background: COLORS.dot, borderRadius: "50%",
          pointerEvents: "none", zIndex: 99999,
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
          position: "fixed", top: 0, left: 0,
          width: SIZE.ring, height: SIZE.ring,
          border: `1.5px solid ${COLORS.ring}`, borderRadius: "50%",
          pointerEvents: "none", zIndex: 99998,
          opacity: visible ? 1 : 0,
          willChange: "transform",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "opacity 0.3s",
        }}
      >
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
// DEMO PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function CursorDemo() {
  return (
    <div style={{ minHeight: "100vh", background: "#0c0c0c", color: "#f0ede8", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3rem", padding: "4rem 2rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <Cursor />

      <div style={{ textAlign: "center", maxWidth: 560 }}>
        <p style={{ fontSize: "0.65rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(240,237,232,0.3)", marginBottom: "1rem" }}>
          Custom Cursor — All States
        </p>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 0.95, color: "#f0ede8" }}>
          Mouse or touch me
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", width: "100%", maxWidth: 800 }}>
        <Card label="Default Hover" sub="data-cursor-hover" attr={{ "data-cursor-hover": true }}>
          Hover / touch — ring grows
        </Card>
        <Card label="Text Label" sub='data-cursor-text="VIEW"' attr={{ "data-cursor-text": "VIEW" }}>
          Hover / touch — label appears
        </Card>
        <Card label="Magnetic" sub="data-cursor-magnetic" attr={{ "data-cursor-magnetic": true }}>
          Hover / touch — ring sluggish
        </Card>
        <a href="#" onClick={(e) => e.preventDefault()} data-cursor-text="OPEN"
          style={{ background: "rgba(240,237,232,0.05)", border: "1px solid rgba(240,237,232,0.1)", borderRadius: 12, padding: "2rem", textDecoration: "none", color: "#f0ede8", display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: "0.6rem", fontFamily: "'DM Mono',monospace", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.35)" }}>Link Element</span>
          <span style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(240,237,232,0.65)" }}>{"<a> tags auto-trigger"}</span>
        </a>
        <button style={{ background: "#f0ede8", color: "#0c0c0c", border: "none", borderRadius: 12, padding: "2rem", fontFamily: "'DM Sans',sans-serif", cursor: "none", textAlign: "left", display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: "0.6rem", fontFamily: "'DM Mono',monospace", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>Button Element</span>
          <span style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(10,10,10,0.7)" }}>{"<button> tags auto-trigger"}</span>
        </button>
        <Card label="Tap / Click Test" sub="try tapping" attr={{ "data-cursor-hover": true }}>
          Tap / click — ring pulses inward
        </Card>
      </div>

      <div style={{ background: "#111", border: "1px solid rgba(240,237,232,0.08)", borderRadius: 12, padding: "1.5rem 2rem", maxWidth: 800, width: "100%" }}>
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

// Works on mouse AND touch automatically`}</pre>
      </div>
    </div>
  );
}

function Card({ label, sub, attr, children }) {
  return (
    <div {...attr} style={{ background: "rgba(240,237,232,0.04)", border: "1px solid rgba(240,237,232,0.09)", borderRadius: 12, padding: "2rem", display: "flex", flexDirection: "column", gap: 8, transition: "border-color 0.3s" }}>
      <span style={{ fontSize: "0.6rem", fontFamily: "'DM Mono',monospace", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.35)" }}>{label}</span>
      <span style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(240,237,232,0.65)" }}>{children}</span>
      <span style={{ fontSize: "0.62rem", fontFamily: "'DM Mono',monospace", color: "rgba(240,237,232,0.2)", marginTop: 4 }}>{sub}</span>
    </div>
  );
}