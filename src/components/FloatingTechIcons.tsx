import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const techIcons = [
  { name: 'React', icon: '⚛️', position: { top: '5%', left: '5%' }, color: '#61DAFB' },
  { name: 'Node.js', icon: '🟢', position: { top: '15%', right: '5%' }, color: '#339933' },
  { name: 'MongoDB', icon: '🍃', position: { bottom: '25%', left: '0%' }, color: '#47A248' },
  { name: 'Java', icon: '☕', position: { bottom: '5%', right: '10%' }, color: '#ED8B00' },
  { name: 'JavaScript', icon: '💛', position: { top: '45%', left: '-10%' }, color: '#F7DF1E' },
  { name: 'TypeScript', icon: '💙', position: { top: '35%', right: '-8%' }, color: '#3178C6' },
  { name: 'Git', icon: '📝', position: { bottom: '45%', right: '-5%' }, color: '#F05032' },
  { name: 'Docker', icon: '🐳', position: { top: '65%', left: '3%' }, color: '#2496ED' }
];

export const FloatingTechIcons = () => {
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      iconsRef.current.forEach((icon, index) => {
        if (icon) {
          // Initial dramatic entrance
          gsap.fromTo(icon, 
            {
              opacity: 0,
              scale: 0,
              rotation: 360,
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              x: 0,
              y: 0,
              duration: 1.2,
              delay: 5 + index * 0.15, // After hero animation
              ease: "elastic.out(1, 0.6)"
            }
          );

          // Enhanced floating animation
          gsap.to(icon, {
            y: "-=20",
            x: "+=10",
            rotation: "+=15",
            duration: 3 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: Math.random() * 2
          });

          // Glow pulse effect
          gsap.to(icon, {
            boxShadow: "0 0 30px rgba(120, 255, 120, 0.6)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: Math.random() * 3
          });

          // Interactive hover effect
          icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
              scale: 1.3,
              rotation: "+=20",
              duration: 0.3,
              ease: "power2.out"
            });
          });

          icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {techIcons.map((tech, index) => (
        <div
          key={tech.name}
          ref={el => iconsRef.current[index] = el}
          className="absolute w-20 h-20 rounded-full glass-card border border-primary/30 flex items-center justify-center text-3xl card-shadow hover-glow cursor-pointer group transition-all duration-300"
          style={tech.position}
          title={tech.name}
        >
          <span className="group-hover:animate-bounce">{tech.icon}</span>
          
          {/* Tech name tooltip */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-card border border-primary/30 px-2 py-1 rounded text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {tech.name}
          </div>
          
          {/* Orbiting particles */}
          <div className="absolute inset-0 rounded-full">
            <div className="absolute w-1 h-1 bg-primary rounded-full animate-ping" 
                 style={{ 
                   top: '10%', 
                   left: '90%',
                   animationDelay: `${index * 0.2}s`,
                   animationDuration: '2s'
                 }}>
            </div>
            <div className="absolute w-1 h-1 bg-accent rounded-full animate-ping" 
                 style={{ 
                   bottom: '10%', 
                   right: '90%',
                   animationDelay: `${index * 0.3}s`,
                   animationDuration: '2.5s'
                 }}>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};