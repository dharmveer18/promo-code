import { DealCard } from "~/app/_components/DealCard";
import { DealModal } from "~/app/_components/DealModal";
import { SAMPLE_DEALS } from "~/app/_components/deal-data";

export default async function Home() {
  return (
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
        {/* Deal list */}
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Latest Deals
        </h2>
        <div className="flex flex-col gap-3">
          {SAMPLE_DEALS.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </main>
  );
}