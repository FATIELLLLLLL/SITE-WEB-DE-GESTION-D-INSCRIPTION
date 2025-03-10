
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { 
  ClipboardList, 
  BarChart3, 
  Users, 
  Mail, 
  Calendar,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const Index = () => {
  // Set up intersection observers for animations
  const { ref: featuresRef, isVisible: featuresVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();
  
  // Set up scroll reveal animation
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      animatedElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
  
  // Features data
  const features = [
    {
      title: 'Gestion des inscriptions',
      description: 'Créez des formulaires personnalisés et gérez facilement toutes vos inscriptions en un seul endroit.',
      icon: ClipboardList,
      delay: 100
    },
    {
      title: 'Tableaux de bord analytiques',
      description: 'Visualisez les statistiques importantes et suivez les tendances avec des tableaux de bord intuitifs.',
      icon: BarChart3,
      delay: 200
    },
    {
      title: 'Gestion des participants',
      description: 'Organisez, filtrez et exportez la liste des participants pour un suivi efficace.',
      icon: Users,
      delay: 300
    },
    {
      title: 'Notifications automatiques',
      description: 'Envoyez des confirmations et des rappels automatiques par email aux participants.',
      icon: Mail,
      delay: 400
    },
    {
      title: 'Organisation d\'événements',
      description: 'Créez et gérez plusieurs événements avec des détails personnalisés et des quotas d\'inscription.',
      icon: Calendar,
      delay: 500
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 px-6 relative overflow-hidden" id="features">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-blue-300/5 blur-3xl" />
        </div>
        
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Fonctionnalités
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tout ce dont vous avez besoin pour gérer vos inscriptions
            </h2>
            <p className="text-muted-foreground text-lg">
              Notre plateforme offre des outils puissants et intuitifs pour simplifier le processus d'inscription et améliorer l'expérience des participants.
            </p>
          </div>
          
          <div 
            ref={featuresRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700",
              featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={feature.delay}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-300/10 blur-3xl" />
        </div>
        
        <div 
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "container mx-auto max-w-5xl glass rounded-3xl p-8 md:p-16 border border-white/20 shadow-sm transition-all duration-700",
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prêt à simplifier vos inscriptions?
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Commencez dès aujourd'hui et découvrez comment notre plateforme peut transformer votre processus d'inscription.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="group">
                  <Link to="/register">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/dashboard" className="group">
                    Voir la démo
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center p-10">
                <ClipboardList className="h-32 w-32 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/40">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold text-primary">InscriPro</span>
              <p className="text-muted-foreground mt-2">
                Simplifiez vos inscriptions en toute élégance
              </p>
            </div>
            
            <div className="flex gap-8">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">
                Inscription
              </Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Tableau de bord
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/40 text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} InscriPro. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
