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
  const navigate = useNavigate();
  const wrapperRef  = useRef(null);
  const aboutRef    = useRef(null);
  const projectsRef = useRef(null);
  const clipRefs    = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 0px)', () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      const totalProjectsHeight = projectsRef.current.offsetHeight;
      gsap.set(projectsRef.current, { y: 0, clearProps: 'transform' });

      ScrollTrigger.create({
        trigger: aboutRef.current, start: 'top top',
        end: `+=${totalProjectsHeight}`, pin: true, pinSpacing: false,
        anticipatePin: 1, invalidateOnRefresh: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current, start: 'top top',
          end: `+=${totalProjectsHeight}`, scrub: 1, invalidateOnRefresh: true,
        },
      });

      clipRefs.current.forEach((clip, i) => {
        if (!clip) return;
        gsap.set(clip, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' });
        const start = i / featuredProjects.length;
        const end   = (i + 1) / featuredProjects.length;
        tl.fromTo(clip,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none', duration: end - start },
          start
        );
      });

      return () => { ScrollTrigger.getAll().forEach(t => t.kill()); tl.kill(); };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative">

     {/* ABOUT — pinned section */}
<section ref={aboutRef} className="relative z-10 bg-white text-[#01010e] min-h-screen">
  <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
    {[...Array(9)].map((_, i) => (
      <div
        key={i}
        className={`border-r border-gray-200 h-full ${i >= 4 ? 'hidden sm:block' : ''} ${i >= 6 ? 'hidden lg:block' : ''}`}
      />
    ))}
  </div>

  <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-20 lg:py-24">
    <div className="w-full max-w-[1400px] mx-auto">
      <div className="flex flex-col items-center text-center gap-1 sm:gap-2 lg:gap-3">

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
          <h2 className="text-3xl  leading-relaxed tracking-[3px] sm:text-[clamp(1.4rem,3.8vw,4rem)] font-bold lsm:tracking-none sm:eading-tight">
            Isneha Manandhar is a Nepal-based
          </h2>
          <img src="/images/person.jpg" alt="Isneha Manandhar"
            className="hidden lg:block w-24 h-24 rounded-full object-cover shadow-xl shrink-0" loading="lazy" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
          <h2 className="text-3xl  leading-relaxed tracking-[3px] sm:text-[clamp(1.4rem,3.8vw,4rem)] font-bold lsm:tracking-none sm:eading-tight">Full Stack Developer</h2>
          <img src="/images/fullstack.png" alt="Full Stack"
            className="hidden lg:block w-14 h-14 shrink-0" loading="lazy" />
          <h2 className="text-3xl  leading-relaxed tracking-[3px] sm:text-[clamp(1.4rem,3.8vw,4rem)] font-bold lsm:tracking-none sm:eading-tight sm:text-[#c5c5c5]">&amp; SEO Optimizer</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
          <h2 className="text-3xl  leading-relaxed tracking-[3px] sm:text-[clamp(1.4rem,3.8vw,4rem)] font-light sm:tracking-none sm:leading-tight sm:text-[#c5c5c5]">who crafts</h2>
          <img src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991462bf76217807db9c6_DSC_9785.webp" alt="Crafting"
            className="hidden lg:block h-24 w-auto rounded-lg object-cover shadow-xl shrink-0" loading="lazy" />
          <h2 className="text-3xl  leading-relaxed tracking-[3px] sm:text-[clamp(1.4rem,3.8vw,4rem)] font-light sm:tracking-none sm:leading-tight sm:text-[#c5c5c5]">digital experiences</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
          <h2 className="text-3xl  leading-relaxed tracking-[3px] sm:text-[clamp(1.4rem,3.8vw,4rem)] font-light sm:tracking-none sm:leading-tight sm:text-[#c5c5c5]">from pixel-perfect frontends</h2>
          <img src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991bb314d4830350b260f_Frame%2044390.webp" alt="Frontend"
            className="hidden lg:block h-24 w-auto rounded-lg object-cover shadow-xl shrink-0" loading="lazy" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
          <img src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991db1dc4aa4d8d78e374_Frame%2044391.webp" alt="Backend"
            className="hidden lg:block h-24 w-auto rounded-lg object-cover shadow-xl shrink-0" loading="lazy" />
          <h2 className="text-3xl  leading-relaxed tracking-[3px] sm:text-[clamp(1.4rem,3.8vw,4rem)] font-light sm:tracking-none sm:leading-tight sm:text-[#c5c5c5]">to scalable backends</h2>
        </div>

      </div>
    </div>
  </div>
</section>

      {/* PROJECTS — scroll reveal slides */}
      <section ref={projectsRef} className="relative z-20" style={{ height: `${featuredProjects.length * 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (clipRefs.current[index] = el)}
              className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
              style={{ zIndex: index + 1 }}
            >
              <div className="group relative w-full h-full">
                <img src={project.imageUrl} alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover" loading="lazy" />

                {/* Video hover — sm:block means hidden on mobile, visible on sm+ only */}
                {project.videoUrl && (
                  <video
                    className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]"
                    loop muted playsInline preload="none"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-[2]" />

                <div className="absolute inset-x-0 bottom-0 z-[3] px-4 py-6 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-16 text-white">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                      <h3 className="text-[clamp(2.8rem,9vw,8rem)] font-bold leading-none tracking-tight">
                        {project.title}
                      </h3>
                      <div className="flex flex-row items-center justify-between sm:flex-row sm:items-end gap-4 sm:gap-8">
                        <div className="flex flex-col gap-1 opacity-60">
                          <span className="text-[0.65rem] sm:text-xs uppercase tracking-widest">{project.category}</span>
                          <span className="text-[0.65rem] sm:text-xs uppercase tracking-widest">{project.year}</span>
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
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;