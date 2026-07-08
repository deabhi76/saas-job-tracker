import { Outlet } from "react-router-dom";

import Navbar
from "../components/Common/Navbar";

import Sidebar
from "../components/Common/Sidebar";

export default function CompanyAdminLayout() {

  const links = [

    {
      label: "Dashboard",
      path: "/company-admin"
    },

    {
      label: "Recruiters",
      path: "/company-admin/recruiters"
    },

    {
      label: "Create Recruiter",
      path:
        "/company-admin/create-recruiter"
    },

    {
    label: "Jobs",
    path: "/company-admin/jobs"
    },
    {
    label: "Create Job",
    path: "/company-admin/create-job"
    },
    {
    label:"Subscription",
    path: "/billing"
    }

  ];

  return (

    <div>

      <Navbar
        title="Company Admin"
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