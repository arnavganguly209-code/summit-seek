export type BookingPaymentMethod =
  | "pay_on_arrival"
  | "online_deposit_10"
  | "online_full";

export type BookingStatus =
  | "new"
  | "confirmed"
  | "contacted"
  | "cancelled"
  | "archived";

export type BookingRecord = {
  id: string;
  createdAt: string;
  status: BookingStatus;
  packageHref: string;
  packageTitle: string;
  durationLabel: string;
  name: string;
  email: string;
  country: string;
  whatsapp: string;
  travelers: number;
  startDate: string;
  endDate: string;
  specialRequests: string;
  addons: string[];
  unitPrice: number;
  compareAtPrice: number | null;
  groupDiscountLabel: string;
  subtotal: number;
  paymentMethod: BookingPaymentMethod;
  depositPercent: number;
  cardFeePercent: number;
  amountBeforeFee: number;
  cardFee: number;
  grandTotal: number;
  cardHolderName: string;
  cardLast4: string;
  cardExpiry: string;
  billingAddress: string;
  billingCity: string;
  billingCountry: string;
};

export type BookingsContent = {
  items: BookingRecord[];
};
