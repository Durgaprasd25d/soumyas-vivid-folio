import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Matrix rain effect
      createMatrixRain();
      
      // Logo animation
      gsap.fromTo(logoRef.current,
        { 
          opacity: 0, 
          scale: 0.5, 
          rotateY: 180 
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: "back.out(1.7)"
        }
      );

      // Progress simulation
      const progressTween = gsap.to({ value: 0 }, {
        value: 100,
        duration: 3,
        ease: "power2.out",
        onUpdate: function() {
          setProgress(Math.round(this.targets()[0].value));
        },
        onComplete: () => {
          // Exit animation
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.1,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: onComplete
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const createMatrixRain = () => {
    const matrix = matrixRef.current;
    if (!matrix) return;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: -100px;
        color: hsl(120 100% 50%);
        font-family: 'JetBrains Mono', monospace;
        font-size: ${12 + Math.random() * 8}px;
        opacity: ${0.3 + Math.random() * 0.7};
        white-space: nowrap;
      `;
      
      let text = '';
      for (let j = 0; j < 20; j++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
      }
      column.innerHTML = text;
      
      matrix.appendChild(column);
      
      gsap.fromTo(column,
        { y: -100 },
        {
          y: window.innerHeight + 100,
          duration: 3 + Math.random() * 4,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 2
        }
      );
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-background z-50 flex items-center justify-center"
    >
      {/* Matrix Background */}
      <div ref={matrixRef} className="matrix-bg"></div>
      
      {/* Loading Content */}
      <div className="text-center space-y-8 z-10">
        {/* Animated Logo */}
        <div ref={logoRef} className="relative">
          <div className="font-orbitron text-6xl md:text-8xl font-bold neon-text">
            &lt;SM/&gt;
          </div>
          <div className="absolute inset-0 font-orbitron text-6xl md:text-8xl font-bold neon-text animate-neon-pulse">
            &lt;SM/&gt;
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-4">
          <div className="font-mono text-xl text-primary">
            Initializing Creative Portfolio...
          </div>
          
          {/* Progress Bar */}
          <div className="w-80 h-2 bg-secondary rounded-full overflow-hidden mx-auto">
            <div 
              ref={progressRef}
              className="h-full hero-gradient transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Progress Text */}
          <div className="font-mono text-sm text-muted-foreground">
            {progress}% Complete
          </div>
        </div>
        
        {/* Loading States */}
        <div className="font-mono text-sm text-accent">
          {progress < 30 && "Loading creative assets..."}
          {progress >= 30 && progress < 60 && "Compiling neon effects..."}
          {progress >= 60 && progress < 90 && "Preparing animations..."}
          {progress >= 90 && "Ready to showcase!"}
        </div>
      </div>
    </div>
  );
};