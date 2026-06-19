import { useStats } from "../features/stats/hooks/useStats";
import StudyHeatmap from "../features/stats/components/StudyHeatmap";

export default function StatsPage() {
  const { statsQuery, heatmapQuery } = useStats();

  if (statsQuery.isLoading || heatmapQuery.isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">Loading stats...</p>
      </div>
    );
  }

  if (statsQuery.isError || heatmapQuery.isError) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Failed to load stats
        </h1>
        <p className="mt-2 text-gray-500 dark:text-slate-400">
          Please try again later.
        </p>
      </div>
    );
  }

  const stats = statsQuery.data;
  const heatmapData = heatmapQuery.data || [];
  const mostForgottenDecks = stats?.mostForgottenDecks || [];

  if (!stats || stats.totalReviews === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          No study data yet.
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-400">
          Start reviewing cards to see stats.
        </p>
      </div>
    );
  }

  return(
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Learning dashboard
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100">
          Progress
        </h1>
      </div>

      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Last 90 days
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Activity
            </h1>
          </div>
        </div>

        <StudyHeatmap data={heatmapData}/>
      </div>

      <div className="mb-5">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Performance
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Review Summary
        </h2>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Reviews" values={stats.totalReviews} tone="blue" />
        <StatCard title="Retention Rate" values={`${stats.retentionRate}%`} tone="emerald" />
        <StatCard title="Strong Reviews" values={stats.strongCount} tone="violet" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard title="Forgot Reviews" values={stats.forgotCount} tone="rose" />
        <StatCard title="Hard Reviews" values={stats.hardCount} tone="amber" />
        <StatCard title="Good Reviews" values={stats.goodCount} tone="sky" />
        <StatCard title="Easy Reviews" values={stats.easyCount} tone="green" />
        <StatCard title="Weak Reviews" values={stats.weakCount} tone="slate" />
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Most Forgotten Cards
        </h2>

        {mostForgottenDecks.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            No forgotten cards yet.
          </p>
          ) : (
          <div className="space-y-3">
            {mostForgottenDecks.map((deck) => (
              <div
                key={deck.id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  {deck.name}
                </h3>

                <div className="mt-3 space-y-2">
                  {deck.cards.map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center justify-between gap-4 rounded-md bg-slate-50 px-3 py-2 dark:bg-slate-800">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {card.question}
                      </p>

                      <span className="shrink-0 rounded-md bg-rose-50 px-3 py-1 text-sm font-bold text-rose-700 ring-1 ring-rose-100 dark:bg-rose-950/60 dark:text-rose-200 dark:ring-rose-800">
                        {card.forgetRate}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const statTones = {
  amber: "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950/60 dark:text-amber-200 dark:ring-amber-800",
  blue: "bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-950/60 dark:text-blue-200 dark:ring-blue-800",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-200 dark:ring-emerald-800",
  green: "bg-green-50 text-green-700 ring-green-100 dark:bg-green-950/60 dark:text-green-200 dark:ring-green-800",
  rose: "bg-rose-50 text-rose-700 ring-rose-100 dark:bg-rose-950/60 dark:text-rose-200 dark:ring-rose-800",
  sky: "bg-sky-50 text-sky-700 ring-sky-100 dark:bg-sky-950/60 dark:text-sky-200 dark:ring-sky-800",
  slate: "bg-slate-50 text-slate-700 ring-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700",
  violet: "bg-violet-50 text-violet-700 ring-violet-100 dark:bg-violet-950/60 dark:text-violet-200 dark:ring-violet-800",
};

function StatCard({title, values, tone = "slate"}){
  return(
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:shadow-none">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <h2 className={`mt-3 inline-flex min-w-16 items-center justify-center rounded-md px-3 py-1.5 text-3xl font-bold ring-1 ${statTones[tone]}`}>
        {values}
      </h2>
    </div>
  )
}
