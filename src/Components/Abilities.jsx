// import { useEffect, useRef, useState } from 'react';

// export default function AbilitiesSection() {
//   const titleRef = useRef(null);
//   const abilitiesRef = useRef([]);
//   const [isHovered, setIsHovered] = useState(Array(4).fill(false));

//   useEffect(() => {
//     if (titleRef.current) {
//       titleRef.current.style.transform = 'translateY(0)';
//     }
//     abilitiesRef.current.forEach((el, index) => {
//       if (el) {
//         setTimeout(() => {
//           el.style.opacity = '1';
//         }, 100 + index * 100);
//       }
//     });
//   }, []);

//   const handleMouseEnter = (index) => {
//     setIsHovered(prev => { const n = [...prev]; n[index] = true; return n; });
//   };
//   const handleMouseLeave = (index) => {
//     setIsHovered(prev => { const n = [...prev]; n[index] = false; return n; });
//   };

//   const abilities = [
//     {
//       title: 'Front-end development',
//       description: 'Building pixel-perfect, responsive interfaces using React, Tailwind CSS, and modern JavaScript  where clean code meets intuitive design to deliver fast, engaging user experiences.',
//     },
//     {
//       title: 'User interface design',
//       description: 'Designing intuitive, visually compelling interfaces that balance aesthetics with function crafting every layout, color, and interaction with purpose and user-first thinking.',
//     },
//     {
//       title: 'Back-end development',
//       description: 'Architecting robust, scalable server-side systems with Node.js, REST APIs, and databases building the invisible engine that powers seamless, data-driven applications.',
//     },
//     {
//       title: 'Search engine optimization',
//       description: 'Optimizing web performance, semantic structure, and metadata to improve visibility ensuring every project is not just beautiful to users, but discoverable by search engines too.',
//     },
//   ];

//   return (
//     <div className="">
//       <section className="relative bg-white py-20 sm:py-28 lg:py-36 xl:py-44 overflow-hidden">
//         {/* Grid Lines */}
//         <div className="absolute inset-0 grid grid-cols-9 pointer-events-none">
//           {[...Array(9)].map((_, i) => (
//             <div key={i} className="border-r border-gray-200 h-full"></div>
//           ))}
//         </div>

//         {/* Content Container */}
//         <div className="relative w-full px-6 sm:px-8 lg:px-12">
//           {/* Layout Wrapper */}
//           <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-16 xl:gap-20">

//             {/* Title Section */}
//             <div className="overflow-hidden lg:flex-shrink-0">
//               <h2
//                 ref={titleRef}
//                 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight transition-transform duration-1000 ease-out"
//                 style={{
//                   transform: 'translateY(100px)',
//                   color: '#01010e',
//                   fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
//                 }}
//               >
//                 ABILITIES
//               </h2>
//             </div>

//             {/* Abilities Grid — 2 cols on all screen sizes */}
//             <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl lg:max-w-[43rem]">
//               {abilities.map((ability, index) => (
//                 <div
//                   key={index}
//                   ref={(el) => (abilitiesRef.current[index] = el)}
//                   className="group opacity-0 transition-all duration-700 border border-gray-300 py-6 rounded-lg hover:border-gray-500 hover:shadow-sm"
//                   onMouseEnter={() => handleMouseEnter(index)}
//                   onMouseLeave={() => handleMouseLeave(index)}
//                 >
//                   {/* Marquee Container */}
//                   <div className="relative overflow-hidden h-8 sm:h-12">
//                     <div
//                       className="absolute whitespace-nowrap flex will-change-transform"
//                       style={{
//                         animation: isHovered[index] ? 'none' : `marquee ${35 + index * 2}s linear infinite`,
//                       }}
//                     >
//                       {[...Array(10)].map((_, i) => (
//                         <span
//                           key={`first-${i}`}
//                           className="inline-block text-sm sm:text-3xl font-bold tracking-tight uppercase"
//                           style={{ color: '#01010e' }}
//                         >
//                           {ability.title}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="relative overflow-hidden mb-3 sm:mb-4 h-8 sm:h-12">
//                     <div
//                       className="absolute whitespace-nowrap flex will-change-transform"
//                       style={{
//                         animation: isHovered[index] ? 'none' : `marquee ${35 + index * 2}s linear infinite`,
//                       }}
//                     >
//                       {[...Array(10)].map((_, i) => (
//                         <span
//                           key={`first-${i}`}
//                           className="inline-block text-sm sm:text-3xl font-bold tracking-tight uppercase"
//                           style={{ color: '#01010e' }}
//                         >
//                           {ability.title}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <p
//                     className="text-[0.65rem] sm:text-base leading-relaxed px-2"
//                     style={{ color: '#555555' }}
//                   >
//                     {ability.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <style>{`
//           @keyframes marquee {
//             0%   { transform: translateX(0); }
//             100% { transform: translateX(-50%); }
//           }
//         `}</style>
//       </section>
//     </div>
//   );
// }



