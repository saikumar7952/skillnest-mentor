
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
  active: boolean;
  onClick: (index: number) => void;
  index: number;
}

const FeatureItem = ({ 
  icon, 
  title, 
  description, 
  active, 
  onClick, 
  index 
}: FeatureItemProps) => {
  return (
    <div 
      className={cn(
        "p-6 rounded-xl transition-all duration-300 cursor-pointer",
        active ? "bg-primary/10" : "hover:bg-secondary"
      )}
      onClick={() => onClick(index)}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "p-3 rounded-md transition-colors", 
          active ? "bg-primary text-white" : "bg-secondary text-primary"
        )}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-medium mb-1">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureItem;
