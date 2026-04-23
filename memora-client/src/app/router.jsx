import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AppLayout from "../components/AppLayout";

import HomePage from "../pages/HomePage"
import DeckPage from "../pages/DeckPage"
import StudyPage from "../pages/StudyPage"
import StatsPage from "../pages/StatsPage"
import AuthPage from "../pages/AuthPage"

export const router = createBrowserRouter([
    {path: "/auth", element: <AuthPage/>},
    {
        element: <ProtectedRoute/>,
        children: [
            {
                element: <AppLayout/>,
                children: [
                    {path: "/", element:<HomePage/>},
                    {path: "/decks/:id", element:<DeckPage/>},
                    {path: "/study/:id", element:<StudyPage/>},
                    {path: "/stats", element:<StatsPage/>}
                ]
            }
        ]
    }
])