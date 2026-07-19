import {
    useSearchParams
} from "react-router-dom";

import {
    useState
} from "react";

import {
    completeGoogleCompanySignup,
    getMe
} from "../../api/authApi";

import {
    setAuthToken
} from "../../api/axios";

import {
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../../context/AuthContext";

export default function CompanyGoogleSignup() {

    const [
        searchParams
    ] = useSearchParams();

    const token =
        searchParams.get("token");

    const [
        companyName,
        setCompanyName
    ] = useState("");

    const navigate =
    useNavigate();

const {

    setUser,

    setAccessToken,

    setIsAuthenticated

} = useAuth();

    const handleSubmit =
async (e) => {

    e.preventDefault();

    try {

        const response =
            await completeGoogleCompanySignup({

                token,

                companyName

            });

        const {

            accessToken

        } =
            response.data;

        setAccessToken(
            accessToken
        );

        setAuthToken(
            accessToken
        );

        const me =
            await getMe();

        setUser(
            me.data.user
        );

        setIsAuthenticated(
            true
        );

        navigate(
            "/company-admin"
        );

    } catch (err) {

        console.error(err);

        alert(
            "Company signup failed"
        );

    }

};

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h3 className="mb-4">

                                Complete Company Registration

                            </h3>

                            <form
                                onSubmit={handleSubmit}
                            >

                                <div className="mb-3">

                                    <label>

                                        Company Name

                                    </label>

                                    <input

                                        className="form-control"

                                        value={companyName}

                                        onChange={(e) =>

                                            setCompanyName(
                                                e.target.value
                                            )

                                        }

                                        required

                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                >

                                    Create Company

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}