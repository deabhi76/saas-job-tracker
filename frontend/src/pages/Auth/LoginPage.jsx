import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

import { login } from "../../api/authApi";
import { setAuthToken } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {

    const navigate = useNavigate();

    const location = useLocation();

    const from =
        location.state?.from?.pathname;

    const {
        setUser,
        setAccessToken,
        setIsAuthenticated
    } = useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response =
                await login({
                    email,
                    password
                });

            const {
                accessToken,
                user
            } = response.data;

            setAccessToken(accessToken);

            setAuthToken(accessToken);

            setUser(user);

            setIsAuthenticated(true);

            if (from) {

                navigate(from, {
                    replace: true
                });

            } else {

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

                    case "SUPER_ADMIN":

                        navigate("/admin/dashboard");

                        break;

                    default:

                        navigate("/");

                }

            }

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Login failed"
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

                                <LogIn
                                    size={52}
                                    className="text-primary mb-3"
                                />

                                <h2 className="fw-bold">
                                    Welcome Back
                                </h2>

                                <p className="text-muted mb-0">

                                    Sign in to continue to
                                    SaaS Job Tracker.

                                </p>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                            >

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                >
                                    Login
                                </button>

                            </form>

                            <div className="text-center my-4 text-muted">

                                OR

                            </div>

                            <button
                                type="button"
                                className="btn btn-outline-danger w-100 mb-3"
                                onClick={() =>{

                                    window.location.href =`${import.meta.env.VITE_API_URL}/auth/google/candidate`;
                                }}
                            >

                                Continue as Candidate with Google

                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-success w-100"
                                onClick={() =>{

                                    window.location.href =`${import.meta.env.VITE_API_URL}/auth/google/company`;

                                }}
                            >

                                Continue as Company with Google

                            </button>

                            <div className="text-center mt-4">

                                <small className="text-muted">

                                    Don't have an account?

                                    {" "}

                                    <Link
                                        to="/signup"
                                        className="text-decoration-none"
                                    >
                                        Create one
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