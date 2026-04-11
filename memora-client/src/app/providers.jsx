import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../lib/queryClient"


//Making it Global -> injects queryClient into the entire component tree
const Providers = ({children}) => {//children-> Represents your entire app
    return (
        // You are passing your QueryClient instance
        // this becomes globally available
        <QueryClientProvider client={queryClient}>
            {children} 
            {/* Renders your app inside the provider */}
            </QueryClientProvider>
    )
}

export default Providers
