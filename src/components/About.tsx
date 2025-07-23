import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Instructor",
    company: "QLith Innovation",
    period: "2024 - Present",
    description: "Teaching MERN stack development and mentoring students in full-stack web development."
  },
  {
    title: "MERN Stack Developer",
    company: "Weaver Infotech",
    period: "2023 - 2024", 
    description: "Developed scalable web applications using MongoDB, Express.js, React, and Node.js."
  },
  {
    title: "Java Backend Developer",
    company: "Codesoft",
    period: "2022 - 2023",
    description: "Built robust backend systems using Java, Spring Boot, and database management."
  }
];

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      // Content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline items animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      timelineItems?.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 px-6 bg-secondary/10 relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(120,255,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(120,255,120,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 font-orbitron"
        >
          <span className="neon-text">About</span>{' '}
          <span className="text-gradient">Me</span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer with expertise in modern web technologies. 
              My journey in software development spans across various domains, from frontend user 
              interfaces to robust backend systems.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              With a strong foundation in JavaScript, Java, and database management, I create 
              efficient, scalable solutions that bridge the gap between user experience and 
              technical excellence. I'm passionate about clean code, performance optimization, 
              and staying current with emerging technologies.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently, I'm sharing my knowledge as an instructor while continuing to build 
              innovative applications that solve real-world problems.
            </p>
          </div>

          {/* Right Content - Timeline */}
          <div ref={timelineRef} className="space-y-8">
            <h3 className="text-2xl font-semibold mb-8 text-primary">Experience Timeline</h3>
            
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item relative pl-8 border-l-2 border-primary/30">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full border-4 border-background"></div>
                
                <div className="tech-card">
                  <h4 className="text-xl font-semibold text-primary">{exp.title}</h4>
                  <p className="text-accent font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};