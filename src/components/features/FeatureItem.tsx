
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface FeatureItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
  active: boolean;
  onClick: (index: number) => void;
  index: number;
  route?: string; // Add optional route property
}

const FeatureItem = ({ 
  icon, 
  title, 
  description, 
  active, 
  onClick, 
  index,
  route
}: FeatureItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick(index);
    
    // If a route is provided, navigate to that route
    if (route) {
      navigate(route);
    }
  };

  return (
    <div 
      className={cn(
        "p-6 rounded-xl transition-all duration-300 cursor-pointer",
        active ? "bg-primary/10" : "hover:bg-secondary"
      )}
      onClick={handleClick}
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
