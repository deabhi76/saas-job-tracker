import { Outlet } from "react-router-dom";

import Navbar
from "../components/Common/Navbar";

import Sidebar
from "../components/Common/Sidebar";

export default function CandidateLayout() {

    const links = [

        {
            label: "Dashboard",
            path: "/candidate/dashboard"
        },

        {
            label: "Browse Jobs",
            path: "/candidate/jobs"
        },

        {
            label: "My Applications",
            path: "/candidate/my-applications"
        },

        {
            label: "Subscription",
            path: "/billing"
        },

        {
            label: "Analytics",
            path: "/candidate/analytics"
        }

    ];

    return (

        <div>

            <Navbar
                title="Candidate"
            />

            <div className="d-flex">

                <Sidebar
                    links={links}
                />

                <div
                    className="p-4 flex-grow-1"
                >

                    <Outlet />

                </div>

            </div>

        </div>

    );
}