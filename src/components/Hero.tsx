
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/lib/animations';

const Hero = () => {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver();
  const { ref: descriptionRef, isVisible: descriptionVisible } = useIntersectionObserver();
  const { ref: buttonsRef, isVisible: buttonsVisible } = useIntersectionObserver();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-16">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-300/10 blur-3xl" />
        <div className="absolute top-2/3 left-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-5xl text-center">
        <div className="space-y-2 mb-4">
          <span 
            className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full animate-fade-in"
          >
            Système de gestion d'inscription
          </span>
        </div>
        
        <h1 
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className={cn(
            "text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6 transition-all duration-700 delay-100",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          Simplifiez vos <span className="text-primary">inscriptions</span> en toute élégance
        </h1>
        
        <p 
          ref={descriptionRef as React.RefObject<HTMLParagraphElement>}
          className={cn(
            "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 transition-all duration-700 delay-200",
            descriptionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          Une plateforme intuitive et élégante pour gérer vos inscriptions, suivre les participants et organiser vos événements sans effort.
        </p>
        
        <div 
          ref={buttonsRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300",
            buttonsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <Button size="lg" asChild className="rounded-full group">
            <Link to="/register">
              Commencer maintenant 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild className="rounded-full">
            <Link to="/dashboard">
              Voir le tableau de bord
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Hero bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent" />
    </section>
  );
};

export default Hero;
