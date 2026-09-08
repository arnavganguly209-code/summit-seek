import type { EnquiriesContent, EnquiryItem } from "@/types/enquiries";

export const DEFAULT_ENQUIRIES: EnquiriesContent = {
  items: [],
};

export function mergeEnquiries(
  stored: Partial<EnquiriesContent> | null,
): EnquiriesContent {
  if (!stored || !Array.isArray(stored.items)) return DEFAULT_ENQUIRIES;
  return {
    items: stored.items.map((item, i) => ({
      id: item.id || `enq-${i}`,
      kind: item.kind === "booking" ? "booking" : "enquiry",
      name: String(item.name || "").trim(),
      email: String(item.email || "").trim(),
      phone: String(item.phone || "").trim(),
      subject: String(item.subject || "").trim(),
      message: String(item.message || "").trim(),
      packageHref: String(item.packageHref || "").trim(),
      packageTitle: String(item.packageTitle || "").trim(),
      status:
        item.status === "read" ||
        item.status === "replied" ||
        item.status === "archived"
          ? item.status
          : "new",
      createdAt: item.createdAt || new Date().toISOString(),
    })),
  };
}

export function newEnquiryId() {
  return `enq-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export type CreateEnquiryInput = Omit<EnquiryItem, "id" | "createdAt" | "status"> & {
  status?: EnquiryItem["status"];
};
