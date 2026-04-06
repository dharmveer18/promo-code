import { type Deal } from "./deal-data";

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  const discount =
    deal.originalPrice
      ? Math.round(
          (1 -
            parseFloat(deal.price.replace("$", "")) /
              parseFloat(deal.originalPrice.replace("$", ""))) *
            100,
        )
      : null;

  return (
    <div className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Upvote column */}
      <div className="flex w-12 flex-col items-center justify-start gap-1 pt-1">
        <button className="text-orange-500 hover:text-orange-600 text-xl leading-none">▲</button>
        <span className="text-sm font-bold text-gray-700">{deal.upvotes}</span>
      </div>

      {/* Deal content */}
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {deal.category}
          </span>
          <span className="text-xs text-gray-400">{deal.store}</span>
          {discount && (
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              -{discount}%
            </span>
          )}
        </div>

        <a
          href={deal.url}
          className="text-base font-semibold text-gray-900 hover:text-orange-600 leading-snug"
        >
          {deal.title}
        </a>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-orange-500">{deal.price}</span>
          {deal.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{deal.originalPrice}</span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
          <span>{deal.postedAt}</span>
          <span>💬 {deal.commentsCount} comments</span>
        </div>
      </div>
    </div>
  );
}
