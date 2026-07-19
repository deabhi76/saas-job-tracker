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
  },

  {
    label: "Recruiter Analytics",
    path: "/recruiter/analytics"
  },

  {
    label: "Personal Analytics",
    path: "/recruiter/personal-analytics"
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