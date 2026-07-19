import {
    useEffect,
    useState
} from "react";

import {
    getNotifications,
    markAsRead
} from "../../api/notificationApi";

import {
    useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Notifications() {

    const [
        notifications,
        setNotifications
    ] = useState([]);


    const {
        user,
    loadUnreadCount

} = useAuth();

const navigate = useNavigate();

const backPath =
    user?.role === "CANDIDATE"
        ? "/candidate"
        : user?.role === "RECRUITER"
        ? "/recruiter"
        : "/company-admin";


    const [
        loading,
        setLoading
    ] = useState(true);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications =
    async () => {

        try {

            const response =
                await getNotifications();

            const notificationData =
                response.data.data;

            await Promise.all(

                notificationData

                    .filter(
                        notification =>
                            !notification.is_read
                    )

                    .map(
                        notification =>
                            markAsRead(
                                notification.id
                            )
                    )

            );

            await loadUnreadCount();

            setNotifications(

                notificationData

            );

        } catch (err) {

            console.error(err);

            alert(
                "Failed to load notifications"
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

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
                onClick={() => navigate(backPath)}
            >
                ← Back to Dashboard
            </button>

            <h2 className="fw-bold mb-1">
                Notifications
            </h2>

            <p className="text-muted mb-4">
                Stay updated with the latest activity on your account.
            </p>

            {

                notifications.length === 0

                ?

                (

                    <div className="card border-0 shadow-sm rounded-4 p-5 text-center">

                        <h5 className="fw-semibold">
                            No notifications yet
                        </h5>

                        <p className="text-muted mb-0">
                            You'll see important updates here.
                        </p>

                    </div>

                )

                :

                notifications.map(notification => (

                    <div
                        key={notification.id}
                        className={`card border-0 shadow-sm rounded-4 mb-3 `}
                        style={{
                            backgroundColor: !notification.is_read
                                ? "#eef1f4"
                                : "#ffffff"
                        }}
                    >

                        <div className="card-body p-4">

                            <h5
                                className={`mb-2 ${
                                    !notification.is_read
                                        ? "fw-bold"
                                        : "fw-semibold"
                                }`}
                            >
                                {notification.title}
                            </h5>

                            <p className="mb-3">
                                {notification.message}
                            </p>

                            <small className="text-muted">

                                {

                                    new Date(
                                        notification.created_at
                                    ).toLocaleString()

                                }

                            </small>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}