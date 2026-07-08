import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    getApplicationsForJob,
    updateApplicationStatus
} from "../../api/jobApi";

export default function JobApplications() {

    const { id } =
        useParams();

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
            await getApplicationsForJob(
                id
            );

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

return (

<div className="container mt-4">

    <h2>
        Applications
    </h2>

    <table className="table">

        <thead>

            <tr>

                <th>
                    Candidate
                </th>

                <th>
                    Email
                </th>

                <th>
                    Status
                </th>

                <th>
                    Resume
                </th>

                <th>
                    Update
                </th>

            </tr>

        </thead>

        <tbody>

            {applications.map(
                (application) => (

                    <tr
                        key={
                            application.id
                        }
                    >

                        <td>
                            {
                                application.candidate_name
                            }
                        </td>

                        <td>
                            {
                                application.candidate_email
                            }
                        </td>

                        <td>
                            {
                                application.status
                            }
                        </td>

                        <td>

                            <a
                                href={
                                    `http://localhost:3002/${application.resume_url}`
                                }
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Resume
                            </a>

                        </td>

                        <td>

                            <select

                                value={
                                    application.status
                                }

                                onChange={
                                    (e) =>
                                        handleStatusChange(

                                            application.id,

                                            e.target.value

                                        )
                                }

                            >

                                <option value="PENDING">
                                    PENDING
                                </option>

                                <option value="REVIEWED">
                                    REVIEWED
                                </option>

                                <option value="ACCEPTED">
                                    ACCEPTED
                                </option>

                                <option value="REJECTED">
                                    REJECTED
                                </option>

                            </select>

                        </td>

                    </tr>

                )
            )}

        </tbody>

    </table>

</div>

);

}