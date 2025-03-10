
import React from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/lib/animations';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const FeatureCard = ({ title, description, icon: Icon, delay = 0 }: FeatureCardProps) => {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "glass rounded-2xl p-6 card-hover transition-all duration-700",
        "border border-white/20 shadow-sm",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10",
        delay && `delay-[${delay}ms]`
      )}
    >
      <div className="bg-primary/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
