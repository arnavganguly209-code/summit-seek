import type { LegalPageContent } from "@/types/legal-cms";

/** Default titles only — document images stay empty until uploaded in Orbit. */
export const DEFAULT_LEGAL_PAGE: LegalPageContent = {
  coverImageUrl: "",
  coverTitle: "Legal Documents",
  coverSubtitle:
    "Official registrations and compliance documents for Summit Seek Travels & Tours.",
  intro:
    "Summit Seek Travels & Tours is a licensed Kathmandu-based trekking and adventure company. The documents below confirm our registrations and industry affiliations. Upload certificates from Orbit — no stock images are used.",
  documents: [
    {
      id: "vat-pan",
      title: "VAT / PAN Registration",
      description: "Tax registration certificate",
      imageUrl: "",
      visible: true,
    },
    {
      id: "company-reg",
      title: "Company Registration",
      description: "Company registration certificate",
      imageUrl: "",
      visible: true,
    },
    {
      id: "industry-reg",
      title: "Nepal Industry Registration",
      description: "Industry registration certificate",
      imageUrl: "",
      visible: true,
    },
    {
      id: "tourism-reg",
      title: "Tourism Industry Registration",
      description: "Tourism board / tourism industry registration",
      imageUrl: "",
      visible: true,
    },
    {
      id: "nma",
      title: "Nepal Mountaineering Association",
      description: "NMA membership / affiliation",
      imageUrl: "",
      visible: true,
    },
    {
      id: "bank",
      title: "Bank Registration",
      description: "Bank account registration document",
      imageUrl: "",
      visible: true,
    },
    {
      id: "taan",
      title: "Trekking Agency Association of Nepal",
      description: "TAAN membership certificate",
      imageUrl: "",
      visible: true,
    },
  ],
  metaTitle: "Legal Documents | Summit Seek",
  metaDescription:
    "View Summit Seek Travels & Tours legal registrations and compliance documents.",
};
