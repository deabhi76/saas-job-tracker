import { Outlet } from "react-router-dom";

import PublicNavbar from "../components/Common/PublicNavbar";
import Footer from "../components/Common/Footer";

export default function PublicLayout() {

    return (

        <>
            <PublicNavbar />

            <main>

                <Outlet />

            </main>

            <Footer />

        </>

    );

}