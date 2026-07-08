import {
    useState,
    useEffect
}
from "react";

import {
    getMyApplications
}
from "../../api/jobApi";

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

    return (

        <div
            className="container mt-4"
        >

            <h2>
                My Applications
            </h2>

            <table
                className="table"
            >

                <thead>

                    <tr>

                        <th>
                            Job
                        </th>

                        <th>
                            Company Name
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Resume
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
                                        application.title
                                    }
                                </td>

                                <td>
                                    {
                                        application.company_name
                                    }
                                </td>

                                <td>
                                    {
                                        application.status
                                    }
                                </td>

                                <td>

                                    <a
                                        href={`http://localhost:3002/${application.resume_url}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View Resume
                                    </a>

                                </td>

                                {/* <td>
                                    {application.resume_url}
                                </td> */}

                            </tr>

                        )
                    )}

                </tbody>

            </table>

        </div>
    );
}