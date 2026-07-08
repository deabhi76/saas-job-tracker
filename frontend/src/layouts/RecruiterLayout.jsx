import { Outlet } from "react-router-dom";

import Navbar
from "../components/Common/Navbar";

import Sidebar
from "../components/Common/Sidebar";

export default function RecruiterLayout() {

  const links = [

    {
      label: "Dashboard",
      path: "/recruiter"
    },

    {
      label: "My Jobs",
      path: "/recruiter/jobs"
    },

    {
      label: "Create Job",
      path: "/recruiter/create-job"
    },

    {
      label: "Browse Jobs",
      path: "/recruiter/browse-jobs"
    },

    {
      label: "My Applications",
      path: "/recruiter/my-applications"
    },

    {
    label: "Subscription",
    path: "/billing"
  }


  ];

  return (

    <div>

      <Navbar
        title="Recruiter"
      />

      <div className="d-flex">

        <Sidebar
          links={links}
        />

        <div className="p-4 flex-grow-1">

          <Outlet />

        </div>

      </div>

    </div>

  );

}