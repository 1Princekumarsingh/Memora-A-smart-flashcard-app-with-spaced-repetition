import { prisma } from "../../config/prisma.js";

export async function cleanupExpiredRefreshTokens() {
    const result = await prisma.refreshToken.deleteMany({
        where: {
            expiresAt: { 
                lt: new Date()
            }
        }
    })
    
    console.log(`Removed ${result.count} expired refresh tokens`)

    return {
        deleted: result.count
    }
}

export async function dailySystemReport() {
    const now = new Date()

    const [
        userCount,
        deckCount,
        cardCount,
        reviewCount,
        dueCardCount,
        refreshTokenCount
    ] = await Promise.all([
        prisma.user.count(),
        prisma.deck.count(),
        prisma.card.count(),
        prisma.review.count(),
        prisma.card.count({
            where: {
                OR: [
                    { nextReview: null },
                    { nextReview: { lte: now } }
                ]
            }
        }),
        prisma.refreshToken.count()
    ])

    const report = {
        userCount,
        deckCount,
        cardCount,
        reviewCount,
        dueCardCount,
        refreshTokenCount
    }

    console.log("Daily system report", report)

    return report
}

// flow control
export async function processMaintenanceJob(job) {
    switch(job.name) {
        case "cleanup-expired-refresh-tokens":
            return cleanupExpiredRefreshTokens()

        case "daily-system-report":
            return dailySystemReport()

        default:
            throw new Error(`Unknown maintenance job: ${job.name}`)
    }
}