// import { useEffect, useRef, useState } from 'react';

// const abilities = [
//   {
//     title: 'Front-end',
//     titleFull: 'Front-end development',
//     description:
//       'Building pixel-perfect, responsive interfaces using React, Tailwind CSS, and modern JavaScript — where clean code meets intuitive design to deliver fast, engaging user experiences.',
//     icon: '⬡',
//   },
//   {
//     title: 'UI Design',
//     titleFull: 'User interface design',
//     description:
//       'Designing intuitive, visually compelling interfaces that balance aesthetics with function — crafting every layout, color, and interaction with purpose and user-first thinking.',
//     icon: '◈',
//   },
//   {
//     title: 'Back-end',
//     titleFull: 'Back-end development',
//     description:
//       'Architecting robust, scalable server-side systems with Node.js, REST APIs, and databases — building the invisible engine that powers seamless, data-driven applications.',
//     icon: '⬡',
//   },
//   {
//     title: 'SEO',
//     titleFull: 'Search engine optimization',
//     description:
//       'Optimizing web performance, semantic structure, and metadata to improve visibility — ensuring every project is not just beautiful to users, but discoverable by search engines.',
//     icon: '◈',
//   },
// ];

// export default function AbilitiesSection() {
//   const titleRef     = useRef(null);
//   const cardRefs     = useRef([]);
//   const [hovered, setHovered]   = useState(null);
//   const [expanded, setExpanded] = useState(null); // mobile tap-to-expand
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 640);
//     check();
//     window.addEventListener('resize', check);
//     return () => window.removeEventListener('resize', check);
//   }, []);

//   // Animate title + cards in
//   useEffect(() => {
//     if (titleRef.current) {
//       titleRef.current.style.transform = 'translateY(0)';
//       titleRef.current.style.opacity   = '1';
//     }
//     cardRefs.current.forEach((el, i) => {
//       if (!el) return;
//       setTimeout(() => {
//         el.style.opacity   = '1';
//         el.style.transform = 'translateY(0)';
//       }, 150 + i * 100);
//     });
//   }, []);

//   const activeIdx = isMobile ? expanded : hovered;

//   return (
//     <section className="relative bg-white py-20 sm:py-28 lg:py-36 overflow-hidden">
//       {/* Grid lines */}
//       <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 pointer-events-none">
//         {[...Array(9)].map((_, i) => (
//           <div key={i} className={`border-r border-gray-300 h-full ${i >= 4 ? 'hidden sm:block' : ''} ${i >= 6 ? 'hidden lg:block' : ''}`} />
//         ))}
//       </div>

//       <div className="relative w-full px-5 sm:px-8 lg:px-12">
//         <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-20">

//           {/* Title */}
//           <div className="overflow-hidden lg:flex-shrink-0">
//             <h2
//               ref={titleRef}
//               className="text-5xl sm:text-7xl lg:text-9xl font-bold leading-none tracking-tight text-[#01010e] transition-all duration-1000 ease-out"
//               style={{ transform: 'translateY(40px)', opacity: 0 }}
//             >
//               ABILITIES
//             </h2>
//           </div>

//           {/* Cards grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full lg:max-w-[44rem]">
//             {abilities.map((ability, index) => {
//               const isActive = activeIdx === index;

//               return (
//                 <div
//                   key={index}
//                   ref={(el) => (cardRefs.current[index] = el)}
//                   className={`group relative border rounded-xl overflow-hidden cursor-pointer
//                     transition-all duration-400 ease-out
//                     ${isActive ? 'border-[#01010e] shadow-md' : 'border-gray-200 hover:border-gray-400'}
//                   `}
//                   style={{ opacity: 0, transform: 'translateY(20px)' }}
//                   onMouseEnter={() => !isMobile && setHovered(index)}
//                   onMouseLeave={() => !isMobile && setHovered(null)}
//                   onClick={() => isMobile && setExpanded(v => v === index ? null : index)}
//                 >
//                   {/* Background fill on active */}
//                   <div
//                     className={`absolute inset-0 bg-[#01010e] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-bottom ${
//                       isActive ? 'scale-y-100' : 'scale-y-0'
//                     }`}
//                   />

