import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: "React", logo: "⚛️" },
  { name: "Node.js", logo: "🟢" },
  { name: "MongoDB", logo: "🍃" },
  { name: "Express", logo: "⚡" },
  { name: "JavaScript", logo: "💛" },
  { name: "TypeScript", logo: "💙" },
  { name: "Java", logo: "☕" },
  { name: "Spring Boot", logo: "🌱" },
  { name: "HTML5", logo: "🧡" },
  { name: "CSS3", logo: "💙" },
  { name: "Tailwind", logo: "🎨" },
  { name: "Git", logo: "📝" },
  { name: "Docker", logo: "🐳" },
  { name: "AWS", logo: "☁️" },
  { name: "Netlify", logo: "🚀" },
  { name: "Vercel", logo: "⚫" }
];

export const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Infinite scrolling animation
      const carousel = carouselRef.current;
      if (carousel) {
        const firstRow = carousel.querySelector('.tech-row');
        if (firstRow) {
          const width = firstRow.scrollWidth;
          
          gsap.set(firstRow, { x: 0 });
          
          gsap.to(firstRow, {
            x: -width / 2,
            duration: 20,
            ease: "none",
            repeat: -1
          });
        }
      }

      // Tech item hover animations
      const techItems = carousel?.querySelectorAll('.tech-item');
      techItems?.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.1,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate tech stack for seamless loop
  const duplicatedTechStack = [...techStack, ...techStack];

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-muted/20 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient"
        >
          Tech Stack
        </h2>
        
        <div ref={carouselRef} className="relative">
          <div className="tech-row flex gap-8 whitespace-nowrap">
            {duplicatedTechStack.map((tech, index) => (
              <div
                key={index}
                className="tech-item flex-shrink-0 w-32 h-32 bg-card rounded-xl border border-tech-border flex flex-col items-center justify-center card-shadow hover-glow cursor-pointer group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {tech.logo}
                </div>
                <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors duration-200">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-muted/20 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-muted/20 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};