import { AdminLeadsClient } from "@/components/admin/AdminLeadsClient";

export default function AdminBookingsPage() {
  return (
    <AdminLeadsClient
      kind="booking"
      title="Booking Requests"
      description="Book This Trip and booking-intent submissions from package pages."
    />
  );
}
