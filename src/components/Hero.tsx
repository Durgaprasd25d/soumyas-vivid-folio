import { useEffect, useRef, useState } from 'react';
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
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const fullText = "MERN Stack Developer | Java Backend Specialist";

  useEffect(() => {
    // Typing effect
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        // Blinking cursor effect
        setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 4 }); // Start after loading screen
      
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, taglineRef.current, buttonsRef.current], {
        opacity: 0,
        y: 80
      });
      
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.6,
        rotation: -15
      });

      // Animate elements in sequence with creative effects
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6")
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.8");

      // Continuous glow animation for title
      gsap.to(titleRef.current, {
        textShadow: "0 0 20px hsl(120 100% 50%), 0 0 40px hsl(120 100% 50%)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 py-20 pt-32 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <h1 
              ref={titleRef}
              className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight font-orbitron"
            >
              <span className="glitch neon-text" data-text="Soumyaranjan">
                Soumyaranjan
              </span>
              <br />
              <span className="text-gradient font-bold">
                Maharana
              </span>
            </h1>
            
            <div 
              ref={subtitleRef}
              className="text-xl md:text-2xl lg:text-3xl font-mono font-medium min-h-[40px]"
            >
              <span className="text-primary">
                {typedText}
              </span>
              {showCursor && typedText.length < fullText.length && (
                <span className="text-primary animate-pulse">|</span>
              )}
            </div>
            
            <p 
              ref={taglineRef}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Building{' '}
              <span className="text-accent font-semibold">innovative</span>{' '}
              full-stack web applications with{' '}
              <span className="text-primary font-semibold">performance</span>{' '}
              and{' '}
              <span className="text-accent font-semibold">precision</span>, 
              crafting seamless digital experiences that bring ideas to life.
            </p>
            
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Button 
                size="lg" 
                className="hero-gradient hover-glow text-lg px-10 py-4 h-auto font-semibold neon-border animate-neon-pulse font-mono group"
              >
                <span className="group-hover:animate-glow">View Portfolio</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-10 py-4 h-auto font-semibold neon-border text-primary hover:bg-primary hover:text-primary-foreground font-mono group"
              >
                <span className="group-hover:animate-glow">Let's Connect</span>
              </Button>
            </div>
          </div>

          {/* Right Content - Enhanced Profile & Tech Icons */}
          <div className="relative flex justify-center lg:justify-end">
            <div 
              ref={imageRef}
              className="relative"
            >
              {/* Animated border rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: '10s' }}></div>
              <div className="absolute inset-4 rounded-full border border-accent/40 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}></div>
              
              {/* Profile Picture with enhanced effects */}
              <div className="relative z-10 p-4">
                <div className="w-80 h-80 rounded-full overflow-hidden neon-border relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Soumyaranjan Maharana - Creative Developer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Multiple glow effects */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl -z-10 scale-125 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl -z-20 scale-150 animate-neon-pulse"></div>
              </div>
              
              {/* Enhanced Floating Tech Icons */}
              <FloatingTechIcons />
              
              {/* Code brackets decoration */}
              <div className="absolute -top-8 -left-8 text-4xl font-mono text-primary/60 animate-pulse">{'<'}</div>
              <div className="absolute -bottom-8 -right-8 text-4xl font-mono text-primary/60 animate-pulse">{'/>'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};