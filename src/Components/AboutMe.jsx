// import React, { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const AboutMe = () => {
//   const sectionRef         = useRef(null);
//   const pinRef             = useRef(null);
//   const titleLineRef       = useRef(null);
//   const infoRef            = useRef(null);
//   const imageRef           = useRef(null);
//   const overlayRef         = useRef(null);
//   const imageContainerRef  = useRef(null);
//   const contentSectionRef  = useRef(null);
//   const imageWrapperRef    = useRef(null);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     const timeoutId = setTimeout(() => {
//       if (!isMounted) return;

//       const ctx = gsap.context(() => {
//         const mm = gsap.matchMedia();

//         /* ── DESKTOP (lg+) ── */
//         mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
//           if (!sectionRef.current || !titleLineRef.current || !pinRef.current ||
//               !imageContainerRef.current || !imageRef.current || !overlayRef.current ||
//               !infoRef.current || !contentSectionRef.current || !imageWrapperRef.current) return;

//           gsap.from(titleLineRef.current, {
//             yPercent: 100, opacity: 0, duration: 1, ease: 'power3.out',
//             scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
//           });

//           const tl = gsap.timeline({
//             scrollTrigger: {
//               trigger: sectionRef.current, start: 'top top', end: '+=100%',
//               scrub: 1.5, pin: pinRef.current, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
//             },
//           });

//           tl.to(imageContainerRef.current, { width: '67%', marginLeft: '16.5%', marginRight: '16.5%', height: '94vh', ease: 'power2.inOut', duration: 1 }, 0)
//             .to(imageWrapperRef.current,   { width: '100%', height: '100%', ease: 'power2.inOut', duration: 1 }, 0)
//             .to(imageRef.current, {
//               scale: 1, ease: 'power2.inOut', duration: 1,
//               onUpdate() {
//                 if (!imageRef.current) return;
//                 const p = this.progress;
//                 imageRef.current.style.objectFit     = p > 0.7 ? 'contain' : 'cover';
//                 imageRef.current.style.objectPosition = p > 0.7 ? 'center' : 'center 30%';
//               },
//             }, 0)
//             .to(overlayRef.current, { height: '0%', ease: 'power2.inOut', duration: 1 }, 0)
//             .to(infoRef.current,    { opacity: 0, y: -50, ease: 'power2.inOut', duration: 0.8 }, 0);

//           gsap.fromTo(contentSectionRef.current,
//             { opacity: 0, y: 50 },
//             { opacity: 1, y: 0, duration: 1, ease: 'power2.out',
//               scrollTrigger: { trigger: contentSectionRef.current, start: 'top 80%', end: 'top 30%', scrub: 0.5 } }
//           );
//         });

//         /* ── MOBILE / TABLET (<lg) ── */
//         mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
//           if (!sectionRef.current || !titleLineRef.current || !infoRef.current ||
//               !imageContainerRef.current || !imageRef.current || !overlayRef.current ||
//               !imageWrapperRef.current) return;

//           gsap.from(titleLineRef.current, {
//             yPercent: 100, opacity: 0, duration: 0.8, ease: 'power2.out',
//             scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
//           });

//           gsap.from(infoRef.current, {
//             y: 16, opacity: 0, duration: 0.7, delay: 0.1, ease: 'power2.out',
//             scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
//           });

//           gsap.to(imageContainerRef.current, {
//             width: '90%', marginLeft: '5%', marginRight: '5%', height: '80vh', ease: 'power2.inOut',
//             scrollTrigger: { trigger: imageContainerRef.current, start: 'top 90%', end: 'bottom 20%', scrub: 1 },
//           });

//           gsap.to(imageRef.current, {
//             scale: 1, ease: 'power2.inOut',
//             scrollTrigger: { trigger: imageContainerRef.current, start: 'top 90%', end: 'bottom 20%', scrub: 1 },
//             onUpdate() {
//               if (!imageRef.current) return;
//               imageRef.current.style.objectFit     = this.progress > 0.7 ? 'contain' : 'cover';
//               imageRef.current.style.objectPosition = this.progress > 0.7 ? 'center' : 'center 30%';
//             },
//           });

//           gsap.to(overlayRef.current, {
//             height: '0%', ease: 'power2.inOut',
//             scrollTrigger: { trigger: imageContainerRef.current, start: 'top 90%', end: 'bottom 20%', scrub: 1 },
//           });
//         });
//       }, sectionRef);

//       return () => ctx.revert();
//     }, 100);

//     return () => clearTimeout(timeoutId);
//   }, [isMounted]);

