import { AdminLeadsClient } from "@/components/admin/AdminLeadsClient";

export default function AdminEnquiriesPage() {
  return (
    <AdminLeadsClient
      kind="enquiry"
      title="Enquiries"
      description="Messages submitted from the contact form appear here for follow-up."
    />
  );
}
