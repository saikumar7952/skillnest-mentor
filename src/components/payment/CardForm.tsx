
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardFormProps } from './types';

const CardForm = ({ isSubmitting }: CardFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="card-number" className="mb-1 block">Card Number</Label>
        <Input
          id="card-number"
          type="text"
          placeholder="1234 5678 9012 3456"
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiry" className="mb-1 block">Expiry Date</Label>
          <Input
            id="expiry"
            type="text"
            placeholder="MM/YY"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="cvv" className="mb-1 block">CVV</Label>
          <Input
            id="cvv"
            type="text"
            placeholder="123"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="name" className="mb-1 block">Name on Card</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Smith"
          required
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default CardForm;
