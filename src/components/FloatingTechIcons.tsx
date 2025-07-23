import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const techIcons = [
  { name: 'React', icon: '⚛️', position: { top: '10%', left: '10%' } },
  { name: 'Node.js', icon: '🟢', position: { top: '20%', right: '10%' } },
  { name: 'MongoDB', icon: '🍃', position: { bottom: '30%', left: '5%' } },
  { name: 'Java', icon: '☕', position: { bottom: '10%', right: '15%' } },
  { name: 'JavaScript', icon: '💛', position: { top: '50%', left: '-5%' } },
  { name: 'TypeScript', icon: '💙', position: { top: '40%', right: '-5%' } }
];

export const FloatingTechIcons = () => {
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      iconsRef.current.forEach((icon, index) => {
        if (icon) {
          // Initial animation
          gsap.fromTo(icon, 
            {
              opacity: 0,
              scale: 0,
              rotation: 180
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              delay: 1 + index * 0.1,
              ease: "back.out(1.7)"
            }
          );

          // Floating animation
          gsap.to(icon, {
            y: "-=15",
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: Math.random() * 2
          });

          // Rotation animation
          gsap.to(icon, {
            rotation: "+=5",
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: Math.random() * 3
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
          className="absolute w-16 h-16 rounded-full bg-card border border-tech-border flex items-center justify-center text-2xl card-shadow hover-glow cursor-pointer"
          style={tech.position}
          title={tech.name}
        >
          {tech.icon}
        </div>
      ))}
    </>
  );
};