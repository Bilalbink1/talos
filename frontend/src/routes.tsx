import { createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import SidebarLayout from "./components/SidebarLayout/SidebarLayout.tsx";
import Credentials from "./components/Credentials/Credentials.tsx";
import Verification from "./components/Verification/Verification.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SidebarLayout />,
        children: [
            { index: true, element: <App /> },
            {
                path: "credentials",
                element: <Credentials />,
            },
            {
                path: "verification",
                element: <Verification />,
            },
        ],
    },
]);

export default router;
