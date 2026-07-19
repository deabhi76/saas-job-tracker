import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

export default function PublicNavbar() {

    return (

        <nav
            className="navbar navbar-expand-lg border-bottom shadow-sm px-4 py-3"
            style={{
                backgroundColor: "#d8d6d6"
            }}
        >

            <div className="container">

                {/* Logo */}

                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center text-decoration-none"
                >

                    <BriefcaseBusiness
                        size={30}
                        className="text-primary me-2"
                    />

                    <span className="fw-bold fs-4 text-dark">

                        SaaS Job Tracker

                    </span>

                </Link>

                {/* Right */}

                <div className="d-flex align-items-center">

                    <Link
                        to="/jobs"
                        className="btn btn-outline-secondary me-3"
                    >
                        Browse Jobs
                    </Link>

                    <Link
                        to="/login"
                        className="btn btn-outline-primary me-2"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="btn btn-primary"
                    >
                        Sign Up
                    </Link>

                </div>

            </div>

        </nav>

    );

}