import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

      // Form animation
      gsap.fromTo(formRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Info animation
      gsap.fromTo(infoRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Success animation
    const successMessage = document.createElement('div');
    successMessage.className = 'absolute inset-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-semibold text-lg';
    successMessage.textContent = '✨ Message sent successfully!';
    
    if (formRef.current) {
      formRef.current.appendChild(successMessage);
      
      gsap.fromTo(successMessage,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          ease: "back.out(1.7)",
          onComplete: () => {
            setTimeout(() => {
              gsap.to(successMessage, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                onComplete: () => successMessage.remove()
              });
            }, 2000);
          }
        }
      );
    }

    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });

    setIsSubmitting(false);
    
    // Reset form
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-6 bg-secondary/10 relative">
      {/* Contact background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,255,120,0.1)_0%,transparent_70%)]"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 font-orbitron"
        >
          <span className="neon-text">Let's</span>{' '}
          <span className="text-gradient">Connect</span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="tech-card space-y-6"
            >
              <h3 className="text-2xl font-semibold text-primary mb-6">Send a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input 
                    id="name"
                    type="text" 
                    placeholder="Your Name"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="your.email@example.com"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea 
                    id="message"
                    placeholder="Tell me about your project or just say hello..."
                    rows={5}
                    required
                    className="w-full resize-none"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full hero-gradient hover-glow font-semibold text-lg h-12"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div className="tech-card">
              <h3 className="text-2xl font-semibold text-primary mb-6">Get in Touch</h3>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always interested in new opportunities and collaborations. 
                Whether you have a project in mind or just want to chat about technology, 
                feel free to reach out!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">soumyaranjan@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground">Bhubaneswar, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="tech-card">
              <h4 className="text-lg font-semibold text-primary mb-4">Connect on Social</h4>
              
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover-glow group"
                >
                  <Github className="w-5 h-5 text-primary group-hover:text-primary-glow transition-colors" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover-glow group"
                >
                  <Linkedin className="w-5 h-5 text-primary group-hover:text-primary-glow transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};