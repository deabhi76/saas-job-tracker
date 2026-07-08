import {
    useNavigate
} from "react-router-dom";

export default function PaymentSuccessPage() {

    const navigate =
        useNavigate();

    return (

        <div
            className="container mt-5"
        >

            <h2>
                Payment Successful
            </h2>

            <p>
                Subscription updated successfully.
            </p>

            <button

                className=
                    "btn btn-primary"

                onClick={() =>
                    navigate(
                        "/billing"
                    )
                }

            >

                Back To Billing

            </button>

        </div>
    );
}