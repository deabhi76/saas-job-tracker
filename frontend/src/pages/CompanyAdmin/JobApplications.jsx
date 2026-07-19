
import {
    useEffect,
    useState
} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../../context/AuthContext";

import {
    getApplicationsForJob,
    updateApplicationStatus
} from "../../api/jobApi";

export default function JobApplications() {

    const { id } = useParams();

    const navigate = useNavigate();

const { user } = useAuth();

const backPath =
    user?.role === "COMPANY_ADMIN"
        ? "/company-admin/jobs"
        : "/recruiter/jobs";

    const [

        applications,

        setApplications

    ] = useState([]);

    useEffect(() => {

        loadApplications();

    }, []);

    const loadApplications =
    async () => {

        try {

            const response =
                await getApplicationsForJob(id);

            setApplications(
                response.data.data
            );

        } catch (err) {

            console.error(err);

            alert(
                "Failed to load applications"
            );

        }

    };

    const handleStatusChange =
    async (
        applicationId,
        status
    ) => {

        try {

            await updateApplicationStatus(
                applicationId,
                status
            );

            loadApplications();

        } catch (err) {

            console.error(err);

            alert(
                "Update failed"
            );

        }

    };

    const getStatusBadge = (status) => {

        switch (status) {

            case "ACCEPTED":
                return "bg-success";

            case "REJECTED":
                return "bg-danger";

            case "REVIEWED":
                return "bg-info";

            default:
                return "bg-warning text-dark";

        }

    };

    return (

        <div className="container py-4">

            <button
                className="btn btn-outline-secondary mb-4"
                onClick={() => navigate(backPath)}
            >
                ← Back to My Jobs
            </button>

            <h2 className="fw-bold mb-1">
                Job Applications
            </h2>

            <p className="text-muted mb-4">
                Review and manage applications submitted for this job.
            </p>

            {

                applications.length === 0

                ?

                (

                    <div className="card border-0 shadow-sm rounded-4 p-5 text-center">

                        <h5 className="fw-semibold">
                            No applications yet
                        </h5>

                        <p className="text-muted mb-0">
                            Candidate applications will appear here.
                        </p>

                    </div>

                )

                :

                (

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="table-responsive">

                            <table className="table align-middle mb-0">

                                <thead className="table-light">

                                    <tr>

                                        <th className="ps-4">
                                            Candidate
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th className="text-center">
                                            Resume
                                        </th>

                                        <th className="text-center">
                                            Update Status
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        applications.map(application => (

                                            <tr
                                                key={application.id}
                                            >

                                                <td className="ps-4 fw-semibold">

                                                    {application.candidate_name}

                                                </td>

                                                <td>

                                                    {application.candidate_email}

                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${getStatusBadge(application.status)}`}
                                                    >

                                                        {application.status}

                                                    </span>

                                                </td>

                                                <td className="text-center">

                                                    <a
                                                        href={application.resume_url}                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        View
                                                    </a>

                                                </td>

                                                <td className="text-center">

                                                    <select

                                                        className="form-select form-select-sm"

                                                        style={{
                                                            width: "170px",
                                                            margin: "0 auto"
                                                        }}

                                                        value={application.status}

                                                        onChange={(e) =>

                                                            handleStatusChange(

                                                                application.id,

                                                                e.target.value

                                                            )

                                                        }

                                                    >

                                                        <option value="PENDING">
                                                            Pending
                                                        </option>

                                                        <option value="REVIEWED">
                                                            Reviewed
                                                        </option>

                                                        <option value="ACCEPTED">
                                                            Accepted
                                                        </option>

                                                        <option value="REJECTED">
                                                            Rejected
                                                        </option>

                                                    </select>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                )

            }

        </div>

    );

}