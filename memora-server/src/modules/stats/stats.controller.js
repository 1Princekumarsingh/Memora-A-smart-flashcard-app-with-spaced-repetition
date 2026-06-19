import * as statsService from "./stats.service.js";

export const getStats = async(req, res) => {
    const stats = await statsService.getStats();

    res.status(200).json({
        success: true, 
        data: stats
    })
}

export const getHeatmap = async(req, res) => {
    const heatmap = await statsService.getHeatmapData();

    res.status(200).json({
        success: true, 
        data: heatmap
    })
}