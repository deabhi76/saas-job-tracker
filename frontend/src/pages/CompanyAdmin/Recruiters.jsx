import {
    useEffect,
    useState
} from "react";

import {
    getRecruiters
} from "../../api/recruiterApi";

export default function Recruiters() {

    const [
        recruiters,
        setRecruiters
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(true);

    useEffect(() => {

        fetchRecruiters();

    }, []);

    const fetchRecruiters =
    async () => {

        try {

            const response =
                await getRecruiters();

            setRecruiters(
                response.data.data
            );

        } catch (err) {

            console.error(err);

            alert(
                "Failed to load recruiters"
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

            <h2 className="fw-bold mb-1">
                Recruiters
            </h2>

            <p className="text-muted mb-4">
                Manage all recruiters associated with your company.
            </p>

            {

                recruiters.length === 0

                ?

                (

                    <div className="card border-0 shadow-sm rounded-4 p-5 text-center">

                        <h5 className="fw-semibold">
                            No recruiters found
                        </h5>

                        <p className="text-muted mb-0">
                            Recruiters you create will appear here.
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
                                            Name
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Role
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        recruiters.map(recruiter => (

                                            <tr
                                                key={recruiter.user_id}
                                            >

                                                <td className="ps-4 fw-semibold">

                                                    {recruiter.name}

                                                </td>

                                                <td>

                                                    {recruiter.email}

                                                </td>

                                                <td>

                                                    <span className="badge bg-primary">

                                                        {recruiter.role.replace("_", " ")}

                                                    </span>

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