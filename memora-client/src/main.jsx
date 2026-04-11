import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./app/router"
import Providers from "./app/providers"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers> {/* Every component can now:- fetch data - access cache - use React Query hooks */}
      <RouterProvider router={router} /> {/* Navigation Engine */}
    </Providers>
  </React.StrictMode>
)