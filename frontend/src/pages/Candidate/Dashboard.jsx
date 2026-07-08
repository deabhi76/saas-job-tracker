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

    return (

        <div className="container">

            <h2 className="mb-4">
                Candidate Dashboard
            </h2>

            <div className="row">

                <div className="col-md-4">

                    <div className="card shadow-sm p-3 mb-4">

                        <h5>
                            Applications
                        </h5>

                        <h2>
                            {applications.length}
                        </h2>

                    </div>

                </div>

                <div className="col-md-4">

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

                <div className="col-md-4">

                    <div className="card shadow-sm p-3 mb-4">

                        <h5>
                            Resume
                        </h5>

                        <h4>

                            {
                                applications.some(
                                    app => app.resume_url
                                )

                                ?

                                "Uploaded"

                                :

                                "Not Uploaded"
                            }

                        </h4>

                    </div>

                </div>

            </div>

            <h3 className="mt-5 mb-3">

                Recent Applications

            </h3>

            {

                applications.length === 0

                ?

                (

                    <div className="alert alert-info">

                        You haven't applied to any jobs yet.

                    </div>

                )

                :

                applications
                .slice(0,5)
                .map(application => (

                    <div
                        key={application.id}
                        className="card shadow-sm p-3 mb-3"
                    >

                        <h5>

                            {application.job_title}

                        </h5>

                        <p>

                            <strong>

                                Status:

                            </strong>

                            {" "}

                            {application.status}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}