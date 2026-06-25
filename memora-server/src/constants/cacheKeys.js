export const cacheKeys = {
    decks: (userId) =>
        `user:${userId}:decks`,

    deck: (userId, deckId) => 
        `user:${userId}:deck:${deckId}`,

    study: (deckId) => 
        `study:${deckId}`,

    stats: (userId) =>
        `user:${userId}:stats`,

    heatmap: (userId) =>
        `user:${userId}:heatmap`
}
