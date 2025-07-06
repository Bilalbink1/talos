import { createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Credentials from "./components/Credentials/Credentials.tsx";
import Verification from "./components/Verification/Verification.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Navbar />
                <App />
            </>
        ),
    },
    {
        path: "credentials",
        element: (
            <>
                <Navbar />
                <Credentials />
            </>
        ),
    },
    {
        path: "verification",
        element: (
            <>
                <Navbar />
                <Verification />
            </>
        ),
    },
]);

export default router;
