

import {
    useState,
    useEffect
} from "react";

import {
    getMyApplications
} from "../../api/jobApi";

import {
    getSubscription
} from "../../api/billingApi";

export default function CandidateDashboard() {

    const [
        applications,
        setApplications
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

                applicationsResponse,

                subscriptionResponse

            ] = await Promise.all([

                getMyApplications(),

                getSubscription()

            ]);

            setApplications(
                applicationsResponse.data.data
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

    const getStatusBadge = (status) => {

        switch (status) {

            case "ACCEPTED":
                return "bg-success";

            case "REJECTED":
                return "bg-danger";

            case "INTERVIEW":
                return "bg-info";

            default:
                return "bg-warning text-dark";

        }

    };

    return (

        <div className="container py-4">

            <h2 className="fw-bold mb-1">
                Candidate Dashboard
            </h2>

            <p className="text-muted mb-4">
                Track your applications and subscription at a glance.
            </p>

            <div className="row g-4">

                <div className="col-lg-6">

                    <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

                        <h6 className="text-muted mb-3">
                            Applications
                        </h6>

                        <h1 className="fw-bold">
                            {applications.length}
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
                                    ? subscription.plan_name
                                    : "Loading..."
                            }

                        </h3>

                    </div>

                </div>

            </div>

            <h3 className="fw-bold mt-5 mb-4">
                Recent Applications
            </h3>

            {

                applications.length === 0

                ?

                (

                    <div className="card border-0 shadow-sm rounded-4 p-5 text-center">

                        <h5 className="fw-semibold">
                            No applications yet
                        </h5>

                        <p className="text-muted mb-0">
                            Start applying to jobs to track them here.
                        </p>

                    </div>

                )

                :

                applications
                    .slice(0, 5)
                    .map(application => (

                        <div
                            key={application.id}
                            className="card border-0 shadow-sm rounded-4 p-4 mb-3"
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h5 className="fw-semibold mb-2">
                                        {application.title}
                                    </h5>

                                    <p className="text-muted mb-2">
                                        {application.company_name}
                                    </p>

                                    <span
                                        className={`badge ${getStatusBadge(application.status)}`}
                                    >
                                        {application.status}
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}