import {
    useState,
    useEffect
} from "react";

import {
    getMyJobs
} from "../../api/jobApi";

import {
    getSubscription
} from "../../api/billingApi";

export default function RecruiterDashboard() {

    const [
        jobs,
        setJobs
    ] = useState([]);

    const [
        subscription,
        setSubscription
    ] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard =
    async () => {

        try {

            const [

                jobsResponse,

                subscriptionResponse

            ] = await Promise.all([

                getMyJobs(),

                getSubscription()

            ]);

            setJobs(
                jobsResponse.data.data
            );

            setSubscription(
                subscriptionResponse.data.data
            );

        } catch (err) {

            console.error(err);

            alert(
                "Failed to load dashboard"
            );

        }

    };

    return (

        <div className="container py-4">

            <h2 className="fw-bold mb-1">
                Recruiter Dashboard
            </h2>

            <p className="text-muted mb-4">
                Manage your job postings and subscription.
            </p>

            <div className="row g-4">

                <div className="col-lg-6">

                    <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

                        <h6 className="text-muted mb-3">
                            My Jobs
                        </h6>

                        <h1 className="fw-bold">
                            {jobs.length}
                        </h1>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

                        <h6 className="text-muted mb-3">
                            Subscription
                        </h6>

                        <h3 className="fw-bold">

                            {

                                subscription

                                    ?

                                    subscription.plan_name

                                    :

                                    "Loading..."

                            }

                        </h3>

                    </div>

                </div>

            </div>

            <h3 className="fw-bold mt-5 mb-4">
                Recent Jobs
            </h3>

            {

                jobs.length === 0

                ?

                (

                    <div className="card border-0 shadow-sm rounded-4 p-5 text-center">

                        <h5 className="fw-semibold">
                            No jobs posted yet
                        </h5>

                        <p className="text-muted mb-0">
                            Create your first job posting to start hiring.
                        </p>

                    </div>

                )

                :

                jobs
                    .slice(0, 5)
                    .map(job => (

                        <div
                            key={job.id}
                            className="card border-0 shadow-sm rounded-4 p-4 mb-3"
                        >

                            <h5 className="fw-semibold mb-2">
                                {job.title}
                            </h5>

                            <p className="mb-3">

                                <strong>
                                    Salary:
                                </strong>

                                {" "}

                                ₹{job.salary_min}

                                {" - "}

                                ₹{job.salary_max}

                            </p>

                            <div>

                                <span className="badge bg-secondary me-2">
                                    {job.location}
                                </span>

                                <span className="badge bg-primary">
                                    {job.employment_type}
                                </span>

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}