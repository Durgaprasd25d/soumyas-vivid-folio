import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { FloatingTechIcons } from './FloatingTechIcons';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, taglineRef.current, buttonsRef.current], {
        opacity: 0,
        y: 50
      });
      
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        rotation: -10
      });

      // Animate elements in sequence
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.6");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-background via-muted/30 to-secondary/20"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-gradient">Soumyaranjan</span><br />
              <span className="text-foreground">Maharana</span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl text-primary font-semibold"
            >
              MERN Stack Developer | Java Backend Specialist
            </p>
            
            <p 
              ref={taglineRef}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Building full-stack web applications with performance and precision, 
              crafting seamless user experiences from concept to deployment.
            </p>
            
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="hero-gradient hover-glow text-lg px-8 py-3 h-auto font-semibold"
              >
                View Resume
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-3 h-auto font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Contact Me
              </Button>
            </div>
          </div>

          {/* Right Content - Profile & Floating Icons */}
          <div className="relative flex justify-center lg:justify-end">
            <div 
              ref={imageRef}
              className="relative"
            >
              {/* Profile Picture */}
              <div className="relative z-10">
                <div className="w-80 h-80 rounded-full overflow-hidden card-shadow border-4 border-secondary/50">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Soumyaranjan Maharana"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
              </div>
              
              {/* Floating Tech Icons */}
              <FloatingTechIcons />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};