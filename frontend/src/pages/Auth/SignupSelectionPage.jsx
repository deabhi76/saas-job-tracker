import { Link } from "react-router-dom";

import {
    User,
    Building2
} from "lucide-react";

export default function SignupSelectionPage() {

    return (

      

        <div
            className="container py-5"
            style={{
                maxWidth: "1000px"
            }}
        >
<div className="mb-4">

    <Link
        to="/"
        className="btn btn-outline-secondary"
    >
        ← Back to Home
    </Link>

</div>
            <div className="text-center mb-5">

                <h1 className="fw-bold">
                    Choose Your Account
                </h1>

                <p className="text-muted">

                    Select how you'd like to use
                    SaaS Job Tracker.

                </p>

            </div>

            <div className="row g-4 justify-content-center">

                {/* Candidate */}

                <div className="col-md-5">

                    <div className="card border-0 shadow-sm rounded-4 h-100">

                        <div className="card-body text-center p-5">

                            <User
                                size={54}
                                className="text-primary mb-4"
                            />

                            <h3 className="fw-bold mb-3">
                                Candidate
                            </h3>

                            <p className="text-muted mb-4">

                                Browse available jobs,
                                upload your resume,
                                apply with one click,
                                and track your applications.

                            </p>

                            <Link
                                to="/signup/candidate"
                                className="btn btn-primary px-4"
                            >
                                Continue as Candidate
                            </Link>

                        </div>

                    </div>

                </div>

                {/* Company */}

                <div className="col-md-5">

                    <div className="card border-0 shadow-sm rounded-4 h-100">

                        <div className="card-body text-center p-5">

                            <Building2
                                size={54}
                                className="text-success mb-4"
                            />

                            <h3 className="fw-bold mb-3">
                                Company
                            </h3>

                            <p className="text-muted mb-4">

                                Hire candidates,
                                create and manage recruiters,
                                post jobs,
                                and oversee company recruitment.

                            </p>

                            <Link
                                to="/signup/company"
                                className="btn btn-success px-4"
                            >
                                Continue as Company
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

            <div className="text-center mt-5">

                <p className="text-muted mb-0">

                    Already have an account?

                    {" "}

                    <Link
                        to="/login"
                        className="text-decoration-none"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}