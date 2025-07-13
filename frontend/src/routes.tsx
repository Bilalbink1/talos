import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "./App.tsx";
import SidebarLayout from "./components/SidebarLayout/SidebarLayout.tsx";
import Credentials from "./pages/Credentials/Credentials.tsx";
import Verification from "./pages/Verification/Verification.tsx";
import CredentialForm from "./pages/CredentialForm/CredentialForm.tsx";
import CredentialDetails from "./pages/CredentialDetails/CredentialDetails.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <SidebarLayout />
                <Navigate to="/credentials" replace />
            </>
        ),
        children: [
            { index: true, element: <App /> },
            {
                path: "credentials",
                element: <Credentials />,
            },
            {
                path: "credentials/create",
                element: <CredentialForm />,
            },
            {
                path: "credentials/:id",
                element: <CredentialDetails />,
            },
            {
                path: "verification",
                element: <Verification />,
            },
            {
                path: "*",
                element: <Navigate to="/credentials" replace />,
            },
        ],
    },
]);

export default router;
