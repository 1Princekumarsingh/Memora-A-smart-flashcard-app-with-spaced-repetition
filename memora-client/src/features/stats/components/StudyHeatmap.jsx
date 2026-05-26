import HeatMapCell from "./HeatMapCell";

const weekDays = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function StudyHeatmap({data}){
    return(
        <div>
            <div className="overflow-x-auto pb-2">
                <div className="grid w-max grid-cols-[2rem_1fr] gap-3">
                    <div className="grid grid-rows-7 gap-1 pt-px text-xs text-slate-400 dark:text-slate-500">
                        {weekDays.map((day, index) => (
                            <span key={`${day}-${index}`} className="h-3.5 leading-none">
                                {day}
                            </span>
                        ))}
                    </div>

                    <div className="grid w-max grid-flow-col grid-rows-7 auto-cols-[0.875rem] gap-1">
                        {data.map((day) => (
                            <HeatMapCell key={day.date} count={day.count} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>Less</span>
                <span className="h-3.5 w-3.5 rounded-[3px] border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800" />
                <span className="h-3.5 w-3.5 rounded-[3px] border border-emerald-200 bg-emerald-100" />
                <span className="h-3.5 w-3.5 rounded-[3px] border border-emerald-400 bg-emerald-400" />
                <span className="h-3.5 w-3.5 rounded-[3px] border border-emerald-600 bg-emerald-600" />
                <span>More</span>
            </div>
        </div>
    )
}
