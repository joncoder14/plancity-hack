import { createBrowserRouter } from "react-router";
import PublicPages from "./pages/public/PublicPage";
import MainDashboard from "./pages/public/MainDashboard";
import PublictLayout from "./components/layouts/PublicLayout";
import LoginPage from "./pages/public/LoginPage"
import RegisterPage from "./pages/public/RegisterPage"
import PrivateLayout from "./components/layouts/PrivateLayoute";
import { requirsAuth } from "./loaders/requiresAuth";
import CategoriesPage from "./pages/private/CategoriesPage";
import EventsPage from "./pages/private/EventsPage";
import PublicsEvent from "./pages/public/PublicsEvent"

export const router = createBrowserRouter([{
    path:"/",
    element:<PublicPages/>,
    children:[
        {
            element:<PublictLayout/>,
            children:[{
                index:true,
                element:<MainDashboard/>
            },
            {
                path:"publicsevents/:id",
                element:<PublicsEvent/>
            }
        ]
            
        },
        {
            path:"login",
            element:<LoginPage/>
        },
        {
            path:"register",
            element:<RegisterPage/>
        }
        
    ]
    
},
{
    element:<PrivateLayout/>,
    loader:requirsAuth,
    children:[{
        index:true,
        path:"categories",
        element:<CategoriesPage/>
    },
    {
            path: "categories/:id",
            element: <EventsPage />
    },
  
]
}

])