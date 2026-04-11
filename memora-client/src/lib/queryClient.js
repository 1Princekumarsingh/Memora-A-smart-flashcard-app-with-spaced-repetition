import { QueryClient } from "@tanstack/react-query"

// QueryClient is a central data manager.

// Think of it as:
// A global system that:
// - stores API data
// - caches results
// - manages loading & errors
// - syncs data across components
export const queryClient = new QueryClient()
