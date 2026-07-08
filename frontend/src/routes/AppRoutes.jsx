import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/Common/ProtectedRoute";
import LoginPage from "../pages/Auth/LoginPage";
import SignupSelectionPage from "../pages/Auth/SignupSelectionPage";
import CandidateSignupPage from "../pages/Auth/CandidateSignupPage";
import CompanySignupPage from "../pages/Auth/CompanySignupPage";

import CandidateDashboard from "../pages/Candidate/Dashboard";
import RecruiterDashboard from "../pages/Recruiter/Dashboard";
import CompanyAdminDashboard from "../pages/CompanyAdmin/Dashboard";
import AdminDashboard from "../pages/Admin/Dashboard";

import Home
from "../pages/Home";

import CompanyAdminLayout
from "../layouts/CompanyAdminLayout";

import RecruiterLayout
from "../layouts/RecruiterLayout";

import CandidateLayout
from "../layouts/CandidateLayout";

import Recruiters
from "../pages/CompanyAdmin/Recruiters";

import CreateRecruiter
from "../pages/CompanyAdmin/CreateRecruiter";

import Jobs
from "../pages/CompanyAdmin/Jobs";

import CreateJob
from "../pages/CompanyAdmin/CreateJob";

import EditJob
from "../pages/CompanyAdmin/EditJob";

import CandidateJobs
from "../pages/Candidate/Jobs";

import CandidateJobDetails
from "../pages/Candidate/JobDetails";

import MyApplications
from "../pages/Candidate/MyApplications";

import JobApplications
from "../pages/CompanyAdmin/JobApplications";

import BillingPage
from "../pages/Billing/BillingPage";

import CheckoutPage from "../pages/Billing/CheckoutPage";

import PaymentSuccessPage from "../pages/Billing/PaymentSuccessPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupSelectionPage />} />

        <Route
            path="/jobs"
            element={<CandidateJobs />}
        />

        <Route
            path="/jobs/:id"
            element={<CandidateJobDetails />}
        />

        <Route
        path="/signup/candidate"
        element={<CandidateSignupPage />}
        />

        <Route
        path="/signup/company"
        element={<CompanySignupPage />}
        />
                
        <Route
    path="/candidate"
    element={
        <ProtectedRoute
            allowedRoles={[
                "CANDIDATE"
            ]}
        >
            <CandidateLayout />
        </ProtectedRoute>
    }
>

    <Route
        index
        element={
            <CandidateDashboard />
        }
    />

    <Route
        path="dashboard"
        element={
            <CandidateDashboard />
        }
    />

    <Route
        path="jobs"
        element={
            <CandidateJobs />
        }
    />

    <Route
        path="jobs/:id"
        element={
            <CandidateJobDetails />
        }
    />

    <Route
        path="my-applications"
        element={
            <MyApplications />
        }
    />

</Route>

        <Route
            path="/recruiter"
            element={
                <ProtectedRoute
                    allowedRoles={[
                        "RECRUITER"
                    ]}
                >
                    <RecruiterLayout />
                </ProtectedRoute>
            }
        >

            <Route
                index
                element={<RecruiterDashboard />}
            />

            <Route
                path="jobs"
                element={<Jobs />}
            />

            <Route
                path="jobs/:id/edit"
                element={<EditJob />}
            />

            <Route
                path="create-job"
                element={<CreateJob />}
            />

            <Route
                path="browse-jobs"
                element={<CandidateJobs />}
            />

            <Route
                path="browse-jobs/:id"
                element={<CandidateJobDetails />}
            />

            <Route
                path="my-applications"
                element={<MyApplications />}
            />

            <Route
                path="jobs/:id/applications"
                element={<JobApplications />}
            />

        </Route>

        <Route
        path="/company-admin"
        element={
            <ProtectedRoute
            allowedRoles={[
                "COMPANY_ADMIN"
            ]}
            >
            <CompanyAdminLayout />
            </ProtectedRoute>
        }
        >

        <Route
            index
            element={
            <CompanyAdminDashboard />
            }
        />

        <Route
            path="recruiters"
            element={<Recruiters />}
        />

        <Route
            path="create-recruiter"
            element={
            <CreateRecruiter />
            }
        />

        <Route
        path="jobs"
        element={<Jobs />}
        />

        <Route
        path="jobs/:id/edit"
        element={<EditJob />}
        />

        <Route
        path="create-job"
        element={<CreateJob />}
        />

        </Route>

        <Route
        path="/admin/dashboard"
        element={
            <ProtectedRoute
            allowedRoles={[
                "SUPER_ADMIN"
            ]}
            >
            <AdminDashboard />
            </ProtectedRoute>
        }
        />

        <Route
            path="/company/jobs/:id/applications"
            element={
                <ProtectedRoute
                    allowedRoles={[
                        "COMPANY_ADMIN"
                    ]}
                >
                    <JobApplications />
                </ProtectedRoute>
            }
        />

        <Route
            path="/billing"
            element={
                <ProtectedRoute
                    allowedRoles={[
                        "CANDIDATE",
                        "COMPANY_ADMIN",
                        "RECRUITER"
                    ]}
                >
                    <BillingPage />
                </ProtectedRoute>
            }
        />

        <Route
    path="/billing/checkout/:planId"
    element={<CheckoutPage />}
/>

<Route
    path="/billing/success"
    element={
        <PaymentSuccessPage />
    }
/>
      </Routes>
    </BrowserRouter>
  );
}