
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Payment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'plan' | 'payment'>('plan');
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const plans = {
    monthly: {
      price: 29,
      originalPrice: 58,
      billingPeriod: '/month',
      savingsText: '',
    },
    yearly: {
      price: 290,
      originalPrice: 696,
      billingPeriod: '/year',
      savingsText: 'Save $348 (50%)',
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // This would connect to a payment processor in a real implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Payment processed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const goBack = () => {
    if (step === 'payment') {
      setStep('plan');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container-custom max-w-screen-lg py-8">
        <button 
          onClick={goBack} 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-medium mb-2">Get Early Access to SkillNest</h1>
          <p className="text-muted-foreground max-w-2xl">
            Join our exclusive early access program and be among the first to experience the future of AI-powered mentorship.
          </p>
        </div>
        
        <div className="bg-white rounded-xl border border-border shadow-lg overflow-hidden">
          {step === 'plan' ? (
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
                      <span className="text-3xl font-bold">${plans[selectedPlan].price}</span>
                      <span className="text-muted-foreground line-through ml-2 text-sm">
                        ${plans[selectedPlan].originalPrice}
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
                    onClick={() => setStep('payment')}
                  >
                    Continue to Payment
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    * Early access pricing. Will increase when we launch.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-xl font-medium mb-6">Payment Details</h2>
              
              <div className="max-w-md mx-auto">
                <div className="mb-6 p-4 rounded-lg bg-secondary/30 border border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Early Access Plan</p>
                      <p className="text-sm text-muted-foreground">{selectedPlan === 'monthly' ? 'Monthly' : 'Annual'} billing</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${plans[selectedPlan].price}</p>
                      <p className="text-xs text-muted-foreground line-through">${plans[selectedPlan].originalPrice}</p>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name on card</Label>
                    <Input id="name" placeholder="John Smith" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card number</Label>
                    <div className="relative">
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Your payment information is secure and encrypted
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : `Pay $${plans[selectedPlan].price}`}
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