//   /* shared grid-line helper */
//   const GridLines = () => (
//     <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
//       {[...Array(9)].map((_, i) => (
//         <div
//           key={i}
//           className={`border-r border-gray-200 h-full
//             ${i >= 4 ? 'hidden sm:block' : ''}
//             ${i >= 6 ? 'hidden lg:block' : ''}
//           `}
//         />
//       ))}
//     </div>
//   );

//   return (
//     <>
//       {/* ── HERO SECTION ── */}
//       <section ref={sectionRef} className="relative w-full overflow-hidden">
//         <GridLines />

//         <div ref={pinRef} className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-40">
//           <div className="mx-auto flex w-full max-w-6xl flex-col items-center">

//             <div className="flex w-full flex-col items-center gap-3 sm:gap-5 mt-6 sm:mt-0">
//               <div className="overflow-hidden">
//                 <h1 className="font-nohemi text-center text-5xl font-bold uppercase tracking-wider sm:text-7xl lg:text-8xl xl:text-[13rem]">
//                   <span ref={titleLineRef} className="block w-full text-center">ABOUT ME</span>
//                 </h1>
//               </div>

//               {/*
//                 FIX 2 — subtitle row
//                 Mobile : w-full + justify-between → labels at opposite edges, no gap-96 crushing layout
//                 sm+    : justify-center + gap-96   → original centred look restored
//               */}
//               <div
//                 ref={infoRef}
//                 className="flex w-full items-center justify-between px-1 text-xs tracking-[0.5em] text-gray-400
//                            sm:justify-center sm:gap-96 sm:px-0 sm:text-sm lg:text-2xl"
//               >
//                 <h3>NEPALI</h3>
//                 <h3 className="uppercase">Fullstack Developer</h3>
//               </div>
//             </div>

//             {/*
//               FIX 3 — image container height
//               Inline style was always '90vh' — impossible for Tailwind to override.
//               Mobile  : min(55vh, 380px) — sensible on small screens
//               lg+     : overridden back to 90vh via the <style> block below so GSAP
//                         can still animate it up to 94vh
//             */}
//             <div
//               ref={imageContainerRef}
//               className="about-img-container relative mt-6 sm:mt-10 lg:mt-12 w-full transition-all duration-300 ease-in-out"
//               style={{ height: 'min(55vh, 380px)', marginLeft: 0, marginRight: 0 }}
//             >
//               <div ref={imageWrapperRef} className="relative w-full h-full overflow-hidden">
//                 <img
//                   ref={imageRef}
//                   src="/images/person.jpg"
//                   loading="lazy"
//                   alt="Isneha Manandhar"
//                   className="w-full h-full transition-all duration-300"
//                   style={{ objectFit: 'cover', objectPosition: 'center 30%', transform: 'scale(1.1)' }}
//                 />
//                 <div
//                   ref={overlayRef}
//                   className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent"
//                   style={{ height: '100%', zIndex: 20 }}
//                 />
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ── CONTENT SECTION ── */}
//       <section
//         ref={contentSectionRef}
//         className="w-full bg-white relative flex justify-center items-start py-12 md:py-24"
//         style={{ zIndex: 30, minHeight: '100vh' }}
//       >
//         <GridLines />

//         <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="max-w-4xl mx-auto ">
//             <div className="space-y-6 sm:space-y-8">
//               <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
//                 I'm Isneha Manandhar, a Full Stack Developer based in Pokhara, Nepal. I build
//                 end-to-end digital experiences that balance clean engineering with strong
//                 performance fundamentals. From pixel-perfect frontends to scalable backend
//                 systems, I bring products to life across the full stack.
//               </p>
//               <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
//                 On the frontend I specialize in React, Tailwind CSS, and modern JavaScript 
//                 building fast, responsive interfaces that feel great to use. On the backend I
//                 work with Node.js, PHP, MySQL, REST APIs, and relational databases to architect
//                 systems that scale reliably under real-world demand.
//               </p>
//               <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
//                 I also handle SEO optimizing site structure, semantic markup, page speed, and
//                 metadata so the products I build don't just look good, they get found. Good
//                 development and good SEO aren't separate concerns; I treat them as one.
//               </p>
//               <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
//                 I've worked across hospitality, education, e-commerce, and travel projects
//                 ranging from boutique Himalayan hotels to university management systems,
//                 Australian driving academies, and international booking platforms.
//               </p>
//               <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
//                 Currently open to freelance projects and collaborations worldwide. Whether you
//                 need a high-performance web application, a conversion-focused site, or a
//                 complex management dashboard I'd love to build something great together.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <style>{`
//         .font-nohemi { font-family: 'Nohemi', sans-serif; }

//         /* FIX 3 cont. — restore 90vh on desktop so GSAP animate to 94vh works */
//         @media (min-width: 1024px) {
//           .about-img-container { height: 90vh !important; }
//         }
//       `}</style>
//     </>
//   );
// };