//                   <div className="relative z-10 p-5 sm:p-6 flex flex-col gap-4">
//                     {/* Icon + title row */}
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <span className={`text-[0.65rem] uppercase tracking-[0.3em] font-medium transition-colors duration-300 ${isActive ? 'text-white/50' : 'text-gray-400'}`}>
//                           {String(index + 1).padStart(2, '0')}
//                         </span>
//                         <h3 className={`text-lg sm:text-xl font-bold mt-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#01010e]'}`}>
//                           {ability.titleFull}
//                         </h3>
//                       </div>
//                       {/* Expand indicator on mobile */}
//                       <span className={`sm:hidden text-xl transition-all duration-300 ${isActive ? 'rotate-45 text-white' : 'rotate-0 text-gray-300'}`}>
//                         +
//                       </span>
//                     </div>

//                     {/* Description — always visible on desktop hover, toggle on mobile */}
//                     <div className={`overflow-hidden transition-all duration-400 ease-out ${
//                       isActive ? 'max-h-40 opacity-100' : isMobile ? 'max-h-0 opacity-0' : 'max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100'
//                     }`}>
//                       <p className={`text-sm leading-relaxed ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
//                         {ability.description}
//                       </p>
//                     </div>

//                     {/* Static subtitle visible on desktop when not hovered */}
//                     <div className={`sm:hidden text-xs text-gray-400 transition-all duration-300 ${isActive ? 'hidden' : 'block'}`}>
//                       Tap to learn more
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef, useState } from 'react';

const abilities = [
  {
    title: 'Front-end development',
    titleFull: 'Front-end development',
    description:
      'Building pixel-perfect, responsive interfaces using React, Tailwind CSS, and modern JavaScript where clean code meets intuitive design to deliver fast, engaging user experiences.',
  },
  {
    title: 'User interface design',
    titleFull: 'User interface design',
    description:
      'Designing intuitive, visually compelling interfaces that balance aesthetics with function crafting every layout, color, and interaction with purpose and user-first thinking.',
  },
  {
    title: 'Back-end development',
    titleFull: 'Back-end development',
    description:
      'Architecting robust, scalable server-side systems with Node.js, REST APIs, and databases building the invisible engine that powers seamless, data-driven applications.',
  },
  {
    title: 'Search engine optimization',
    titleFull: 'Search engine optimization',
    description:
      'Optimizing web performance, semantic structure, and metadata to improve visibility ensuring every project is not just beautiful to users, but discoverable by search engines too.',
  },
];

