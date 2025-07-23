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
    <section ref={sectionRef} id="techstack" className="py-20 px-6 bg-secondary/5 overflow-hidden relative">
      {/* Animated circuit board background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-primary/30 rounded"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border border-accent/30 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-primary/30 rounded"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 border border-accent/30 rounded-full"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 font-orbitron"
        >
          <span className="neon-text">Tech</span>{' '}
          <span className="text-gradient">Stack</span>
        </h2>
        
        <div ref={carouselRef} className="relative">
          <div className="tech-row flex gap-8 whitespace-nowrap">
            {duplicatedTechStack.map((tech, index) => (
              <div
                key={index}
                className="tech-item flex-shrink-0 w-32 h-32 glass-card neon-border rounded-xl flex flex-col items-center justify-center card-shadow hover-glow cursor-pointer group relative"
              >
                <div className="text-3xl mb-2 group-hover:scale-125 group-hover:animate-bounce transition-all duration-300">
                  {tech.logo}
                </div>
                <span className="text-sm font-medium font-mono text-card-foreground group-hover:text-primary transition-colors duration-200">
                  {tech.name}
                </span>
                
                {/* Glowing particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-2 right-2 w-1 h-1 bg-primary rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-accent rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced gradient overlays */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background via-background/80 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};