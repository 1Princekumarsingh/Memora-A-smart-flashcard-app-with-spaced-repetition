export default function HeatMapCell({count}){
    let bg = "bg-slate-100 border-slate-200"

    if(count>0) bg = "bg-emerald-100 border-emerald-200";
    if(count>3) bg = "bg-emerald-400 border-emerald-400";
    if(count>6) bg = "bg-emerald-600 border-emerald-600";

    return(
        <div 
        className={`h-3.5 w-3.5 rounded-[3px] border ${bg} transition-transform hover:scale-125`}
        title={`${count} reviews`}>
        </div>
    )
}
