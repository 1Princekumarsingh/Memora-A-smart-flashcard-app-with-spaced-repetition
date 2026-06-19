import { useQuery } from "@tanstack/react-query";

import { getStats, getHeatmap } from "../api";

export function useStats(){
    const statsQuery = useQuery({
        queryKey: ["stats"],
        queryFn: getStats
    });

    const heatmapQuery = useQuery({
        queryKey: ["heatmap"],
        queryFn: getHeatmap
    });

    return {
        statsQuery,
        heatmapQuery
    }
}