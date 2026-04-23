import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../lib/queryClient"


//making it global -> injects queryClient into the entire component tree
const Providers = ({children}) => {//children-> epresents your entire app
    return (
        // you are passing your QueryClient instance
        // this becomes globally available
        <QueryClientProvider client={queryClient}>
            {children} 
            {/* renders your app inside the provider */}
            </QueryClientProvider>
    )
}

export default Providers
