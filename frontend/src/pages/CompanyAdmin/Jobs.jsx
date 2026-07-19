
import { Link } from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../../context/AuthContext";

import {
    getMyJobs,
    deleteJob
} from "../../api/jobApi";

export default function Jobs() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [

        jobs,

        setJobs

    ] = useState([]);

    useEffect(() => {

        loadJobs();

    }, []);

    const loadJobs = async () => {

        try {

            const response =
                await getMyJobs();

            setJobs(
                response.data.data
            );

        } catch (err) {

            console.error(err);

            alert(
                "Failed to load jobs"
            );

        }

    };

    const basePath =

        user?.role === "COMPANY_ADMIN"

            ? "/company-admin"

            : "/recruiter";

    const handleDelete =
    async (jobId) => {

        const confirmed =
            window.confirm(
                "Delete this job?"
            );

        if (!confirmed)
            return;

        try {

            await deleteJob(jobId);

            loadJobs();

        } catch (err) {

            console.error(err);

            alert(
                "Delete failed"
            );

        }

    };

    return (

        <div className="container py-4">

            <h2 className="fw-bold mb-1">
                My Jobs
            </h2>

            <p className="text-muted mb-4">
                Manage all jobs posted by your company.
            </p>

            {

                jobs.length === 0

                ?

                (

                    <div className="card border-0 shadow-sm rounded-4 p-5 text-center">

                        <h5 className="fw-semibold">
                            No jobs posted yet
                        </h5>

                        <p className="text-muted mb-0">
                            Create your first job to start hiring.
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
                                            Title
                                        </th>

                                        <th>
                                            Company
                                        </th>

                                        <th>
                                            Location
                                        </th>

                                        <th>
                                            Type
                                        </th>

                                        <th className="text-center">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        jobs.map(job => (

                                            <tr
                                                key={job.id}
                                            >

                                                <td className="ps-4 fw-semibold">
                                                    {job.title}
                                                </td>

                                                <td>
                                                    {job.company_name}
                                                </td>

                                                <td>
                                                    {job.location}
                                                </td>

                                                <td>

                                                    <span className="badge bg-primary">

                                                        {job.employment_type}

                                                    </span>

                                                </td>

                                                <td className="text-center">

                                                    <Link
                                                        to={`${basePath}/jobs/${job.id}/edit`}
                                                        className="btn btn-warning btn-sm me-2"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        className="btn btn-info btn-sm me-2"
                                                        onClick={() =>
                                                            navigate(
                                                                `${basePath}/jobs/${job.id}/applications`
                                                            )
                                                        }
                                                    >
                                                        Applications
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            handleDelete(job.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

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