
import {
    useState,
    useEffect
} from "react";

import { Link } from "react-router-dom";

import api from "../../api/axios";

import {
    useAuth
} from "../../context/AuthContext";

export default function CandidateJobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            const response = await api.get("/jobs");

            setJobs(response.data.data);

        } catch (err) {

            console.error(err);

        }

    };

    const { user } = useAuth();

const getJobDetailsPath = (jobId) => {

    switch (user?.role) {

        case "CANDIDATE":
            return `/candidate/jobs/${jobId}`;

        case "RECRUITER":
            return `/recruiter/browse-jobs/${jobId}`;

        default:
            return `/jobs/${jobId}`;
    }

};

    return (

        <div className="container py-4">

            <h2 className="fw-bold mb-1">
                Available Jobs
            </h2>

            <p className="text-muted mb-4">
                Browse the latest opportunities from companies.
            </p>

            <div className="row justify-content-center">

                {

                    jobs.length === 0

                        ?

                        (

                            <div className="col-lg-10">

                                <div className="card border-0 shadow-sm rounded-4 p-5 text-center">

                                    <h5 className="fw-semibold">
                                        No jobs available
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Please check back later.
                                    </p>

                                </div>

                            </div>

                        )

                        :

                        jobs.map((job) => (

                            <div
                                key={job.id}
                                className="col-lg-10 mb-4"
                            >

                                <div className="card border-0 shadow-sm rounded-4">

                                    <div className="card-body p-4 d-flex justify-content-between align-items-center">

                                        <div>

                                            <div className="d-flex align-items-center mb-3">

                                                <h4 className="fw-bold mb-0 me-3">
                                                    {job.title}
                                                </h4>

                                                <span className="text-muted fs-5">
                                                    {job.company_name}
                                                </span>

                                            </div>

                                            <div>

                                                <span className="badge bg-secondary me-2">
                                                    {job.location}
                                                </span>

                                                <span className="badge bg-primary">
                                                    {job.employment_type}
                                                </span>

                                            </div>

                                        </div>

                                        <div>

                                            <Link
                                                to={getJobDetailsPath(job.id)}
                                                className="btn btn-outline-primary"
                                            >
                                                View Details
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                }

            </div>

        </div>

    );

}