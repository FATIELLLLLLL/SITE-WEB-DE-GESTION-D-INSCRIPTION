
import React from 'react';
import Navbar from '@/components/Navbar';
import DashboardComponent from '@/components/Dashboard';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/lib/animations';

const Dashboard = () => {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-blue-300/10 blur-3xl" />
        </div>
        
        <div className="container mx-auto">
          <div 
            ref={titleRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "max-w-3xl mb-12 transition-all duration-700",
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground text-lg">
              Gérez vos inscriptions, suivez les statistiques et organisez vos événements en un seul endroit.
            </p>
          </div>
          
          <DashboardComponent />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/40">
        <div className="container mx-auto">
          <div className="flex justify-center items-center text-center">
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} InscriPro. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
