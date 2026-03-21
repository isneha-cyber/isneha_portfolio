// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useNavigate } from 'react-router-dom';
// import { projects as allProjects } from '../data/projects';

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const featuredProjects = allProjects.slice(0, 3).map(p => ({
//   id: p.id,
//   title: p.title,
//   category: p.category,
//   year: p.year,
//   imageUrl: p.image,
//   videoUrl: p.videoUrl,
//   slug: p.slug,
// }));

// const About = () => {
//   const navigate = useNavigate();
//   const wrapperRef  = useRef(null);
//   const aboutRef    = useRef(null);
//   const projectsRef = useRef(null);
//   const clipRefs    = useRef([]);

//   useEffect(() => {
//     const mm = gsap.matchMedia();
//     mm.add('(min-width: 0px)', () => {
//       ScrollTrigger.getAll().forEach(t => t.kill());
//       const totalProjectsHeight = projectsRef.current.offsetHeight;
//       gsap.set(projectsRef.current, { y: 0, clearProps: 'transform' });

//       ScrollTrigger.create({
//         trigger: aboutRef.current, start: 'top top',
//         end: `+=${totalProjectsHeight}`, pin: true, pinSpacing: false,
//         anticipatePin: 1, invalidateOnRefresh: true,
//       });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: aboutRef.current, start: 'top top',
//           end: `+=${totalProjectsHeight}`, scrub: 1, invalidateOnRefresh: true,
//         },
//       });

//       clipRefs.current.forEach((clip, i) => {
//         if (!clip) return;
//         gsap.set(clip, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' });
//         const start = i / featuredProjects.length;
//         const end   = (i + 1) / featuredProjects.length;
//         tl.fromTo(clip,
//           { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
//           { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none', duration: end - start },
//           start
//         );
//       });

//       return () => { ScrollTrigger.getAll().forEach(t => t.kill()); tl.kill(); };
//     });
//     return () => mm.revert();
//   }, []);

//   return (
//     <div ref={wrapperRef} className="relative">

//      {/* ABOUT — pinned section */}
// <section ref={aboutRef} className="relative z-10 bg-white text-[#01010e] min-h-screen">
//   <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
//     {[...Array(9)].map((_, i) => (
//       <div
//         key={i}
//         className={`border-r border-gray-200 h-full ${i >= 4 ? 'hidden sm:block' : ''} ${i >= 6 ? 'hidden lg:block' : ''}`}
//       />
//     ))}
//   </div>

//   <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-20 lg:py-24">
//     <div className="w-full max-w-[1400px] mx-auto">
//       <div className="flex flex-col items-center text-center gap-1 sm:gap-2 lg:gap-3">

//         <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
//           <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-bold leading-tight">
//             Isneha Manandhar is a Nepal-based
//           </h2>
//           <img src="/images/person.jpg" alt="Isneha Manandhar"
//             className="hidden lg:block w-24 h-24 rounded-full object-cover shadow-xl shrink-0" loading="lazy" />
//         </div>

//         <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
//           <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-bold leading-tight">Full Stack Developer</h2>
//           <img src="/images/fullstack.png" alt="Full Stack"
//             className="hidden lg:block w-14 h-14 shrink-0" loading="lazy" />
//           <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-bold leading-tight text-[#c5c5c5]">&amp; SEO Optimizer</h2>
//         </div>

//         <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
//           <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">who crafts</h2>
//           <img src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991462bf76217807db9c6_DSC_9785.webp" alt="Crafting"
//             className="hidden lg:block h-24 w-auto rounded-lg object-cover shadow-xl shrink-0" loading="lazy" />
//           <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">digital experiences</h2>
//         </div>

//         <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
//           <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">from pixel-perfect frontends</h2>
//           <img src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991bb314d4830350b260f_Frame%2044390.webp" alt="Frontend"
//             className="hidden lg:block h-24 w-auto rounded-lg object-cover shadow-xl shrink-0" loading="lazy" />
//         </div>

//         <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
//           <img src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991db1dc4aa4d8d78e374_Frame%2044391.webp" alt="Backend"
//             className="hidden lg:block h-24 w-auto rounded-lg object-cover shadow-xl shrink-0" loading="lazy" />
//           <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">to scalable backends</h2>
//         </div>

//       </div>
//     </div>
//   </div>
// </section>

//       {/* PROJECTS — scroll reveal slides */}
//       <section ref={projectsRef} className="relative z-20" style={{ height: `${featuredProjects.length * 100}vh` }}>
//         <div className="sticky top-0 h-screen w-full overflow-hidden">
//           {featuredProjects.map((project, index) => (
//             <div
//               key={project.id}
//               ref={(el) => (clipRefs.current[index] = el)}
//               className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
//               style={{ zIndex: index + 1 }}
//             >
//               <div className="group relative w-full h-full">
//                 <img src={project.imageUrl} alt={project.title}
//                   className="absolute inset-0 w-full h-full object-cover" loading="lazy" />

//                 {/* Video hover — sm:block means hidden on mobile, visible on sm+ only */}
//                 {project.videoUrl && (
//                   <video
//                     className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]"
//                     loop muted playsInline preload="none"
//                     onMouseEnter={(e) => e.currentTarget.play()}
//                     onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
//                   >
//                     <source src={project.videoUrl} type="video/mp4" />
//                   </video>
//                 )}

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-[2]" />

//                 <div className="absolute inset-x-0 bottom-0 z-[3] px-4 py-6 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-16 text-white">
//                   <div className="max-w-7xl mx-auto">
//                     <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
//                       <h3 className="text-[clamp(2.8rem,9vw,8rem)] font-bold leading-none tracking-tight">
//                         {project.title}
//                       </h3>
//                       <div className="flex flex-row items-center justify-between sm:flex-row sm:items-end gap-4 sm:gap-8">
//                         <div className="flex flex-col gap-1 opacity-60">
//                           <span className="text-[0.65rem] sm:text-xs uppercase tracking-widest">{project.category}</span>
//                           <span className="text-[0.65rem] sm:text-xs uppercase tracking-widest">{project.year}</span>
//                         </div>
//                         <button
//                           onClick={() => navigate(`/works/${project.slug}`)}
//                           className="group/cta inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium hover:gap-4 transition-all duration-300 bg-transparent border-none text-white cursor-pointer"
//                         >
//                           <span className="block h-px w-5 sm:w-6 bg-white transition-all duration-300 group-hover/cta:w-8 sm:group-hover/cta:w-10" />
//                           About more
//                           <span className="block h-px w-5 sm:w-6 bg-white transition-all duration-300 group-hover/cta:w-8 sm:group-hover/cta:w-10" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//     </div>
//   );
// };

// export default About;
// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useNavigate } from 'react-router-dom';
// import { projects as allProjects } from '../data/projects';

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const featuredProjects = allProjects.slice(0, 3).map(p => ({
//   id: p.id, title: p.title, category: p.category, year: p.year,
//   imageUrl: p.image, videoUrl: p.videoUrl, slug: p.slug,
// }));

// const GridLines = () => (
//   <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
//     {[...Array(9)].map((_, i) => (
//       <div key={i} className={`border-r border-gray-300 h-full ${i >= 4 ? 'hidden sm:block' : ''} ${i >= 6 ? 'hidden lg:block' : ''}`} />
//     ))}
//   </div>
// );

// const About = () => {
//   const navigate    = useNavigate();
//   const wrapperRef  = useRef(null);
//   const aboutRef    = useRef(null);
//   const projectsRef = useRef(null);
//   const clipRefs    = useRef([]);

//   useEffect(() => {
//     // Only run pinning animation on desktop (≥768px), skip on mobile
//     const mm = gsap.matchMedia();

//     mm.add('(min-width: 768px)', () => {
//       ScrollTrigger.getAll().forEach(t => t.kill());
//       const totalH = projectsRef.current.offsetHeight;
//       gsap.set(projectsRef.current, { y: 0, clearProps: 'transform' });

//       ScrollTrigger.create({
//         trigger: aboutRef.current, start: 'top top',
//         end: `+=${totalH}`, pin: true, pinSpacing: false,
//         anticipatePin: 1, invalidateOnRefresh: true,
//       });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: aboutRef.current, start: 'top top',
//           end: `+=${totalH}`, scrub: 1, invalidateOnRefresh: true,
//         },
//       });

//       clipRefs.current.forEach((clip, i) => {
//         if (!clip) return;
//         gsap.set(clip, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' });
//         const start = i / featuredProjects.length;
//         const end   = (i + 1) / featuredProjects.length;
//         tl.fromTo(
//           clip,
//           { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
//           { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none', duration: end - start },
//           start
//         );
//       });

//       return () => { ScrollTrigger.getAll().forEach(t => t.kill()); tl.kill(); };
//     });

//     return () => mm.revert();
//   }, []);

//   return (
//     <div ref={wrapperRef} className="relative">

//       {/* ── ABOUT SECTION ── */}
//       <section ref={aboutRef} className="relative z-10 bg-white text-[#01010e] min-h-screen">
//         <GridLines />

//         <div className="w-full min-h-screen flex items-center justify-center px-5 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-32">
//           <div className="w-full max-w-5xl mx-auto">
//             <div className="flex flex-col items-center text-center gap-2 sm:gap-3 lg:gap-4">

//               {/* Line 1 */}
//               <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
//                 <h2 className="text-[clamp(1.2rem,3.5vw,3.6rem)] font-bold leading-tight">
//                   Isneha Manandhar is a Nepal-based
//                 </h2>
//                 <img src="/images/person.jpg" alt="Isneha"
//                   className="hidden lg:block w-20 h-20 rounded-full object-cover shadow-xl shrink-0" loading="lazy" />
//               </div>

//               {/* Line 2 */}
//               <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
//                 <h2 className="text-[clamp(1.2rem,3.5vw,3.6rem)] font-bold leading-tight">Full Stack Developer</h2>
//                 <h2 className="text-[clamp(1.2rem,3.5vw,3.6rem)] font-bold leading-tight ">&amp; SEO Optimizer</h2>
//               </div>

//               {/* Line 3 */}
//               <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
//                 <h2 className="text-[clamp(1.2rem,3.5vw,3.6rem)] font-light leading-tight ">who crafts</h2>
//                 <h2 className="text-[clamp(1.2rem,3.5vw,3.6rem)] font-light leading-tight ">digital experiences</h2>
//               </div>

//               {/* Line 4 */}
//               <h2 className="text-[clamp(1.2rem,3.5vw,3.6rem)] font-light leading-tight ">
//                 from pixel-perfect frontends to scalable backends
//               </h2>

//               {/* Mobile CTA — only visible on mobile where the scroll-reveal doesn't play */}
//               <div className="mt-8 flex flex-col sm:hidden items-center gap-3 w-full">
//                 <p className="sm:text-gray-400 text-sm leading-relaxed max-w-[280px] text-center">
//                   Pokhara, Nepal · Open to freelance worldwide
//                 </p>
//                 <button
//                   onClick={() => navigate('/works')}
//                   className="mt-1 inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-[#01010e] px-5 py-3 hover:bg-[#01010e] hover:text-white transition-colors duration-300"
//                 >
//                   View works
//                   <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
//                     <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── PROJECTS SCROLL REVEAL (desktop) — stacked cards (mobile) ── */}

//       {/* Desktop: GSAP clip-path reveal */}
//       <section
//         ref={projectsRef}
//         className="relative z-20 hidden sm:block"
//         style={{ height: `${featuredProjects.length * 100}vh` }}
//       >
//         <div className="sticky top-0 h-screen w-full overflow-hidden">
//           {featuredProjects.map((project, index) => (
//             <div
//               key={project.id}
//               ref={(el) => (clipRefs.current[index] = el)}
//               className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
//               style={{ zIndex: index + 1 }}
//             >
//               <ProjectCard project={project} onNavigate={navigate} />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Mobile: simple stacked cards */}
//       <section className="sm:hidden relative z-20">
//         {featuredProjects.map((project) => (
//           <div key={project.id} className="relative w-full h-[75vw] max-h-[420px] overflow-hidden">
//             <ProjectCard project={project} onNavigate={navigate} />
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };

// const ProjectCard = ({ project, onNavigate }) => (
//   <div className="group relative w-full h-full">
//     <img src={project.imageUrl} alt={project.title}
//       className="absolute inset-0 w-full h-full object-cover" loading="lazy" />

//     {/* video on desktop hover */}
//     {project.videoUrl && (
//       <video
//         className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]"
//         loop muted playsInline preload="none"
//         onMouseEnter={(e) => e.currentTarget.play()}
//         onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
//       >
//         <source src={project.videoUrl} type="video/mp4" />
//       </video>
//     )}

//     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-[2]" />

//     <div className="absolute inset-x-0 bottom-0 z-[3] px-5 py-5 sm:px-8 sm:py-10 lg:px-16 lg:py-16 text-white">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
//           <h3 className="text-[clamp(2rem,8vw,7rem)] font-bold leading-none tracking-tight">
//             {project.title}
//           </h3>
//           <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end gap-3 sm:gap-4">
//             <div className="flex gap-3 opacity-50">
//               <span className="text-[0.6rem] uppercase tracking-widest">{project.category}</span>
//               <span className="text-[0.6rem] uppercase tracking-widest">{project.year}</span>
//             </div>
//             <button
//               onClick={() => onNavigate(`/works/${project.slug}`)}
//               className="inline-flex items-center gap-2 text-xs font-medium bg-transparent border-none text-white cursor-pointer hover:gap-4 transition-all duration-300"
//             >
//               <span className="block h-px w-5 bg-white" />
//               View
//               <span className="block h-px w-5 bg-white" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default About;

// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useNavigate } from 'react-router-dom';
// import { projects as allProjects } from '../data/projects';

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const featuredProjects = allProjects.slice(0, 3).map(p => ({
//   id: p.id,
//   title: p.title,
//   category: p.category,
//   year: p.year,
//   imageUrl: p.image,
//   videoUrl: p.videoUrl,
//   slug: p.slug,
// }));

// const About = () => {
//   const navigate    = useNavigate();
//   const wrapperRef  = useRef(null);
//   const aboutRef    = useRef(null);
//   const projectsRef = useRef(null);
//   const clipRefs    = useRef([]);

//   useEffect(() => {
//     const mm = gsap.matchMedia();

//     // ── Desktop (≥768px): original GSAP pin + clip-path scroll reveal ──
//     mm.add('(min-width: 768px)', () => {
//       ScrollTrigger.getAll().forEach(t => t.kill());
//       const totalProjectsHeight = projectsRef.current.offsetHeight;
//       gsap.set(projectsRef.current, { y: 0, clearProps: 'transform' });

//       ScrollTrigger.create({
//         trigger: aboutRef.current,
//         start: 'top top',
//         end: `+=${totalProjectsHeight}`,
//         pin: true,
//         pinSpacing: false,
//         anticipatePin: 1,
//         invalidateOnRefresh: true,
//       });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: aboutRef.current,
//           start: 'top top',
//           end: `+=${totalProjectsHeight}`,
//           scrub: 1,
//           invalidateOnRefresh: true,
//         },
//       });

//       clipRefs.current.forEach((clip, i) => {
//         if (!clip) return;
//         gsap.set(clip, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' });
//         const start = i / featuredProjects.length;
//         const end   = (i + 1) / featuredProjects.length;
//         tl.fromTo(clip,
//           { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
//           { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none', duration: end - start },
//           start
//         );
//       });

//       return () => {
//         ScrollTrigger.getAll().forEach(t => t.kill());
//         tl.kill();
//       };
//     });

//     return () => mm.revert();
//   }, []);

//   return (
//     <div ref={wrapperRef} className="relative">

//       {/* ─────────────────────────────────────────────────────────────
//           ABOUT — pinned on desktop, normal scroll on mobile
//       ───────────────────────────────────────────────────────────── */}
//       <section ref={aboutRef} className="relative z-10 bg-white text-[#01010e] min-h-screen">

//         {/* Grid lines */}
//         <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
//           {[...Array(9)].map((_, i) => (
//             <div
//               key={i}
//               className={`border-r border-gray-200 h-full ${i >= 4 ? 'hidden sm:block' : ''} ${i >= 6 ? 'hidden lg:block' : ''}`}
//             />
//           ))}
//         </div>

//         {/* ── DESKTOP content (original) — hidden on mobile ── */}
//         <div className="hidden sm:flex w-full min-h-screen items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-20 lg:py-24">
//           <div className="w-full max-w-[1400px] mx-auto">
//             <div className="flex flex-col items-center text-center gap-1 sm:gap-2 lg:gap-3">

//               <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
//                 <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-bold leading-tight">
//                   Isneha Manandhar is a Nepal-based
//                 </h2>
//                 <img src="/images/person.jpg" alt="Isneha Manandhar"
//                   className="hidden lg:block w-24 h-24 rounded-full object-cover shadow-xl shrink-0" loading="lazy" />
//               </div>

//               <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
//                 <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-bold leading-tight">Full Stack Developer</h2>
//                 <img src="/images/fullstack.png" alt="Full Stack"
//                   className="hidden lg:block w-14 h-14 shrink-0" loading="lazy" />
//                 <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-bold leading-tight text-[#c5c5c5]">&amp; SEO Optimizer</h2>
//               </div>

//               <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
//                 <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">who crafts</h2>
//                 <img
//                   src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991462bf76217807db9c6_DSC_9785.webp"
//                   alt="Crafting"
//                   className="hidden lg:block h-24 w-auto rounded-lg object-cover shadow-xl shrink-0" loading="lazy" />
//                 <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">digital experiences</h2>
//               </div>

//               <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
//                 <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">from pixel-perfect frontends</h2>
//                 <img
//                   src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991bb314d4830350b260f_Frame%2044390.webp"
//                   alt="Frontend"
//                   className="hidden lg:block h-24 w-auto rounded-lg object-cover shadow-xl shrink-0" loading="lazy" />
//               </div>

//               <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
//                 <img
//                   src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991db1dc4aa4d8d78e374_Frame%2044391.webp"
//                   alt="Backend"
//                   className="hidden lg:block h-24 w-auto rounded-lg object-cover shadow-xl shrink-0" loading="lazy" />
//                 <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">to scalable backends</h2>
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* ── MOBILE content — hidden on sm+ ── */}
//       <div className="w-full min-h-screen flex items-center justify-center px-5 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-32">
//         <div className="w-full max-w-5xl mx-auto">
//           <div className="flex flex-col items-center text-center gap-2 sm:gap-3 lg:gap-4">

//             {/* Line 1 */}
//             <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
//               <h2 className="text-[clamp(1.2rem,3.5vw,3.6rem)] font-bold leading-tight">
//                 Isneha Manandhar is a Nepal-based
//               </h2>
//               <img src="/images/person.jpg" alt="Isneha"
//                 className="hidden lg:block w-20 h-20 rounded-full object-cover shadow-xl shrink-0" loading="lazy" />
//             </div>

//             {/* Line 2 */}
//             <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
//               <h2 className="text-[clamp(1.2rem,3.5vw,3.6rem)] font-bold leading-tight">Full Stack Developer</h2>
//               <h2 className="text-[clamp(1.2rem,3.5vw,3.6rem)] font-bold leading-tight ">&amp; SEO Optimizer</h2>
//             </div>

//             {/* Line 3 */}
//             <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
//               <h2 className="text-[clamp(1.2rem,3.5vw,3.6rem)] font-light leading-tight ">who crafts</h2>
//               <h2 className="text-[clamp(1.2rem,3.5vw,3.6rem)] font-light leading-tight ">digital experiences</h2>
//             </div>

//             {/* Line 4 */}
//             <h2 className="text-[clamp(1.2rem,3.5vw,3.6rem)] font-light leading-tight ">
//               from pixel-perfect frontends to scalable backends
//             </h2>

//             {/* Mobile CTA — only visible on mobile where the scroll-reveal doesn't play */}
//             <div className="mt-8 flex flex-col sm:hidden items-center gap-3 w-full">
//               {/* <p className="sm:text-gray-400 text-sm leading-relaxed max-w-[280px] text-center">
//                 Pokhara, Nepal · Open to freelance worldwide
//               </p> */}
//               <button
//                 onClick={() => navigate('/works')}
//                 className="mt-1 inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-[#01010e] px-5 py-3 hover:bg-[#01010e] hover:text-white transition-colors duration-300"
//               >
//                 View works
//                 <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
//                   <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//         </div>
//       </section>

//      {/* PROJECTS — scroll reveal slides */}
//       <section ref={projectsRef} className="relative z-20" style={{ height: `${featuredProjects.length * 100}vh` }}>
//         <div className="sticky top-0 h-screen w-full overflow-hidden">
//           {featuredProjects.map((project, index) => (
//             <div
//               key={project.id}
//               ref={(el) => (clipRefs.current[index] = el)}
//               className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
//               style={{ zIndex: index + 1 }}
//             >
//               <div className="group relative w-full h-full">
//                 <img src={project.imageUrl} alt={project.title}
//                   className="absolute inset-0 w-full h-full object-cover" loading="lazy" />

//                 {/* Video hover — sm:block means hidden on mobile, visible on sm+ only */}
//                 {project.videoUrl && (
//                   <video
//                     className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]"
//                     loop muted playsInline preload="none"
//                     onMouseEnter={(e) => e.currentTarget.play()}
//                     onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
//                   >
//                     <source src={project.videoUrl} type="video/mp4" />
//                   </video>
//                 )}

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-[2]" />

//                 <div className="absolute inset-x-0 bottom-0 z-[3] px-4 py-6 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-16 text-white">
//                   <div className="max-w-7xl mx-auto">
//                     <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
//                       <h3 className="text-[clamp(2.8rem,9vw,8rem)] font-bold leading-none tracking-tight">
//                         {project.title}
//                       </h3>
//                       <div className="flex flex-row items-center justify-between sm:flex-row sm:items-end gap-4 sm:gap-8">
//                         <div className="flex flex-col gap-1 opacity-60">
//                           <span className="text-[0.65rem] sm:text-xs uppercase tracking-widest">{project.category}</span>
//                           <span className="text-[0.65rem] sm:text-xs uppercase tracking-widest">{project.year}</span>
//                         </div>
//                         <button
//                           onClick={() => navigate(`/works/${project.slug}`)}
//                           className="group/cta inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium hover:gap-4 transition-all duration-300 bg-transparent border-none text-white cursor-pointer"
//                         >
//                           <span className="block h-px w-5 sm:w-6 bg-white transition-all duration-300 group-hover/cta:w-8 sm:group-hover/cta:w-10" />
//                           About more
//                           <span className="block h-px w-5 sm:w-6 bg-white transition-all duration-300 group-hover/cta:w-8 sm:group-hover/cta:w-10" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//     </div>
//   );
// };

// export default About;


import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { projects as allProjects } from '../data/projects';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const featuredProjects = allProjects.slice(0, 3).map(p => ({
  id: p.id,
  title: p.title,
  category: p.category,
  year: p.year,
  imageUrl: p.image,
  videoUrl: p.videoUrl,
  slug: p.slug,
}));

const About = () => {
  const navigate    = useNavigate();
  const wrapperRef  = useRef(null);
  const aboutRef    = useRef(null);
  const projectsRef = useRef(null);
  const clipRefs    = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── Desktop (≥768px): pin + clip-path scroll reveal ──────────────────
    mm.add('(min-width: 768px)', () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      const totalProjectsHeight = projectsRef.current.offsetHeight;
      gsap.set(projectsRef.current, { y: 0, clearProps: 'transform' });

      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: 'top top',
        end: `+=${totalProjectsHeight}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top top',
          end: `+=${totalProjectsHeight}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      clipRefs.current.forEach((clip, i) => {
        if (!clip) return;
        gsap.set(clip, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' });
        const start = i / featuredProjects.length;
        const end   = (i + 1) / featuredProjects.length;
        tl.fromTo(
          clip,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none', duration: end - start },
          start
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        tl.kill();
      };
    });

    // ── Mobile (<768px): simple fade-up reveal on each project card ───────
    mm.add('(max-width: 767px)', () => {
      // Reset any clip-path left from a previous desktop session
      clipRefs.current.forEach(clip => {
        if (clip) gsap.set(clip, { clipPath: 'none', clearProps: 'clipPath' });
      });

      const cards = projectsRef.current?.querySelectorAll('.mobile-project-card');
      if (!cards) return;

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      return () => ScrollTrigger.getAll().forEach(t => t.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative">

      {/* ── ABOUT SECTION ─────────────────────────────────────────────────── */}
      <section ref={aboutRef} className="relative z-10 bg-white text-[#01010e] min-h-screen">

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`border-r border-gray-200 h-full ${i >= 4 ? 'hidden sm:block' : ''} ${i >= 6 ? 'hidden lg:block' : ''}`}
            />
          ))}
        </div>

        {/* ── DESKTOP layout (sm and above) ── */}
        <div className="hidden sm:flex w-full min-h-screen items-center justify-center px-6 md:px-8 lg:px-12 py-20 lg:py-24">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="flex flex-col items-center text-center gap-2 lg:gap-3">

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-bold leading-tight">
                  Isneha Manandhar is a Nepal-based
                </h2>
                <img src="/images/person.jpg" alt="Isneha Manandhar"
                  className="hidden lg:block w-24 h-24 rounded-full object-cover shadow-xl shrink-0" loading="lazy" />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-bold leading-tight">Full Stack Developer</h2>
                <img src="/images/fullstack.png" alt="Full Stack"
                  className="hidden lg:block w-14 h-14 shrink-0" loading="lazy" />
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-bold leading-tight text-[#c5c5c5]">&amp; SEO Optimizer</h2>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">who crafts</h2>
                <img
                  src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991462bf76217807db9c6_DSC_9785.webp"
                  alt="Crafting"
                  className="hidden lg:block h-24 w-auto rounded-lg object-cover shadow-xl shrink-0" loading="lazy" />
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">digital experiences</h2>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">from pixel-perfect frontends</h2>
                <img
                  src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991bb314d4830350b260f_Frame%2044390.webp"
                  alt="Frontend"
                  className="hidden lg:block h-24 w-auto rounded-lg object-cover shadow-xl shrink-0" loading="lazy" />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
                <img
                  src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991db1dc4aa4d8d78e374_Frame%2044391.webp"
                  alt="Backend"
                  className="hidden lg:block h-24 w-auto rounded-lg object-cover shadow-xl shrink-0" loading="lazy" />
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">to scalable backends</h2>
              </div>

            </div>
          </div>
        </div>

        {/* ── MOBILE layout (below sm) ── */}
        <div className="flex sm:hidden w-full min-h-screen items-center justify-center px-6 py-24">
          <div className="w-full">
            <div className="flex flex-col items-start text-left gap-4">

              <h2 className="text-[clamp(2rem,8vw,3rem)] font-bold leading-[1.1] tracking-tight">
                Isneha Manandhar
              </h2>

              <h2 className="text-[clamp(2rem,8vw,3rem)] font-bold leading-[1.1] tracking-tight">
                is a Nepal-based
              </h2>

              <h2 className="text-[clamp(2rem,8vw,3rem)] font-bold leading-[1.1] tracking-tight">
                Full Stack Developer
              </h2>

              <h2 className="text-[clamp(2rem,8vw,3rem)] font-bold leading-[1.1] tracking-tight text-[#c5c5c5]">
                &amp; SEO Optimizer
              </h2>

              <p className="text-base text-[#888] leading-relaxed mt-2 max-w-[320px]">
                Crafting digital experiences from pixel-perfect frontends to scalable backends.
              </p>

              <button
                onClick={() => navigate('/works')}
                className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-[#01010e] px-5 py-3 hover:bg-[#01010e] hover:text-white transition-colors duration-300"
              >
                View works
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

            </div>
          </div>
        </div>

      </section>

      {/* ── PROJECTS SECTION ──────────────────────────────────────────────── */}

      {/* Desktop: sticky clip-path scroll reveal */}
      <section
        ref={projectsRef}
        className="relative z-20 hidden sm:block"
        style={{ height: `${featuredProjects.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (clipRefs.current[index] = el)}
              className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
              style={{ zIndex: index + 1 }}
            >
              <ProjectCard project={project} navigate={navigate} />
            </div>
          ))}
        </div>
      </section>

      {/* Mobile: simple stacked cards with fade-up */}
      <section className="relative z-20 flex flex-col sm:hidden gap-0">
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            className="mobile-project-card relative w-full overflow-hidden"
            style={{ height: '75vw', minHeight: 260, maxHeight: 420 }}
          >
            <ProjectCard project={project} navigate={navigate} mobile />
          </div>
        ))}
      </section>

    </div>
  );
};

// ── Shared project card inner content ─────────────────────────────────────────
function ProjectCard({ project, navigate, mobile }) {
  return (
    <div className="group relative w-full h-full">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Video hover — desktop only */}
      {project.videoUrl && !mobile && (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]"
          loop muted playsInline preload="none"
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
        >
          <source src={project.videoUrl} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-[2]" />

      <div className="absolute inset-x-0 bottom-0 z-[3] px-5 py-5 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-16 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <h3 className="text-[clamp(1.8rem,7vw,8rem)] font-bold leading-none tracking-tight">
              {project.title}
            </h3>
            <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end gap-3 sm:gap-4">
              <div className="flex flex-row gap-3 opacity-60">
                <span className="text-[0.6rem] sm:text-xs uppercase tracking-widest">{project.category}</span>
                <span className="text-[0.6rem] sm:text-xs uppercase tracking-widest">{project.year}</span>
              </div>
              <button
                onClick={() => navigate(`/works/${project.slug}`)}
                className="group/cta inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium hover:gap-4 transition-all duration-300 bg-transparent border-none text-white cursor-pointer"
              >
                <span className="block h-px w-5 sm:w-6 bg-white transition-all duration-300 group-hover/cta:w-8 sm:group-hover/cta:w-10" />
                About more
                <span className="block h-px w-5 sm:w-6 bg-white transition-all duration-300 group-hover/cta:w-8 sm:group-hover/cta:w-10" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;