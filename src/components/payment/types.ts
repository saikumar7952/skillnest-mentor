
export type PlanType = 'monthly' | 'yearly';
export type PaymentMethodType = 'card' | 'upi' | 'wallet';

export interface PlanDetails {
  price: number;
  originalPrice: number;
  billingPeriod: string;
  savingsText: string;
}

export interface WalletOption {
  id: string;
  name: string;
}

export interface PlanSelectionProps {
  selectedPlan: PlanType;
  setSelectedPlan: (plan: PlanType) => void;
  onContinue: () => void;
  plans: Record<PlanType, PlanDetails>;
}

export interface PaymentFormProps {
  selectedPlan: PlanType;
  plans: Record<PlanType, PlanDetails>;
  onBack: () => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export interface PaymentMethodProps {
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (method: PaymentMethodType) => void;
}
