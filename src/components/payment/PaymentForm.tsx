
import { useState } from 'react';
import { formatInr } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PaymentFormProps, WalletOption } from './types';
import PaymentMethod from './PaymentMethod';
import CardForm from './CardForm';
import UPIForm from './UPIForm';
import WalletForm from './WalletForm';

const PaymentForm = ({ selectedPlan, plans, onBack, isSubmitting, handleSubmit }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedWallet, setSelectedWallet] = useState('paytm');
  
  const plan = plans[selectedPlan];
  
  const walletOptions: WalletOption[] = [
    { id: 'paytm', name: 'Paytm' },
    { id: 'phonepe', name: 'PhonePe' },
    { id: 'gpay', name: 'Google Pay' },
    { id: 'amazonpay', name: 'Amazon Pay' },
    { id: 'mobikwik', name: 'MobiKwik' },
    { id: 'freecharge', name: 'Freecharge' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-medium mb-1">Complete Your Payment</h2>
      <p className="text-muted-foreground mb-6">Secure payment for your SkillNest plan</p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <PaymentMethod 
              paymentMethod={paymentMethod} 
              setPaymentMethod={setPaymentMethod} 
            />
            
            {paymentMethod === 'card' && (
              <CardForm isSubmitting={isSubmitting} />
            )}
            
            {paymentMethod === 'upi' && (
              <UPIForm isSubmitting={isSubmitting} />
            )}
            
            {paymentMethod === 'wallet' && (
              <WalletForm 
                isSubmitting={isSubmitting} 
                walletOptions={walletOptions}
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
              />
            )}
          </div>
          
          <div className="md:col-span-2">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SkillNest {selectedPlan} plan</span>
                  <span>{formatInr(plan.price / 100)}</span>
                </div>
                
                {plan.savingsText && (
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>Savings</span>
                    <span>{plan.savingsText}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-medium mb-6">
                <span>Total</span>
                <span>{formatInr(plan.price / 100)}</span>
              </div>
              
              <div className="text-xs text-muted-foreground mb-4">
                By proceeding, you agree to our Terms of Service and acknowledge that you have read our Privacy Policy.
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : `Pay ${formatInr(plan.price / 100)}`}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-start">
          <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
