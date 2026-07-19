

import {
    useState,
    useEffect
} from "react";

import {
    getMyApplications
} from "../../api/jobApi";

export default function MyApplications() {

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
                await getMyApplications();

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

    const getStatusBadge = (status) => {

        switch (status) {

            case "ACCEPTED":
                return "bg-success";

            case "REJECTED":
                return "bg-danger";

            case "INTERVIEW":
                return "bg-info";

            default:
                return "bg-warning text-dark";

        }

    };

    return (

        <div className="container py-4">

            <h2 className="fw-bold mb-1">
                My Applications
            </h2>

            <p className="text-muted mb-4">
                Track all the jobs you've applied for.
            </p>

            {

                applications.length === 0

                ?

                (

                    <div className="card border-0 shadow-sm rounded-4 p-5 text-center">

                        <h5 className="fw-semibold">
                            No applications found
                        </h5>

                        <p className="text-muted mb-0">
                            Your submitted applications will appear here.
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
                                            Job
                                        </th>

                                        <th>
                                            Company
                                        </th>

                                        <th>
                                            Applied On
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th className="text-center">
                                            Resume
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        applications.map(application => (

                                            <tr key={application.id}>

                                                <td className="ps-4 fw-semibold">

                                                    {application.title}

                                                </td>

                                                <td>

                                                    {application.company_name}

                                                </td>

                                                <td>

                                                        {new Date(application.created_at).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric"
                                                            }
                                                        )}

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

                                                        href={application.resume_url}

                                                        target="_blank"

                                                        rel="noreferrer"

                                                        className="btn btn-sm btn-outline-primary"

                                                    >

                                                        View Resume

                                                    </a>

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