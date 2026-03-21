

// import React from 'react';
// import { motion } from 'framer-motion';

// const Hero = () => {
//   return (
//     <section
//       id="home"
//       className="
//         relative min-h-screen flex items-center justify-center
//         overflow-hidden 
//       "
//     >
//       {/* ── Grid Lines ── */}
//       <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 pointer-events-none">
//         {[...Array(9)].map((_, i) => (
//           <div key={i} className="border-r border-gray-200" />
//         ))}
//       </div>

//       {/* ── Content ── */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28 lg:py-36">
//         <div className="flex flex-col items-center text-center">

//           {/* ISNEHA
//               - overflow-hidden keeps the slide-up animation
//               - pb-[0.15em] stops the bottom edge being clipped
//               - clamp() gives smooth scaling across ALL screen sizes
//           */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="overflow-hidden w-full pb-[0.15em]"
//           >
//             <h1
//               className="
//                 font-display leading-none text-primary tracking-tight
//                 text-[clamp(3.2rem,12vw,12rem)]
//               "
//             >
//               ISNEHA
//             </h1>
//           </motion.div>

//           {/* Role */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="my-2 sm:my-3 lg:my-4"
//           >
//             <p
//               className="
//                 text-gray-400 uppercase tracking-widest
//                 text-[0.6rem] sm:text-xs md:text-sm lg:text-base
//               "
//             >
//               Fullstack Developer
//             </p>
//           </motion.div>

//           {/* MANANDHAR
//               - py-[0.15em] protects top AND bottom edges from clipping
//           */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="overflow-hidden w-full py-[0.15em]"
//           >
//             <h1
//               className="
//                 font-display leading-none text-primary tracking-tight
//                 text-[clamp(3.2rem,12vw,12rem)]
//               "
//             >
//               MANANDHAR
//             </h1>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



// import React from 'react';
// import { motion } from 'framer-motion';

// const Hero = () => {
//   return (
//     <section
//       id="home"
//       className="
//         relative min-h-screen flex items-center justify-center
//         overflow-hidden 
//       "
//     >
//       {/* ── Grid Lines ── 
//           Fix: always render all 9 cols on every screen so lines reach full height.
//           On small screens the 4-col/6-col subsets were cutting off the rightmost lines.
//       */}
//       <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 pointer-events-none">
//         {[...Array(9)].map((_, i) => (
//           <div
//             key={i}
//             className={`
//               border-r border-gray-200 h-full
//               ${i >= 4 ? 'hidden sm:block' : ''}
//               ${i >= 6 ? 'hidden lg:block' : ''}
//             `}
//           />
//         ))}
//       </div>

//       {/* ── Content ──
//           Fix: tighten py on mobile (py-12) while keeping sm/lg values untouched.
//       */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-28 lg:py-36">
//         <div className="flex flex-col items-center text-center">

//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="overflow-hidden w-full pb-[0.15em]"
//           >
//             <h1
//               className="
//                 font-display leading-none text-primary tracking-tight
//                 text-[clamp(2.6rem,12vw,7.2rem)] sm:text-[clamp(3.2rem,12vw,12rem)]
//               "
//             >
//               ISNEHA
//             </h1>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="my-2 sm:my-3 lg:my-4"
//           >
//             <p
//               className="
//                 text-gray-400 uppercase tracking-widest
//                 text-[0.55rem] sm:text-xs md:text-sm lg:text-base
//               "
//             >
//               Fullstack Developer
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="overflow-hidden w-full py-[0.15em]"
//           >
//             <h1
//               className="
//                 font-display leading-none text-primary tracking-tight
//                 text-[clamp(2.6rem,12vw,7.2rem)] sm:text-[clamp(3.2rem,12vw,12rem)]
//               "
//             >
//               MANANDHAR
//             </h1>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollRef = useRef(null);

  // Subtle parallax on scroll — lightweight, no GSAP needed
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const y = window.scrollY * 0.25;
      scrollRef.current.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Grid lines — responsive col count */}
      <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 pointer-events-none">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`border-r border-gray-300 h-full ${i >= 4 ? 'hidden sm:block' : ''} ${i >= 6 ? 'hidden lg:block' : ''}`}
          />
        ))}
      </div>


      


      

      

      {/* Main content */}
      <div ref={scrollRef} className="relative z-10 w-full px-4 sm:px-8 lg:px-12 flex flex-col items-center text-center will-change-transform">
        {/* ISNEHA */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="overflow-hidden w-full pb-[0.08em]"
        >
          <h1 className="font-display leading-relaxed sm:leading-[0.9] tracking-[5px] sm:tracking-tight text-[#01010e] text-5xl sm:text-[clamp(3.2rem,14vw,11.5rem)]">
            ISNEHA
          </h1>
        </motion.div>

        {/* Role pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="my-3 sm:my-4 lg:my-5"
        >
          <div className=" inline-flex items-center gap-2 ">
            {/* <span className="relative flex w-1.5 h-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span> */}
            <p className="text-gray-500 uppercase tracking-widest text-[1.6rem] sm:text-[0.9rem]">
              Fullstack Developer 
            </p>
          </div>
        </motion.div>

        {/* MANANDHAR */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="overflow-hidden w-full py-[0.08em]"
        >
          <h1 className="font-display leading-relaxed sm:leading-[0.9]  tracking-[5px] sm:tracking-tight text-[#01010e] text-5xl sm:text-[clamp(2rem,10.5vw,8.7rem)]">
            MANANDHAR
          </h1>
        </motion.div>

        {/* Sub-tagline — mobile only, hidden on larger screens where layout is spacious enough */}
        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 sm:mt-10 text-gray-400 text-sm sm:text-base max-w-xs sm:max-w-sm text-center leading-relaxed sm:hidden"
        >
          Nepal-based builder of fast, beautiful full-stack web experiences.
        </motion.p> */}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="sm:text-[0.6rem] text-lg uppercase tracking-[0.3em] text-gray-500 sm:text-gray-300">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;