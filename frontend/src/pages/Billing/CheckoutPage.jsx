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

    const [plan, setPlan] =
        useState(null);

    useEffect(() => {

        loadPlan();

    }, []);

    const loadPlan =
    async () => {

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

        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-4">

    <h2>
        Checkout
    </h2>

    <div className="card p-4">

        <h3>
            {plan.name}
        </h3>

        <p>

            ₹{plan.monthly_price}
            / month

        </p>

        <ul>

        {

            Object.entries(
                plan.features
            ).map(

                ([key,value]) => (

                    <li key={key}>

                        {key}
                        :
                        {String(value)}

                    </li>

                )

            )

        }

        </ul>

    </div>

    <button

    className=
        "btn btn-success me-2"

    onClick={
        handlePayment
    }

>

    Pay ₹{plan.monthly_price}

</button>

<button

    className=
        "btn btn-secondary"

    onClick={() =>
        navigate(
            "/billing"
        )
    }

>

    Cancel

</button>

</div>
    );
}