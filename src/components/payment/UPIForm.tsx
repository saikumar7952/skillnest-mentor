
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UPIFormProps } from './types';

const UPIForm = ({ isSubmitting }: UPIFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="upi-id" className="mb-1 block">UPI ID</Label>
        <Input
          id="upi-id"
          type="text"
          placeholder="username@bankname"
          required
          disabled={isSubmitting}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Enter your UPI ID in the format username@bankname or phonenumber@upi
        </p>
      </div>
    </div>
  );
};

export default UPIForm;
