export type EnquiryStatus = "new" | "read" | "replied" | "archived";
export type EnquiryKind = "enquiry" | "booking";

export type EnquiryItem = {
  id: string;
  kind: EnquiryKind;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  packageHref: string;
  packageTitle: string;
  status: EnquiryStatus;
  createdAt: string;
};

export type EnquiriesContent = {
  items: EnquiryItem[];
};
