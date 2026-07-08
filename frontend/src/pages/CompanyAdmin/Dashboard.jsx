import {
    useState,
    useEffect
} from "react";

import {
    getMyJobs
} from "../../api/jobApi";

import {
    getRecruiters
} from "../../api/recruiterApi";

import {
    getSubscription
} from "../../api/billingApi";

export default function CompanyAdminDashboard() {

    const [
        recruiters,
        setRecruiters
    ] = useState([]);

    const [
        jobs,
        setJobs
    ] = useState([]);

    const [
        subscription,
        setSubscription
    ] = useState(null);

    const loadDashboard =
    async () => {

        try {

            const [

                recruitersResponse,

                jobsResponse,

                subscriptionResponse

            ] = await Promise.all([

                getRecruiters(),

                getMyJobs(),

                getSubscription()

            ]);

            setRecruiters(
                recruitersResponse.data.data
            );

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

    useEffect(() => {

        loadDashboard();

    }, []);

    return (

        <div className="container">

            <h2 className="mb-4">
                Company Admin Dashboard
            </h2>

            <div className="row">

                <div className="col-md-3">

                    <div className="card shadow-sm p-3 mb-4">

                        <h5>
                            Recruiters
                        </h5>

                        <h2>
                            {recruiters.length}
                        </h2>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm p-3 mb-4">

                        <h5>
                            Company Jobs
                        </h5>

                        <h2>
                            {jobs.length}
                        </h2>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm p-3 mb-4">

                        <h5>
                            Subscription
                        </h5>

                        <h4>

            {
                subscription
                    ? subscription.plan_name
                    : "Loading..."
            }

        </h4>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm p-3 mb-4">

                        <h5>
                            Premium Analytics
                        </h5>

                        <h4>

                            {
                                subscription?.features
                                    ?.premiumAnalytics

                                    ?

                                    "Enabled"

                                    :

                                    "Disabled"
                            }

                        </h4>

                    </div>

                </div>

            </div>

            <h3 className="mt-5 mb-3">
                Recent Jobs
            </h3>

            {

                jobs.length === 0

                ?

                (

                    <div className="alert alert-info">

                        No jobs posted yet.

                    </div>

                )

                :

                jobs
                .slice(0, 5)
                .map(job => (

                    <div
                        key={job.id}
                        className="card shadow-sm p-3 mb-3"
                    >

                        <h5>
                            {job.title}
                        </h5>

                        <p className="mb-1">

                            <strong>
                                Location:
                            </strong>

                            {" "}

                            {job.location}

                        </p>

                        <p className="mb-1">

                            <strong>
                                Salary:
                            </strong>

                            {" "}

                            ₹{job.salary_min}

                            {" - "}

                            ₹{job.salary_max}

                        </p>

                        <p className="mb-0">

                            <strong>
                                Employment Type:
                            </strong>

                            {" "}

                            {job.employment_type}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}