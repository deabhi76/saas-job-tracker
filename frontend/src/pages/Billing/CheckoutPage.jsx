import {
    useParams,
    useNavigate
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import {
    getPlans,
    purchaseSubscription
} from "../../api/billingApi";

export default function CheckoutPage() {

    const { planId } =
        useParams();

    const navigate =
        useNavigate();

    const [
        plan,
        setPlan
    ] = useState(null);

    useEffect(() => {

        loadPlan();

    }, []);

    const loadPlan =
    async () => {

        try {

            const response =
                await getPlans();

            const selectedPlan =
                response.data.data.find(

                    p =>

                    p.id === planId

                );

            setPlan(
                selectedPlan
            );

        } catch (err) {

            console.error(err);

            alert(
                "Failed to load plan."
            );

        }

    };

    const handlePayment =
    async () => {

        try {

            await purchaseSubscription(
                plan.id
            );

            navigate(
                "/billing/success"
            );

        } catch (err) {

            console.error(err);

            alert(
                "Payment failed"
            );

        }

    };

    if (!plan) {

        return (

            <div className="container py-5 text-center">

                <div className="spinner-border text-primary" />

            </div>

        );

    }

    return (

        <div className="container py-4">

            <button
                className="btn btn-outline-secondary mb-4"
                onClick={() =>
                    navigate("/billing")
                }
            >
                ← Back to Billing
            </button>

            <h2 className="fw-bold mb-1">

                Checkout

            </h2>

            <p className="text-muted mb-4">

                Review your subscription before confirming payment.

            </p>

            <div className="row justify-content-center">

                <div className="col-lg-7">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-5">

                            <h3 className="fw-bold">

                                {plan.name}

                            </h3>

                            <h4 className="text-primary mb-4">

                                ₹{plan.monthly_price}

                                <small className="text-muted fs-6">

                                    /month

                                </small>

                            </h4>

                            <ul className="list-unstyled mb-4">

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

                                                            c => c.toUpperCase()

                                                        )

                                                }

                                                {

                                                    typeof value !== "boolean" && (

                                                        <>

                                                            {": "}

                                                            {value}

                                                        </>

                                                    )

                                                }

                                            </li>

                                        )

                                    )

                                }

                            </ul>

                            <div className="d-flex gap-3">

                                <button

                                    className="btn btn-success flex-fill"

                                    onClick={handlePayment}

                                >

                                    Pay ₹{plan.monthly_price}

                                </button>

                                <button

                                    className="btn btn-outline-secondary flex-fill"

                                    onClick={() =>
                                        navigate("/billing")
                                    }

                                >

                                    Cancel

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}