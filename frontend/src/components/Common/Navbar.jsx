
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bell, BriefcaseBusiness, LogOut } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { logout } from "../../api/authApi";
import { setAuthToken } from "../../api/axios";
// import { getUnreadCount } from "../../api/notificationApi";

export default function Navbar({ title }) {
    const navigate = useNavigate();

    const {
        user,
        setUser,
        setAccessToken,
        setIsAuthenticated,
        setIsLoggingOut,
        unreadCount,
        loadUnreadCount
    } = useAuth();

    // const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        loadUnreadCount();
    }, []);

    // const loadUnreadCount = async () => {
    //     try {
    //         const response = await getUnreadCount();
    //         setUnreadCount(response.data.count);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const handleLogout = async () => {
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

    const notificationPath =
        user?.role === "CANDIDATE"
            ? "/candidate/notifications"
            : user?.role === "RECRUITER"
            ? "/recruiter/notifications"
            : "/company-admin/notifications";

    const initials = user?.name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    const formatRole = (role) => {
        switch (role) {
            case "COMPANY_ADMIN":
                return "Company Admin";
            case "RECRUITER":
                return "Recruiter";
            case "CANDIDATE":
                return "Candidate";
            case "SUPER_ADMIN":
                return "Super Admin";
            default:
                return role;
        }
    };

    return (
        <nav className="navbar navbar-expand-lg border-bottom shadow-sm px-4 py-3"
            style={{
                backgroundColor:"#ccd2dc"
            }}
        >

            {/* Left */}

            <div className="d-flex align-items-center">

                <BriefcaseBusiness
                    size={28}
                    className="text-primary me-2"
                />

                <div>

                    <h5 className="mb-0 fw-bold">
                        SaaS Job Tracker
                    </h5>

                    <small className="text-muted">
                        {title}
                    </small>

                </div>

            </div>

            {/* Right */}

            <div className="ms-auto d-flex align-items-center">

                {/* Notifications */}

                <button
                    className="btn btn-light position-relative me-4"
                    style={{
                        backgroundColor:"#bdbec2"
                    }}
                    onClick={() => navigate(notificationPath)}
                >
                    <Bell size={20} />

                    {unreadCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {unreadCount}
                        </span>
                    )}
                </button>

                {/* Avatar */}

                <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold me-3"
                    style={{
                        width: 42,
                        height: 42,
                        fontSize: "0.9rem"
                    }}
                >
                    {initials}
                </div>

                {/* User */}

                <div className="me-4">

                    <div className="fw-semibold">
                        {user?.name}
                    </div>

                    <small className="text-muted">

                        {user?.role === "CANDIDATE"
                            ? "Candidate"
                            : `${formatRole(user?.role)} • ${user?.companyName}`}

                    </small>

                </div>

                {/* Logout */}

                <button
                    className="btn btn-outline-danger d-flex align-items-center"
                    onClick={handleLogout}
                >
                    <LogOut size={18} className="me-2" />
                    Logout
                </button>

            </div>

        </nav>
    );
}