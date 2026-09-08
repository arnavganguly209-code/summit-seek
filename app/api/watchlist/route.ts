import { NextResponse } from "next/server";
import { getWatchlists, saveWatchlists } from "@/lib/orbit/store";
import {
  clientIpFromHeaders,
  mergeWatchlistItems,
  normalizeHref,
  normalizeWatchlistItem,
} from "@/lib/watchlist/helpers";
import type { WatchlistItem } from "@/types/watchlist";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const ip = clientIpFromHeaders(req.headers);
  const data = await getWatchlists();
  const items = data.byIp[ip] || [];
  return NextResponse.json({ ok: true, ip, items });
}

export async function PUT(req: Request) {
  try {
    const ip = clientIpFromHeaders(req.headers);
    const body = (await req.json()) as { items?: Partial<WatchlistItem>[] };
    const items = mergeWatchlistItems(
      [],
      (Array.isArray(body.items) ? body.items : [])
        .map((item) => normalizeWatchlistItem(item))
        .filter((item): item is WatchlistItem => Boolean(item)),
    ).slice(0, 80);

    const data = await getWatchlists();
    data.byIp[ip] = items;
    await saveWatchlists(data);
    return NextResponse.json({ ok: true, ip, items });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not save watchlist." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const ip = clientIpFromHeaders(req.headers);
    const body = (await req.json()) as Partial<WatchlistItem>;
    const item = normalizeWatchlistItem({
      ...body,
      addedAt: body.addedAt || new Date().toISOString(),
    });
    if (!item) {
      return NextResponse.json(
        { ok: false, error: "Package href and title are required." },
        { status: 400 },
      );
    }

    const data = await getWatchlists();
    const current = data.byIp[ip] || [];
    data.byIp[ip] = mergeWatchlistItems(current, [item]).slice(0, 80);
    await saveWatchlists(data);
    return NextResponse.json({ ok: true, ip, items: data.byIp[ip] });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not add item." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const ip = clientIpFromHeaders(req.headers);
    const href = normalizeHref(new URL(req.url).searchParams.get("href") || "");
    if (!href) {
      return NextResponse.json({ ok: false, error: "href is required." }, { status: 400 });
    }
    const data = await getWatchlists();
    const current = data.byIp[ip] || [];
    data.byIp[ip] = current.filter((item) => item.href !== href);
    await saveWatchlists(data);
    return NextResponse.json({ ok: true, ip, items: data.byIp[ip] });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not remove item." }, { status: 500 });
  }
}
