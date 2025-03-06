
import { CreditCard, Smartphone, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { PaymentMethodProps } from './types';

const PaymentMethod = ({ paymentMethod, setPaymentMethod }: PaymentMethodProps) => {
  return (
    <div className="mb-6">
      <Label className="mb-3 block">Payment Method</Label>
      <div className="grid grid-cols-3 gap-3">
        <div
          className={cn(
            "border rounded-lg p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center",
            paymentMethod === 'card' 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          )}
          onClick={() => setPaymentMethod('card')}
        >
          <CreditCard className="h-6 w-6" />
          <span className="text-sm">Card</span>
        </div>
        <div
          className={cn(
            "border rounded-lg p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center",
            paymentMethod === 'upi' 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          )}
          onClick={() => setPaymentMethod('upi')}
        >
          <Smartphone className="h-6 w-6" />
          <span className="text-sm">UPI</span>
        </div>
        <div
          className={cn(
            "border rounded-lg p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center",
            paymentMethod === 'wallet' 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          )}
          onClick={() => setPaymentMethod('wallet')}
        >
          <Wallet className="h-6 w-6" />
          <span className="text-sm">Wallets</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
