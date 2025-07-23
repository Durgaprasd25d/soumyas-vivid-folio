import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack MERN e-commerce application with payment integration, user authentication, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates, team collaboration, and progress tracking.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    tech: ["React", "TypeScript", "Node.js", "Socket.io"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application with location-based forecasts, interactive maps, and weather alerts.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
    tech: ["React", "OpenWeather API", "Chart.js", "Tailwind"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    title: "Java Spring Microservices",
    description: "Scalable microservices architecture with Spring Boot, implementing REST APIs and service discovery.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    tech: ["Java", "Spring Boot", "MySQL", "Docker", "AWS"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  }
];

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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

      // Project cards animation
      const projectCards = projectsRef.current?.querySelectorAll('.project-card');
      projectCards?.forEach((card, index) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 100,
            scale: 0.9 
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Hover animations
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
          });
          
          const image = card.querySelector('.project-image');
          gsap.to(image, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
          
          const image = card.querySelector('.project-image');
          gsap.to(image, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient"
        >
          Featured Projects
        </h2>
        
        <div ref={projectsRef} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`project-card tech-card group cursor-pointer ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-48 object-cover transition-transform duration-300"
                />
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
                
                {/* Overlay with buttons */}
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button size="sm" variant="secondary" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </Button>
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Github className="w-4 h-4" />
                    Code
                  </Button>
                </div>
              </div>
              
              {/* Project Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary group-hover:text-primary-glow transition-colors duration-200">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-secondary/70 text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium border border-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};