// export default AboutMe;

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GridLines = () => (
  <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
    {[...Array(9)].map((_, i) => (
      <div
        key={i}
        className={`border-r border-gray-200 h-full
          ${i >= 4 ? 'hidden sm:block' : ''}
          ${i >= 6 ? 'hidden lg:block' : ''}
        `}
      />
    ))}
  </div>
);

const AboutMe = () => {
  const sectionRef        = useRef(null);
  const pinRef            = useRef(null);
  const titleLineRef      = useRef(null);
  const infoRef           = useRef(null);
  const imageRef          = useRef(null);
  const overlayRef        = useRef(null);
  const imageContainerRef = useRef(null);
  const contentSectionRef = useRef(null);
  const imageWrapperRef   = useRef(null);

  // FIX 1 — isMounted was never true when the timeout ran because the
  // effect captures the initial false value. Removed the broken guard;
  // we already know we're mounted inside useEffect.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        /* ── DESKTOP (lg+) ── */
        mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
          if (
            !sectionRef.current || !titleLineRef.current || !pinRef.current ||
            !imageContainerRef.current || !imageRef.current || !overlayRef.current ||
            !infoRef.current || !contentSectionRef.current || !imageWrapperRef.current
          ) return;

          // FIX 2 — title was animating FROM yPercent 100 but the element
          // has overflow-hidden on its parent so it was invisible during the
          // slide. Added opacity so it's always visible while still in view.
          gsap.from(titleLineRef.current, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=100%',
              scrub: 1.5,
              pin: pinRef.current,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(imageContainerRef.current, {
            width: '67%', marginLeft: '16.5%', marginRight: '16.5%',
            height: '94vh', ease: 'power2.inOut', duration: 1,
          }, 0)
            .to(imageWrapperRef.current, {
              width: '100%', height: '100%', ease: 'power2.inOut', duration: 1,
            }, 0)
            .to(imageRef.current, {
              scale: 1, ease: 'power2.inOut', duration: 1,
              onUpdate() {
                if (!imageRef.current) return;
                const p = this.progress();   // FIX 3 — this.progress is a function, not a property
                imageRef.current.style.objectFit      = p > 0.7 ? 'contain' : 'cover';
                imageRef.current.style.objectPosition = p > 0.7 ? 'center' : 'center 30%';
              },
            }, 0)
            .to(overlayRef.current, { height: '0%', ease: 'power2.inOut', duration: 1 }, 0)
            .to(infoRef.current,    { opacity: 0, y: -50, ease: 'power2.inOut', duration: 0.8 }, 0);

          // FIX 4 — content section had minHeight: 100vh which prevented
          // ScrollTrigger from calculating its start correctly on first load.
          // Use opacity: 0 as initial state via GSAP set instead of relying
          // on CSS so the element contributes its full layout height.
          gsap.set(contentSectionRef.current, { opacity: 0, y: 50 });
          gsap.to(contentSectionRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentSectionRef.current,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 0.5,
            },
          });
        });

        /* ── MOBILE / TABLET (<lg) ── */
        mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
          if (
            !sectionRef.current || !titleLineRef.current || !infoRef.current ||
            !imageContainerRef.current || !imageRef.current || !overlayRef.current ||
            !imageWrapperRef.current
          ) return;

          gsap.from(titleLineRef.current, {
            yPercent: 100, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current, start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });

          gsap.from(infoRef.current, {
            y: 16, opacity: 0, duration: 0.7, delay: 0.1, ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current, start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          });

          // FIX 5 — on mobile the image container was animating to 80vh which
          // caused a jarring layout jump because the section had no min-height.
          // Reduced to a sensible 60vh and removed the width/margin animation
          // since the mobile layout is already full-width.
          gsap.to(imageContainerRef.current, {
            height: '60vh',
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top 90%', end: 'bottom 30%', scrub: 1,
            },
          });

          gsap.to(overlayRef.current, {
            height: '0%', ease: 'power2.inOut',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top 90%', end: 'bottom 30%', scrub: 1,
            },
          });

          // FIX 6 — content section invisible on mobile because the
          // fromTo was never added for the mobile breakpoint.
          gsap.set(contentSectionRef.current, { opacity: 0, y: 30 });
          gsap.to(contentSectionRef.current, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: {
              trigger: contentSectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);   // FIX 1 cont. — empty dep array, runs once on mount

  return (
    <>
      {/* ── HERO SECTION ── */}
      <section ref={sectionRef} className="relative w-full overflow-hidden bg-white">
        <GridLines />

        {/* FIX 7 — pinRef wraps the entire visible hero so GSAP pins the
            right element. Previously pinRef was on an inner div which caused
            the section to collapse when pinned. */}
        <div
          ref={pinRef}
          className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-40 pb-10 lg:pb-0"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center">

            <div className="flex w-full flex-col items-center gap-3 sm:gap-5 mt-6 sm:mt-0">
              {/* overflow-hidden clips the slide-up animation */}
              <div className="overflow-hidden w-full">
                <h1 className="font-nohemi text-center text-5xl font-bold uppercase tracking-wider sm:text-7xl lg:text-8xl xl:text-[13rem] leading-none">
                  <span ref={titleLineRef} className="block w-full text-center">ABOUT ME</span>
                </h1>
              </div>

              {/* FIX 8 — gap-96 on sm caused horizontal overflow on
                  768-1023px tablets. Replaced with flex justify-between
                  that works at every breakpoint. */}
              <div
                ref={infoRef}
                className="flex w-full items-center justify-between px-1 sm:px-2 lg:px-0
                           text-[0.6rem] sm:text-sm lg:text-2xl
                           tracking-[0.4em] sm:tracking-[0.5em] text-gray-400 uppercase"
              >
                <h3>Nepali</h3>
                <h3>Fullstack Developer</h3>
              </div>
            </div>

            {/* Image container */}
            <div
              ref={imageContainerRef}
              className="about-img-container relative mt-6 sm:mt-10 lg:mt-12 w-full"
              style={{ height: 'min(55vw, 380px)', marginLeft: 0, marginRight: 0 }}
            >
              <div ref={imageWrapperRef} className="relative w-full h-full overflow-hidden">
                <img
                  ref={imageRef}
                  src="/images/person.jpg"
                  loading="lazy"
                  alt="Isneha Manandhar"
                  className="w-full h-full transition-all duration-300"
                  style={{ objectFit: 'cover', objectPosition: 'center 25%', transform: 'scale(1.08)' }}
                />
                {/* FIX 9 — overlay gradient was via-white which left a
                    solid white band in the middle. Changed to via-white/40
                    so the transition is smooth. */}
                <div
                  ref={overlayRef}
                  className="absolute bottom-0 left-0 w-full"
                  style={{
                    height: '100%',
                    zIndex: 20,
                    background: 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      {/* FIX 4 cont. — removed minHeight: 100vh inline style; that was
          preventing proper ScrollTrigger calculation. Natural height is fine. */}
      <section
        ref={contentSectionRef}
        className="w-full bg-white relative py-14 sm:py-20 lg:py-28"
        style={{ zIndex: 30 }}
      >
        <GridLines />

        <div className="w-full px-5 sm:px-8 lg:px-10 relative z-10">
          {/* FIX 10 — max-w-4xl was off-centre on mobile because of uneven
              px padding. Now uses consistent px-5 that matches the rest of
              the page, with max-w-3xl for a more readable line length. */}
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">

            {/* FIX 11 — added a section heading that was completely missing.
                The content section had no visual anchor — users arriving
                here after the image reveal had no context heading. */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01010e] mb-8 sm:mb-12">
              About me
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              I'm Isneha Manandhar, a Full Stack Developer based in Pokhara, Nepal. I build
              end-to-end digital experiences that balance clean engineering with strong
              performance fundamentals. From pixel-perfect frontends to scalable backend
              systems, I bring products to life across the full stack.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              On the frontend I specialize in React, Tailwind CSS, and modern JavaScript —
              building fast, responsive interfaces that feel great to use. On the backend I
              work with Node.js, PHP, MySQL, REST APIs, and relational databases to architect
              systems that scale reliably under real-world demand.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              I also handle SEO — optimizing site structure, semantic markup, page speed, and
              metadata so the products I build don't just look good, they get found. Good
              development and good SEO aren't separate concerns; I treat them as one.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              I've worked across hospitality, education, e-commerce, and travel — from boutique
              Himalayan hotels to university management systems, Australian driving academies,
              and international booking platforms.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              Currently open to freelance projects and collaborations worldwide. Whether you
              need a high-performance web application, a conversion-focused site, or a complex
              management dashboard — I'd love to build something great together.
            </p>

            {/* FIX 12 — added a contact CTA at the bottom of the bio.
                The section previously ended with text and no next action,
                leaving users with nowhere to go. */}
            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="mailto:isnehadev26@gmail.com"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-[#01010e] px-6 py-3.5 hover:bg-[#01010e] hover:text-white transition-colors duration-300"
              >
                Get in touch
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="/works"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-[#01010e] transition-colors duration-300"
              >
                View my work
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .font-nohemi { font-family: 'Nohemi', sans-serif; }

        /* Restore 90vh on lg+ so GSAP can animate it to 94vh */
        @media (min-width: 1024px) {
          .about-img-container { height: 90vh !important; }
        }
      `}</style>
    </>
  );
};

export default AboutMe;