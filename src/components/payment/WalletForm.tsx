
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { WalletFormProps } from './types';

const WalletForm = ({ walletOptions, selectedWallet, setSelectedWallet, isSubmitting }: WalletFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-2 block">Select Wallet</Label>
        <div className="grid grid-cols-3 gap-3">
          {walletOptions.map((wallet) => (
            <div
              key={wallet.id}
              className={cn(
                "border rounded-lg p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center",
                selectedWallet === wallet.id
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => !isSubmitting && setSelectedWallet(wallet.id)}
            >
              <span className="text-sm">{wallet.name}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          You will be redirected to the selected wallet app to complete the payment
        </p>
      </div>
    </div>
  );
};

export default WalletForm;