export default function AbilitiesSection() {
  const titleRef      = useRef(null);
  const titleMobRef   = useRef(null);
  const abilitiesRef  = useRef([]);
  const cardRefs      = useRef([]);
  const [isHovered, setIsHovered] = useState(Array(4).fill(false));
  const [expanded, setExpanded]   = useState(null);

  // ── Desktop: slide-up title + fade-in cards ──
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.transform = 'translateY(0)';
    }
    abilitiesRef.current.forEach((el, i) => {
      if (el) setTimeout(() => { el.style.opacity = '1'; }, 100 + i * 100);
    });
  }, []);

  // ── Mobile: slide-up title + fade-in cards ──
  useEffect(() => {
    if (titleMobRef.current) {
      titleMobRef.current.style.transform = 'translateY(0)';
      titleMobRef.current.style.opacity   = '1';
    }
    cardRefs.current.forEach((el, i) => {
      if (el) setTimeout(() => {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      }, 150 + i * 100);
    });
  }, []);

  const handleMouseEnter = (i) =>
    setIsHovered(prev => { const n = [...prev]; n[i] = true; return n; });
  const handleMouseLeave = (i) =>
    setIsHovered(prev => { const n = [...prev]; n[i] = false; return n; });

  return (
    <div>
      {/* ═══════════════════════════════════════════════
          DESKTOP  (sm and above) — original marquee design
      ═══════════════════════════════════════════════ */}
      <section className="hidden sm:block relative bg-white py-20 sm:py-28 lg:py-36 xl:py-44 overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-9 pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border-r border-gray-200 h-full" />
          ))}
        </div>

        {/* Content */}
        <div className="relative w-full px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-16 xl:gap-20">

            {/* Title */}
            <div className="overflow-hidden lg:flex-shrink-0">
              <h2
                ref={titleRef}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight transition-transform duration-1000 ease-out"
                style={{
                  transform: 'translateY(100px)',
                  color: '#01010e',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                ABILITIES
              </h2>
            </div>

            {/* 2-col grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl lg:max-w-[43rem]">
              {abilities.map((ability, index) => (
                <div
                  key={index}
                  ref={(el) => (abilitiesRef.current[index] = el)}
                  className="group opacity-0 transition-all duration-700 border border-gray-300 py-6 rounded-lg hover:border-gray-500 hover:shadow-sm"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {/* Marquee row 1 */}
                  <div className="relative overflow-hidden h-8 sm:h-12">
                    <div
                      className="absolute whitespace-nowrap flex will-change-transform"
                      style={{
                        animation: isHovered[index]
                          ? 'none'
                          : `marquee ${35 + index * 2}s linear infinite`,
                      }}
                    >
                      {[...Array(10)].map((_, i) => (
                        <span
                          key={`a-${i}`}
                          className="inline-block text-sm sm:text-3xl font-bold tracking-tight uppercase"
                          style={{ color: '#01010e' }}
                        >
                          {ability.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Marquee row 2 */}
                  <div className="relative overflow-hidden mb-3 sm:mb-4 h-8 sm:h-12">
                    <div
                      className="absolute whitespace-nowrap flex will-change-transform"
                      style={{
                        animation: isHovered[index]
                          ? 'none'
                          : `marquee ${35 + index * 2}s linear infinite`,
                      }}
                    >
                      {[...Array(10)].map((_, i) => (
                        <span
                          key={`b-${i}`}
                          className="inline-block text-sm sm:text-3xl font-bold tracking-tight uppercase"
                          style={{ color: '#01010e' }}
                        >
                          {ability.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-[0.65rem] sm:text-base leading-relaxed px-2"
                    style={{ color: '#555555' }}
                  >
                    {ability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════════
          MOBILE  (below sm) — tap-to-expand card design
      ═══════════════════════════════════════════════ */}
      <section className="sm:hidden relative bg-white py-20 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-r border-gray-200 h-full" />
          ))}
        </div>

        <div className="relative w-full px-5">
          <div className="flex flex-col gap-10">

            {/* Mobile title */}
            <div className="overflow-hidden">
              <h2
                ref={titleMobRef}
                className="text-5xl font-bold leading-none tracking-tight text-[#01010e] transition-all duration-1000 ease-out"
                style={{ transform: 'translateY(40px)', opacity: 0 }}
              >
                ABILITIES
              </h2>
            </div>

            {/* 1-col cards */}
            <div className="flex flex-col gap-3">
              {abilities.map((ability, index) => {
                const isActive = expanded === index;
                return (
                  <div
                    key={index}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className={`relative border rounded-xl overflow-hidden cursor-pointer transition-all duration-500
                      ${isActive ? 'border-[#01010e]' : 'border-gray-200'}`}
                    style={{ opacity: 0, transform: 'translateY(20px)' }}
                    onClick={() => setExpanded(v => v === index ? null : index)}
                  >
                    {/* Dark fill */}
                    <div
                      className={`absolute inset-0 bg-[#01010e] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-bottom ${
                        isActive ? 'scale-y-100' : 'scale-y-0'
                      }`}
                    />

                    <div className="relative z-10 p-5 flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className={`text-[0.6rem] uppercase tracking-[0.3em] font-medium transition-colors duration-300 ${isActive ? 'text-white/40' : 'text-gray-400'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className={`text-base font-bold mt-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#01010e]'}`}>
                            {ability.titleFull}
                          </h3>
                        </div>
                        <span className={`text-xl font-light transition-all duration-300 ${isActive ? 'rotate-45 text-white/60' : 'text-gray-300'}`}>
                          +
                        </span>
                      </div>

                      {/* Expandable description */}
                      <div
                        className={`overflow-hidden transition-all duration-400 ease-out ${
                          isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-sm leading-relaxed text-white/75">
                          {ability.description}
                        </p>
                      </div>

                      {/* Hint when collapsed */}
                      {!isActive && (
                        <p className="text-[0.65rem] text-gray-400">Tap to learn more</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}