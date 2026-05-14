import useDeckStore from "../features/deck/hooks/useDeckStore";
import { getStudyStats } from "../utils/stats";

export default function StatsPage() {
  
  const decks = useDeckStore((s)=> s.decks)
  const stats = getStudyStats(decks)

  if (stats.totalReviews === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">
          No study data yet.
        </h1>

        <p className="text-gray-500 mt-2">
          Start reviewing cards to see stats.
        </p>
      </div>
    );
  }

  return(
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Study Stats
      </h1>

      <div className="grid gap-4">
        <StatCard title="Total Reviews" values={stats.totalReviews} />
        <StatCard title="Easy Review" values = {stats.easyCount} />
        <StatCard title="medium Review" values = {stats.mediumCount} />
        <StatCard title="hard Review" values = {stats.hardCount} />
        <StatCard title="Retention Mode" values = {`${stats.retentionRate}%`} />
      </div>
    </div>
  )
}

function StatCard({title, values}){
  return(
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {values}
      </h2>
    </div>
  )
}

