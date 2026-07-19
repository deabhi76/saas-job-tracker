import { useEffect } from "react";

import {
    useNavigate,
    useSearchParams
} from "react-router-dom";

import {
    useAuth
} from "../../context/AuthContext";

import {
    setAuthToken
} from "../../api/axios";

import {
    getMe
} from "../../api/authApi";

export default function OAuthSuccess() {

    const navigate =
        useNavigate();

    const [
        searchParams
    ] =
        useSearchParams();

    const {

        setUser,

        setAccessToken,

        setIsAuthenticated

    } = useAuth();

    useEffect(() => {

        const login =
        async () => {

            try {

                const accessToken =
                    searchParams.get(
                        "accessToken"
                    );

                if (!accessToken) {

                    navigate("/login");

                    return;
                }

                setAccessToken(
                    accessToken
                );

                setAuthToken(
                    accessToken
                );

                const response =
                    await getMe();

                const user =
                    response.data.user;

                setUser(user);

                setIsAuthenticated(
                    true
                );

                switch (user.role) {

                    case "CANDIDATE":

                        navigate(
                            "/candidate"
                        );

                        break;

                    case "COMPANY_ADMIN":

                        navigate(
                            "/company-admin"
                        );

                        break;

                    case "RECRUITER":

                        navigate(
                            "/recruiter"
                        );

                        break;

                    default:

                        navigate("/");
                }

            } catch (err) {

                console.error(err);

                navigate("/login");
            }

        };

        login();

    }, []);

    return (

        <div className="container mt-5 text-center">

            <h3>

                Signing you in...

            </h3>

        </div>

    );

}