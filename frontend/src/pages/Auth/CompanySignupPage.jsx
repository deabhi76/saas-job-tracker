import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Building2 } from "lucide-react";

import { companySignup } from "../../api/authApi";
import { setAuthToken } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function CompanySignupPage() {

    const {
        setUser,
        setAccessToken,
        setIsAuthenticated
    } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        companyName: "",

        name: "",

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response =
                await companySignup(formData);

            const {

                accessToken,

                user

            } = response.data;

            setAccessToken(accessToken);

            setAuthToken(accessToken);

            setUser(user);

            setIsAuthenticated(true);

            alert("Signup successful");

            navigate("/company-admin");

        } catch (err) {

            console.error(err);

            alert(

                err.response?.data?.message ||

                err.message ||

                "Signup failed"

            );

        }

    };

    return (

        <div className="container py-5">

          <div className="mb-4">

    <Link
        to="/"
        className="btn btn-outline-secondary"
    >
        ← Back to Home
    </Link>

</div>

            <div className="row justify-content-center">

                <div className="col-lg-6 col-md-8">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-5">

                            <div className="text-center mb-4">

                                <Building2
                                    size={52}
                                    className="text-success mb-3"
                                />

                                <h2 className="fw-bold">
                                    Company Signup
                                </h2>

                                <p className="text-muted mb-0">

                                    Create your company account
                                    and start managing recruitment.

                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Company Name
                                    </label>

                                    <input
                                        type="text"
                                        name="companyName"
                                        className="form-control"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-success w-100"
                                    type="submit"
                                >
                                    Create Company Account
                                </button>

                            </form>

                            <div className="text-center my-4 text-muted">

                                OR

                            </div>

                            <button
                                type="button"
                                className="btn btn-outline-danger w-100"
                                onClick={() =>

                                    {
                                        window.location.href =`${import.meta.env.VITE_API_URL}/auth/google/company`;
                                    }

                                }
                            >
                                Continue with Google
                            </button>

                            <div className="text-center mt-4">

                                <small className="text-muted">

                                    Already have an account?

                                    {" "}

                                    <Link
                                        to="/login"
                                        className="text-decoration-none"
                                    >
                                        Login
                                    </Link>

                                </small>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}