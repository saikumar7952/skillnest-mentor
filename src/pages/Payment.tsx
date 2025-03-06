
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { PlanType } from '@/components/payment/types';
import PlanSelection from '@/components/payment/PlanSelection';
import PaymentForm from '@/components/payment/PaymentForm';

const Payment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'plan' | 'payment'>('plan');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('monthly');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const plans = {
    monthly: {
      price: 2399,
      originalPrice: 4799,
      billingPeriod: '/month',
      savingsText: '',
    },
    yearly: {
      price: 23990,
      originalPrice: 57588,
      billingPeriod: '/year',
      savingsText: 'Save ₹28,798 (50%)',
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
            <PlanSelection 
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              onContinue={() => setStep('payment')}
              plans={plans}
            />
          ) : (
            <PaymentForm 
              selectedPlan={selectedPlan}
              plans={plans}
              onBack={goBack}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
