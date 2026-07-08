import {
    useState,
    useEffect
} from "react";

import {
    getPlans,
    getSubscription,
    purchaseSubscription,
    cancelSubscription,
    getPayments
} from "../../api/billingApi";

import {
    useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";



export default function BillingPage() {

    const navigate=useNavigate();

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

const { user } = useAuth();

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

    const response =
        await getPayments();
     console.log(
        "PAYMENTS:",
        response.data.data
    );
    setPayments(
        response.data.data
    );
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

        console.log(response.data);

        console.log(
            response.data.data
        );

        setSubscription(
            response.data.data
        );

    } catch (err) {

        console.error(err);
    }
};

const buyPlan =
async (
    planId
) => {

    try {

        await purchaseSubscription(
            planId
        );

        alert(
            "Plan purchased"
        );

        loadSubscription();

    } catch (err) {

        console.error(err);

        alert(
            "Purchase failed"
        );
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

        console.error(
            err.response?.data
        );

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

    console.log("Plans:", plans);

console.log("Subscription:", subscription);

// const currentPlan =
//     plans.find(
//         p => p.id === subscription?.plan_id
//     );

console.log("Current Plan:", currentPlan);

    return (
        <div className="container mt-4">

    <div className="d-flex justify-content-between align-items-center mb-4">

    <button
        className="btn btn-outline-secondary"
        onClick={handleBack}
    >
        ← Back
    </button>

    <h2 className="mb-0">
        Subscription Plans
    </h2>

    <div></div>

</div>

  
    <div className="row">

        {plans.map(plan => (

            <div
                key={plan.id}
                className="col-md-4"
            >

                <div className="card p-3 mb-3">

                    <h4>
                        {plan.name}
                    </h4>

                    <p>

                        Price:

                        {" "}

                        ₹{plan.monthly_price}

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

    {" "}

    {String(value)}

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
        className="btn btn-success"
    >
        Current Plan
    </button>
)

:

(
    <button

        className={
            plan.monthly_price >
            currentPlan?.monthly_price

                ? "btn btn-primary"

                : "btn btn-warning"
        }

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

        ))}

    </div>

    <h3 className="mt-5">
    Payment History
</h3>

<table className="table">

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
                        {payment.status}
                    </td>

                    <td>

                        {
                            new Date(
                                payment.created_at
                            )
                            .toLocaleDateString()
                        }

                    </td>

                </tr>
            ))
        }

    </tbody>

</table>

</div>
    );
}