import type { MoneyCurrencyContent } from "@/types/money-currency-cms";
import { SITE } from "@/lib/constants";

export const DEFAULT_MONEY_CURRENCY: MoneyCurrencyContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "Money & Currency",
  coverSubtitle:
    "Nepali Rupees, ATMs, exchange tips, and what cash to carry on trail — practical money guidance for Summit Seek travelers.",
  introEyebrow: "Travel Info",
  introHeading: "Handle money confidently in Nepal",
  introBody:
    "Nepal’s official currency is the Nepali Rupee (NPR / NRs). Cities like Kathmandu and Pokhara make exchanging money and using ATMs easy. On the trail, cash still rules — cards and ATMs disappear quickly once you leave major towns.",
  alertText:
    "Exchange rates change daily. Use licensed money changers or banks. Avoid street deals. Carry a mix of mid-size notes for lodges, tips, and snacks.",
  currencyHeading: "Nepali Rupee basics",
  currencyBody:
    "Common notes include 5, 10, 20, 50, 100, 500, and 1,000 NPR. Small shops and teahouses often struggle to change 500 and 1,000 notes — keep plenty of 100s and 500s for the trail.\n\nMajor currencies such as USD, EUR, and GBP exchange easily in Thamel. Outside Kathmandu, foreign-exchange counters are rare. Indian Rupee notes of 500 and above are not accepted; smaller INR notes may be usable near the border at a fixed local rate.",
  cardsHeading: "Payments that work in practice",
  cardsIntro:
    "Plan city payments and trail cash separately. That single habit prevents most money stress on trek.",
  cards: [
    {
      id: "mc1",
      title: "Exchange in Kathmandu",
      description:
        "Licensed counters in Thamel are usually faster and clearer than bank queues. Compare two rates, count notes carefully, and keep your exchange receipt.",
      visible: true,
    },
    {
      id: "mc2",
      title: "ATMs in the cities",
      description:
        "ATMs are common in Kathmandu, Pokhara, and some district hubs. Fees apply. Withdraw before you leave for the mountains — trail ATMs are unreliable or absent.",
      visible: true,
    },
    {
      id: "mc3",
      title: "Cards & hotels",
      description:
        "Many hotels, restaurants, and larger shops in cities accept cards. Expect cash-only once you start trekking. Notify your bank that you will travel in Nepal.",
      visible: true,
    },
    {
      id: "mc4",
      title: "Cash on the trail",
      description:
        "Budget NPR for hot showers, charging, Wi‑Fi, bottled drinks, snacks, tips, and souvenirs. Carry small and mid notes in a secure money belt or inner pocket.",
      visible: true,
    },
    {
      id: "mc5",
      title: "Trip payments to Summit Seek",
      description:
        "Package deposits and balances follow our Payment Procedure. We confirm accepted methods when you book — never send funds to informal personal accounts.",
      visible: true,
    },
    {
      id: "mc6",
      title: "Tipping culture",
      description:
        "Tips for guides and porters are customary and appreciated when service is good. Your trip briefing includes suggested ranges based on trek length and team size.",
      visible: true,
    },
  ],
  tipsHeading: "Smart money habits",
  tips: [
    "Split cash between pack and body — never keep everything in one place.",
    "Photograph your passport and card details (store securely) before travel.",
    "Bring a backup debit/credit card in case one is declined.",
    "Ask your guide before buying expensive electronics or “brand” gear in tourist streets.",
    "Keep a small USD emergency stash only if your bank allows easy conversion later — NPR still covers daily trail costs best.",
  ],
  notesHeading: "Quick checklist",
  notes: [
    "Exchange enough NPR before your trek starts.",
    "Carry more mid-size notes than large ones.",
    "Confirm Summit Seek payment schedule in writing.",
    "Budget extra for personal expenses beyond the package inclusions.",
  ],
  ctaHeading: "Need help planning trek cash?",
  ctaBody: `Tell us your route and trip length — we will suggest a sensible cash buffer. WhatsApp ${SITE.whatsappDisplay} or email ${SITE.email}.`,
  ctaPrimaryLabel: "Contact Summit Seek",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "Payment procedure",
  ctaSecondaryHref: "/payment",
  metaTitle: "Money & Currency in Nepal | Summit Seek",
  metaDescription:
    "Nepali Rupee tips, ATMs, exchange advice, and trail cash guidance for Summit Seek trekkers and travelers.",
};
