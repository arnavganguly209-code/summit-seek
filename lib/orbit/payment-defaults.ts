import type { PaymentContent } from "@/types/payment-cms";
import { SITE } from "@/lib/constants";

export const DEFAULT_PAYMENT: PaymentContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "Payment Procedure & Details",
  coverSubtitle:
    "Secure, transparent ways to pay for your Summit Seek Himalayan journey — card, transfer, PayPal, or cash on arrival.",
  introEyebrow: SITE.legalName,
  introHeading: "Pay with confidence — we never store your card details",
  introBody:
    "Summit Seek processes payments through trusted gateways and banking partners. Card details are not stored by our company, and every transaction is treated as a one-time, privacy-first payment. We keep pricing clear so you know what you are paying — and why.",
  noteText:
    "When you book, an advance confirms your place. You can pay online or by bank transfer; the balance is typically settled on arrival in Nepal unless your confirmation says otherwise.",
  methodsHeading: "Ways to pay with Summit Seek",
  methodsIntro:
    "Choose the method that fits you best. Bank and card fees from providers are separate from our trip price and are explained below.",
  methods: [
    {
      id: "pm-card",
      title: "Card payment",
      description:
        "Visa, Mastercard, and most debit / credit cards are accepted through our secure payment link. A bank / gateway processing fee (typically about 4%) applies — charged by the payment provider, not added as a Summit Seek markup beyond that fee.",
      imageUrl: "",
      visible: true,
    },
    {
      id: "pm-paypal",
      title: "PayPal",
      description:
        "A convenient option for many international travelers. We share a PayPal payment path when it is available for your booking and currency.",
      imageUrl: "",
      visible: true,
    },
    {
      id: "pm-bank",
      title: "Bank / SWIFT transfer",
      description:
        "Wire funds to our Nepal account using the bank details below. Transfer and intermediary bank fees are paid by the sender so Summit Seek receives the full agreed trip amount.",
      imageUrl: "",
      visible: true,
    },
    {
      id: "pm-cash",
      title: "Cash on arrival",
      description:
        "Where arranged in advance, you may settle the remaining balance in cash after arriving in Kathmandu — in an accepted currency equivalent to the agreed amount, without card fees.",
      imageUrl: "",
      visible: true,
    },
  ],
  chargesHeading: "Bank & card charges",
  chargesBody:
    "Card payments usually include a processing fee of about 4% set by the bank or gateway. Some banks deduct it automatically; others ask you to add it to the total. Deposit and transfer service charges are the traveler’s responsibility (except where we specifically absorb an advance-related fee in writing). Trip prices on the site are the agreed service amounts — no hidden Summit Seek markups beyond disclosed provider fees.",
  securityHeading: "Payment security",
  securityBody:
    "Our payment partners operate under applicable Nepal banking rules and modern encryption practices. Transactions are monitored by the gateway; Summit Seek does not keep full card numbers on our systems. Always use the official payment link or bank details we send after booking.",
  privacyHeading: "Payment privacy",
  privacyBody:
    "We use payment information only to complete your booking. Card data is handled by the gateway; we do not sell or misuse financial details. Operational records (amounts, dates, confirmation IDs) are kept only as needed for accounting and guest support.",
  notesHeading: "How booking payments work",
  notes: [
    "Advance payment lets us lock permits, lodges, and trail logistics for your dates.",
    "Remaining balance is usually paid on arrival in Nepal unless your invoice sets a different schedule.",
    "Cancellation and refund rules follow our Terms & Conditions — advance portions may be non-refundable close to departure.",
    "Online payment links let you pay a confirmed amount securely by card when we issue the link.",
    "After payment, you receive written confirmation by email.",
    "Currency conversion follows your bank or gateway rates at the time of payment.",
  ],
  bankHeading: "Bank transfer details",
  bankIntro:
    "Use these details only after we confirm your booking. Update account fields anytime in Orbit once your bank paperwork is ready.",
  bankFields: [
    { id: "bf1", label: "Account name", value: "Summit Seek Travels & Tours" },
    { id: "bf2", label: "Account number", value: "Update in Orbit" },
    { id: "bf3", label: "Bank name", value: "Update in Orbit" },
    { id: "bf4", label: "SWIFT / BIC", value: "Update in Orbit" },
    { id: "bf5", label: "Branch / address", value: "Thamel, Kathmandu, Nepal" },
  ],
  importantHeading: "Important reminders",
  importantNotes: [
    "Sender pays bank transfer and intermediary fees so the received amount matches your invoice.",
    "Card payments include the disclosed gateway processing fee (commonly ~4%).",
    "Late cancellations may forfeit advances per our Terms; rescheduling may be possible with cost adjustments.",
    "Only trust payment links and bank details sent by Summit Seek from our official channels.",
  ],
  ctaHeading: "Need a payment link or bank confirmation?",
  ctaBody: `Our Kathmandu team will send clear instructions for your booking. WhatsApp ${SITE.whatsappDisplay} or email ${SITE.email}.`,
  ctaPrimaryLabel: "Contact Summit Seek",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "Terms & Conditions",
  ctaSecondaryHref: "/terms",
  metaTitle: "Payment Procedure & Details | Summit Seek Travels & Tours",
  metaDescription:
    "Learn how to pay Summit Seek Travels & Tours securely — card, PayPal, bank transfer, or cash on arrival — with clear fees and privacy-first processing.",
};
