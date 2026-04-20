import { DealCard } from "~/app/_components/DealCard";
import { DealModal } from "~/app/_components/DealModal";
import { type Deal } from "~/app/_components/deal-data";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const dbDeals = await api.deal.getAll();

  // Map DB rows to the Deal shape DealCard expects
  const deals: Deal[] = dbDeals.map((d) => ({
    id: d.id,
    title: d.title,
    url: d.url,
    price: d.price ?? "Free",
    originalPrice: d.originalPrice ?? undefined,
    store: d.store,
    category: d.category,
    upvotes: d.upvotes,
    commentsCount: d.commentsCount,
    postedAt: new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.round((d.createdAt.getTime() - Date.now()) / 60000),
      "minute",
    ),
  }));

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <h1 className="text-xl font-extrabold text-orange-500 tracking-tight">
              Promo Code
            </h1>
            <DealModal />
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Latest Deals
          </h2>
          <div className="flex flex-col gap-3">
            {deals.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">
                No deals yet — be the first to add one!
              </p>
            ) : (
              deals.map((deal) => <DealCard key={deal.id} deal={deal} />)
            )}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}