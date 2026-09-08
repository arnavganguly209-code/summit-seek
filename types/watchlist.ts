export type WatchlistItem = {
  href: string;
  title: string;
  imageUrl: string;
  price: number;
  compareAtPrice: number | null;
  durationLabel: string;
  addedAt: string;
};

export type WatchlistsContent = {
  byIp: Record<string, WatchlistItem[]>;
};
