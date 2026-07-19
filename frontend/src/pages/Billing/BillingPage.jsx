
import {
    useState,
    useEffect
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getPlans,
    getSubscription,
    purchaseSubscription,
    cancelSubscription,
    getPayments
} from "../../api/billingApi";

import {
    useAuth
} from "../../context/AuthContext";

export default function BillingPage() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [
        plans,
        setPlans
    ] = useState([]);

    const [
        payments,
        setPayments
    ] = useState([]);

    const [
        subscription,
        setSubscription
    ] = useState(null);

    useEffect(() => {

        loadPlans();

        loadSubscription();

        loadPayments();

    }, []);

    const handleBack = () => {

        switch (user.role) {

            case "CANDIDATE":

                navigate("/candidate");

                break;

            case "RECRUITER":

                navigate("/recruiter");

                break;

            case "COMPANY_ADMIN":

                navigate("/company-admin");

                break;

            default:

                navigate("/");

        }

    };

    const loadPayments =
        async () => {

            try {

                const response =
                    await getPayments();

                setPayments(
                    response.data.data
                );

            } catch (err) {

                console.error(err);

            }

        };

    const loadPlans =
        async () => {

            try {

                const response =
                    await getPlans();

                setPlans(
                    response.data.data
                );

            } catch (err) {

                console.error(err);

                alert(
                    "Failed to load plans"
                );

            }

        };

    const loadSubscription =
        async () => {

            try {

                const response =
                    await getSubscription();

                setSubscription(
                    response.data.data
                );

            } catch (err) {

                console.error(err);

            }

        };

    const handleDowngrade =
        async () => {

            try {

                await cancelSubscription(
                    subscription.id
                );

                alert(
                    "Downgraded to Free Plan"
                );

                loadSubscription();

                loadPayments();

            } catch (err) {

                console.error(err);

                alert(

                    err.response?.data?.error ||

                    err.response?.data?.message ||

                    "Downgrade failed"

                );

            }

        };

    const currentPlan =
        plans.find(

            p =>

                p.id ===

                subscription?.plan_id

        );

    return (

        <div className="container py-4">

            <button
                className="btn btn-outline-secondary mb-4"
                onClick={handleBack}
            >
                ← Back to Dashboard
            </button>

            <h2 className="fw-bold mb-1">
                Subscription Plans
            </h2>

            <p className="text-muted mb-5">
                Manage your subscription and billing history.
            </p>

            <div className="row g-4">

                {

                    plans.map(plan => (

                        <div
                            key={plan.id}
                            className="col-lg-4"
                        >

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4 d-flex flex-column">

                                    <h3 className="fw-bold mb-2">

                                        {plan.name}

                                    </h3>

                                    <h4 className="text-primary mb-4">

                                        ₹{plan.monthly_price}

                                        <small className="text-muted fs-6">

                                            /month

                                        </small>

                                    </h4>

                                    <ul className="list-unstyled flex-grow-1">

                                        {

                                            Object.entries(
                                                plan.features
                                            ).map(

                                                ([key, value]) => (

                                                    <li
                                                        key={key}
                                                        className="mb-2"
                                                    >

                                                         {

                                                            typeof value === "boolean"

                                                                ?

                                                                (

                                                                    value

                                                                        ? "✅"

                                                                        : "❌"

                                                                )

                                                                :

                                                                "✅"

                                                        }

                                                        {" "}


                                                        {

                                                            key

                                                                .replaceAll("_", " ")

                                                                .replace(

                                                                    /\b\w/g,

                                                                    c =>

                                                                        c.toUpperCase()

                                                                )

                                                        }

                                                        :{" "}

                                                        {

                                                            typeof value === "boolean"

                                                                ?

                                                                (

                                                                    value

                                                                        ? "Yes"

                                                                        : "No"

                                                                )

                                                                :

                                                                value

                                                        }

                                                    </li>

                                                )

                                            )

                                        }

                                    </ul>

                                    {

                                        subscription?.plan_id === plan.id

                                            ?

                                            (

                                                <button

                                                    disabled

                                                    className="btn btn-success w-100"

                                                >

                                                    Current Plan

                                                </button>

                                            )

                                            :

                                            (

                                                <button

                                                    className={`btn w-100 ${

                                                        plan.monthly_price >

                                                        currentPlan?.monthly_price

                                                            ?

                                                            "btn-primary"

                                                            :

                                                            "btn-warning"

                                                    }`}

                                                    onClick={() =>

                                                        plan.monthly_price <

                                                            currentPlan?.monthly_price

                                                            ?

                                                            handleDowngrade()

                                                            :

                                                            navigate(

                                                                `/billing/checkout/${plan.id}`

                                                            )

                                                    }

                                                >

                                                    {

                                                        plan.monthly_price >

                                                            currentPlan?.monthly_price

                                                            ?

                                                            "Upgrade"

                                                            :

                                                            "Downgrade"

                                                    }

                                                </button>

                                            )

                                    }

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            <h3 className="fw-bold mt-5 mb-2">

                Payment History

            </h3>

            <p className="text-muted mb-4">

                View all your previous subscription payments.

            </p>

            {

                payments.length === 0

                    ?

                    (

                        <div className="alert alert-info">

                            No payments found.

                        </div>

                    )

                    :

                    (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead>

                                    <tr>

                                        <th>

                                            Amount

                                        </th>

                                        <th>

                                            Status

                                        </th>

                                        <th>

                                            Date

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        payments.map(

                                            payment => (

                                                <tr
                                                    key={payment.id}
                                                >

                                                    <td>

                                                        ₹{payment.amount}

                                                    </td>

                                                    <td>

                                                        <span

                                                            className={`badge ${

                                                                payment.status === "SUCCESS"

                                                                    ?

                                                                    "bg-success"

                                                                    :

                                                                    payment.status === "PENDING"

                                                                        ?

                                                                        "bg-warning text-dark"

                                                                        :

                                                                        "bg-danger"

                                                            }`}

                                                        >

                                                            {payment.status}

                                                        </span>

                                                    </td>

                                                    <td>

                                                        {

                                                            new Date(

                                                                payment.created_at

                                                            ).toLocaleDateString()

                                                        }

                                                    </td>

                                                </tr>

                                            )

                                        )

                                    }

                                </tbody>

                            </table>

                        </div>

                    )

            }

        </div>

    );

}