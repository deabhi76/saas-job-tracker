import { useNavigate } from "react-router-dom";

import { useAuth }
from "../../context/AuthContext";

import { logout }
from "../../api/authApi";

import { setAuthToken }
from "../../api/axios";

export default function Navbar({
    title
}) {

    const navigate =
        useNavigate();

    const {

        user,

        setUser,

        setAccessToken,

        setIsAuthenticated,

        setIsLoggingOut

    } = useAuth();

    const handleLogout =
    async () => {

        try {

            setIsLoggingOut(true);

            await logout();

        } catch (err) {

            console.error(err);

        }

        setUser(null);

        setAccessToken(null);

        setIsAuthenticated(false);

        setAuthToken(null);

        navigate("/");
    };

    return (

        <nav className="navbar navbar-dark bg-dark px-4">

            <span className="navbar-brand">

                {title}

            </span>

            <div className="d-flex align-items-center">

                <span className="text-white me-3">

                    {user?.name}

                </span>

                <button

                    className="btn btn-outline-light btn-sm"

                    onClick={handleLogout}

                >

                    Logout

                </button>

            </div>

        </nav>

    );

}