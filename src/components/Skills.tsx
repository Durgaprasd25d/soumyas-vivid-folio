import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Bootstrap", "Tailwind CSS", "TypeScript"],
    icon: "🎨"
  },
  {
    title: "Backend", 
    skills: ["Node.js", "Express.js", "Java", "Spring Boot", "RESTful APIs", "JWT"],
    icon: "⚙️"
  },
  {
    title: "Database",
    skills: ["MongoDB", "MySQL", "Database Design", "Aggregation", "Indexing"],
    icon: "🗄️"
  },
  {
    title: "Tools & Platform",
    skills: ["Git", "GitHub", "Postman", "Netlify", "Vercel", "VS Code", "Docker"],
    icon: "🛠️"
  }
];

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Skill cards animation
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 80,
            scale: 0.8 
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Hover animations
        const skillItems = card.querySelectorAll('.skill-item');
        card.addEventListener('mouseenter', () => {
          gsap.to(skillItems, {
            scale: 1.05,
            duration: 0.2,
            stagger: 0.03,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(skillItems, {
            scale: 1,
            duration: 0.2,
            stagger: 0.03,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-6 bg-background relative">
      {/* Floating code snippets background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-10 font-mono text-primary transform rotate-12">{'{ code: "art" }'}</div>
        <div className="absolute top-40 right-20 font-mono text-accent transform -rotate-6">{'function() { return magic; }'}</div>
        <div className="absolute bottom-32 left-20 font-mono text-primary transform rotate-6">{'<creativity />'}</div>
        <div className="absolute bottom-20 right-10 font-mono text-accent transform -rotate-12">{'console.log("innovation");'}</div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 font-orbitron"
        >
          <span className="neon-text">Skills</span>{' '}
          <span className="text-gradient">&</span>{' '}
          <span className="neon-text">Technologies</span>
        </h2>
        
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="skill-card tech-card group cursor-pointer"
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-semibold text-primary">{category.title}</h3>
              </div>
              
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="skill-item bg-secondary/50 rounded-lg px-4 py-2 text-center text-sm font-medium text-secondary-foreground border border-secondary/70 transition-all duration-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};