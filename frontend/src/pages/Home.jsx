import {
    Link
} from "react-router-dom";

import { useEffect } from "react";

import { useAuth }
from "../context/AuthContext";

export default function Home() {


    const {
    setIsLoggingOut
} = useAuth();

    useEffect(() => {

    setIsLoggingOut(false);

}, []);

    return (

        <div className="container mt-5">

            <h1>
                SaaS Job Tracker
            </h1>

            <p>
                Find jobs and hire talent.
            </p>

            <div className="mt-4">

                <Link
                    to="/jobs"
                    className="btn btn-success me-2"
                >
                    Browse Jobs
                </Link>

                <Link
                    to="/login"
                    className="btn btn-primary me-2"
                >
                    Login
                </Link>

                <Link
                    to="/signup"
                    className="btn btn-secondary"
                >
                    Sign Up
                </Link>

            </div>

        </div>
    );
}