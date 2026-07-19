import {
    useEffect,
    useState
} from "react";

import {
    useAuth
} from "../../context/AuthContext";

import {

    getCandidateAnalytics,

    getRecruiterAnalytics,

    getCompanyAnalytics,
    getAdminAnalytics

} from "../../api/analyticsApi";

export default function AnalyticsDashboard({type}) {

    const { user } =
        useAuth();

    const [

        analytics,

        setAnalytics

    ] = useState(null);

    const [

        loading,

        setLoading

    ] = useState(true);

    useEffect(() => {

        setLoading(true);

        setAnalytics(null);

        loadAnalytics();

    }, [type]);

    const loadAnalytics =
    async () => {

        try {

            let response;

       console.log("Analytics type:", type);     

switch (type) {

    case "candidate":

        response =
            await getCandidateAnalytics();

        break;

    case "recruiter":

        response =
            await getRecruiterAnalytics();

        break;

    case "company":

        response =
            await getCompanyAnalytics();

        break;

    case "admin":

        response =
            await getAdminAnalytics();

        break;
}

            setAnalytics(
                response.data.data
            );

        } catch (err) {

            console.error(err);

            if (

                err.response?.status === 403

            ) {

                alert(

                    "Upgrade to Premium to access Analytics."

                );

                return;

            }

            alert(

                "Failed to load analytics"

            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h3>Loading...</h3>;

    }

    if (!analytics) {

        return (

            <div className="alert alert-warning">

                Analytics unavailable.

            </div>

        );

    }

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Analytics

            </h2>

            <div className="alert alert-info d-flex align-items-center mb-4">

    <strong className="me-2">
        🚧 Work in Progress
    </strong>

    <span>
        This analytics dashboard is currently under development.
        Additional charts, visualizations, and insights will be added in future updates.
    </span>

</div>

            <div className="row">

                {

                    Object.entries(analytics)

                        .filter(([key]) =>

                            !key.endsWith("_id") &&

                            key !== "created_at"

                        )

                        .map(([key, value]) => (

                            <div

                                key={key}

                                className="col-md-3 mb-3"

                            >

                                <div className="card shadow-sm h-100">

                                    <div className="card-body text-center">

                                        <h6 className="text-muted">

                                            {

                                                key

                                                    .replaceAll("_", " ")

                                                    .replace(/\b\w/g,

                                                        c => c.toUpperCase()

                                                    )

                                            }

                                        </h6>

                                        <h2>

                                            {value}

                                        </h2>

                                    </div>

                                </div>

                            </div>

                        ))

                }

            </div>

        </div>

    );

}