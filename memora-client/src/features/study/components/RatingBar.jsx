export default function RatingBar({onRate}){
    return(
        <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex h-12 min-w-24 items-center justify-center rounded-lg bg-red-500 px-5 text-base font-semibold text-white shadow-sm shadow-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2" onClick={()=> onRate("hard")}>
                Hard
            </button>

            <button className="inline-flex h-12 min-w-24 items-center justify-center rounded-lg bg-amber-500 px-5 text-base font-semibold text-white shadow-sm shadow-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2" onClick={()=> onRate("medium")}>
                Medium
            </button>

            <button className="inline-flex h-12 min-w-24 items-center justify-center rounded-lg bg-emerald-600 px-5 text-base font-semibold text-white shadow-sm shadow-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" onClick={()=> onRate("easy")}>
                Easy
            </button>
        </div>
    )
}
