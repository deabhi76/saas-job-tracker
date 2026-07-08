import {
    useEffect,
    useState
}
from "react";

import {
    getRecruiters
}
from "../../api/recruiterApi";

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

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <h3>
                Loading...
            </h3>
        );

    }

    return (

        <div>

            <h2 className="mb-4">
                Recruiters
            </h2>

            <table className="table table-striped">

                <thead>

                    <tr>

                        <th>
                            Name
                        </th>

                        <th>
                            Email
                        </th>

                        {/* <th>
                            Role
                        </th> */}

                    </tr>

                </thead>

                <tbody>

                    {

                        recruiters.map(
                            recruiter => (

                                <tr
                                    key={recruiter.user_id}
                                >

                                    <td>
                                        {recruiter.name}
                                    </td>

                                    <td>
                                        {recruiter.email}
                                    </td>

                                    {/* <td>
                                        {recruiter.role}
                                    </td> */}

                                </tr>

                            )
                        )

                    }

                </tbody>

            </table>

        </div>

    );

}