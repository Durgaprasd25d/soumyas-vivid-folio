import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating heart animation
      const heart = footerRef.current?.querySelector('.heart-icon');
      if (heart) {
        gsap.to(heart, {
          scale: 1.2,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="bg-primary text-primary-foreground py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div ref={contentRef} className="text-center space-y-8">
          {/* Main Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Soumyaranjan Maharana</h3>
            <p className="text-primary-foreground/80 max-w-md mx-auto">
              Building the future, one line of code at a time. 
              Let's create something amazing together.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a 
              href="#" 
              className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-200 group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-200 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="mailto:soumyaranjan@example.com" 
              className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-200 group"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center gap-8 text-sm">
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#skills" className="hover:text-accent transition-colors">Skills</a>
            <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <div className="border-t border-primary-foreground/20 pt-8 space-y-2">
            <p className="text-primary-foreground/60 text-sm flex items-center justify-center gap-2">
              Made with <Heart className="heart-icon w-4 h-4 text-red-400" fill="currentColor" /> 
              by Soumyaranjan Maharana
            </p>
            <p className="text-primary-foreground/40 text-xs">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary-foreground/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};