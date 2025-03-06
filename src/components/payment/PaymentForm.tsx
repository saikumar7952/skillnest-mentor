
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Shield, Smartphone } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PaymentMethod from './PaymentMethod';
import { PaymentFormProps, PaymentMethodType } from './types';

const PaymentForm = ({ 
  selectedPlan, 
  plans, 
  onBack, 
  isSubmitting, 
  handleSubmit 
}: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [upiId, setUpiId] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const wallets = [
    { id: 'paytm', name: 'Paytm' },
    { id: 'phonepe', name: 'PhonePe' },
    { id: 'gpay', name: 'Google Pay' },
    { id: 'amazonpay', name: 'Amazon Pay' },
    { id: 'mobikwik', name: 'MobiKwik' },
  ];

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
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
          </div>
        );
      
      case 'upi':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <div className="relative">
                <Input 
                  id="upiId" 
                  placeholder="yourname@upi" 
                  value={upiId} 
                  onChange={(e) => setUpiId(e.target.value)} 
                  required 
                />
                <Smartphone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Enter your UPI ID (e.g., name@okicici, name@ybl)
              </p>
            </div>
          </div>
        );
      
      case 'wallet':
        return (
          <div className="space-y-4">
            <Label>Select Wallet</Label>
            <RadioGroup 
              value={selectedWallet || ''} 
              onValueChange={setSelectedWallet}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {wallets.map((wallet) => (
                <div key={wallet.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={wallet.id} id={wallet.id} />
                  <Label htmlFor={wallet.id} className="cursor-pointer">{wallet.name}</Label>
                </div>
              ))}
            </RadioGroup>
            <p className="text-xs text-muted-foreground mt-1">
              You will be redirected to the selected wallet to complete the payment
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
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
              <p className="font-medium">₹{plans[selectedPlan].price}</p>
              <p className="text-xs text-muted-foreground line-through">₹{plans[selectedPlan].originalPrice}</p>
            </div>
          </div>
        </div>
        
        <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderPaymentForm()}
          
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
            disabled={isSubmitting || (paymentMethod === 'wallet' && !selectedWallet)}
          >
            {isSubmitting ? 'Processing...' : `Pay ₹${plans[selectedPlan].price}`}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
