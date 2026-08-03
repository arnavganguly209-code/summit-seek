export type UpcomingTrip = {
  id: string;
  title: string;
  durationDays: number;
  startsLabel: string;
  endsLabel: string;
  status: string;
  badgeLabel: string;
  price: number;
  compareAtPrice: number | null;
  bookHref: string;
  visible: boolean;
};

export type UpcomingMonthTab = {
  id: string;
  label: string;
  trips: UpcomingTrip[];
};

export type UpcomingTripsContent = {
  eyebrow: string;
  heading: string;
  noteTitle: string;
  noteBody: string;
  viewAllLabel: string;
  viewAllHref: string;
  bookLabel: string;
  months: UpcomingMonthTab[];
  visible: boolean;
};
