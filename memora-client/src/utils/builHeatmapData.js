export function buildHeatmapData(reviews){
    const map = {};

    for(const r of reviews){
        const date = r.reviewedAt.split("T")[0];
        map[date] = (map[date] || 0) + 1;
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 90);

    const result = [];
    
    //loop through every day
    const current = new Date(startDate)

    while(current <= endDate){
        const formatted = current.toISOString().split('T')[0];

        result.push({
            date: formatted,
            count: map[formatted] || 0
        })

        current.setDate(current.getDate() + 1)
    }

    return result
}
