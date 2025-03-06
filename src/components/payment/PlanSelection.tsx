
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlanSelectionProps } from './types';

const PlanSelection = ({ selectedPlan, setSelectedPlan, onContinue, plans }: PlanSelectionProps) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-medium mb-6">Choose Your Plan</h2>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-full border border-border">
          <button
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-all",
              selectedPlan === 'monthly' 
                ? "bg-primary text-white" 
                : "hover:bg-secondary"
            )}
            onClick={() => setSelectedPlan('monthly')}
          >
            Monthly
          </button>
          <button
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-all",
              selectedPlan === 'yearly' 
                ? "bg-primary text-white" 
                : "hover:bg-secondary"
            )}
            onClick={() => setSelectedPlan('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>
      
      <div className="max-w-md mx-auto">
        <div className="border border-primary/30 rounded-xl p-6 bg-primary/5 relative">
          <div className="absolute -top-3 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
            50% OFF
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Early Access Plan</h3>
            <p className="text-sm text-muted-foreground">Get full access to all features</p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">₹{plans[selectedPlan].price}</span>
              <span className="text-muted-foreground line-through ml-2 text-sm">
                ₹{plans[selectedPlan].originalPrice}
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                {plans[selectedPlan].billingPeriod}
              </span>
            </div>
            {plans[selectedPlan].savingsText && (
              <p className="text-sm text-primary mt-1">{plans[selectedPlan].savingsText}</p>
            )}
          </div>
          
          <div className="space-y-3 mb-6">
            {[
              "Full access to all AI mentors",
              "Unlimited learning sessions",
              "Career planning tools",
              "Mock interviews & resume reviews",
              "Priority support"
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full" 
            size="lg" 
            onClick={onContinue}
          >
            Continue to Payment
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            * Early access pricing. Will increase when we launch.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
