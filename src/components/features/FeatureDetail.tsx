
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { FeatureData } from './types';

interface FeatureDetailProps {
  feature: FeatureData;
}

const FeatureDetail = ({ feature }: FeatureDetailProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [feature]);
  
  return (
    <div ref={detailRef} className="h-full flex items-center">
      <div className={cn(
        "transition-all duration-500 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 mb-4">
          <span className="text-xs font-medium text-primary">{feature.tag}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-medium mb-4">{feature.detailTitle}</h3>
        <p className="text-muted-foreground mb-6 max-w-lg">{feature.detailDescription}</p>
        <div className="space-y-4">
          {feature.bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="p-1 bg-primary/10 rounded-full mt-1">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              </div>
              <p className="text-sm">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureDetail;
