import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
    BriefcaseBusiness,
    Building2,
    Users,
    Search,
    ArrowRight
} from "lucide-react";

import PublicNavbar
from "../components/Common/PublicNavbar";

import Footer from "../components/Common/Footer";

import { useAuth } from "../context/AuthContext";

export default function Home() {

    const { setIsLoggingOut } = useAuth();

    useEffect(() => {

        setIsLoggingOut(false);

    }, []);

    return (

        <>
            
            {/* Hero */}

            <section
                className="py-5"
                style={{
                    background: "#f8f9fa"
                }}
            >

                <div className="container py-5 text-center">

                    <h1
                        className="display-4 fw-bold mb-3"
                    >
                        Hire Smarter.
                        <br />
                        Build Better Teams.
                    </h1>

                    <p
                        className="lead text-muted mx-auto mb-5"
                        style={{
                            maxWidth: "700px"
                        }}
                    >
                        SaaS Job Tracker is a recruitment platform
                        that helps companies hire efficiently,
                        recruiters manage hiring workflows,
                        and candidates discover new opportunities.
                    </p>

                    <div>

                        <Link
                            to="/jobs"
                            className="btn btn-primary btn-lg me-3 px-4"
                        >
                            Browse Jobs
                        </Link>

                        <Link
                            to="/signup"
                            className="btn btn-outline-primary btn-lg px-4"
                        >
                           Create Account
                        </Link>

                    </div>

                </div>

            </section>

            {/* Features */}

            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">
                            Built for Everyone
                        </h2>

                        <p className="text-muted">
                            Everything you need to manage recruitment in one platform.
                        </p>

                    </div>

                    <div className="row g-4">

                        {/* Candidate */}

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <Search
                                        size={40}
                                        className="text-primary mb-3"
                                    />

                                    <h4 className="fw-bold">
                                        Candidates
                                    </h4>

                                    <p className="text-muted">

                                        Browse jobs, upload your resume,
                                        apply with one click and
                                        track every application.

                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Recruiter */}

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <Users
                                        size={40}
                                        className="text-primary mb-3"
                                    />

                                    <h4 className="fw-bold">
                                        Recruiters
                                    </h4>

                                    <p className="text-muted">

                                        Create jobs, review applications,
                                        shortlist candidates and
                                        streamline hiring.

                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Company */}

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <Building2
                                        size={40}
                                        className="text-primary mb-3"
                                    />

                                    <h4 className="fw-bold">
                                        Companies
                                    </h4>

                                    <p className="text-muted">

                                        Manage recruiters, subscriptions
                                        and company-wide hiring
                                        from one dashboard.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section
                className="py-5"
                style={{
                    background: "#eef1f4"
                }}
            >

                <div className="container text-center">

                    <BriefcaseBusiness
                        size={52}
                        className="text-primary mb-3"
                    />

                    <h2 className="fw-bold">

                        Ready to get started?

                    </h2>

                    <p
                        className="text-muted mb-4"
                    >

                        Join SaaS Job Tracker today
                        and simplify your recruitment process.

                    </p>

                    <Link
                        to="/signup"
                        className="btn btn-primary btn-lg px-5"
                    >

                        Get Started

                        <ArrowRight
                            size={18}
                            className="ms-2"
                        />

                    </Link>

                </div>

            </section>

           
        </>

    );

}