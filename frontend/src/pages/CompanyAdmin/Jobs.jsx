import { Link }
from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
  getMyJobs,
  deleteJob
} from "../../api/jobApi";

export default function Jobs() {

  const navigate =
    useNavigate();

  const [
    jobs,
    setJobs
  ] = useState([]);

  const loadJobs =
  async () => {

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

  useEffect(() => {

    loadJobs();

  }, []);

  const handleDelete =
  async (jobId) => {

    const confirmed =
      window.confirm(
        "Delete this job?"
      );

    if (!confirmed)
      return;

    try {

      await deleteJob(
        jobId
      );

      loadJobs();

    } catch (err) {

      console.error(err);

      alert(
        "Delete failed"
      );
    }
  };

  return (

    <div>

      <h2>
        My Jobs
      </h2>

      <table
        className="table"
      >

        <thead>

          <tr>

            <th>
              Title
            </th>

            <th>
              Location
            </th>

            <th>
              Type
            </th>

            <th>
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {jobs.map(
            (job) => (

              <tr
                key={job.id}
              >

                <td>
                  {job.title}
                </td>

                 <td>
                  {job.company_name}
                </td>

                <td>
                  {job.location}
                </td>

                <td>
                  {
                    job.employment_type
                  }
                </td>

                <td>

                  <Link
                    to={`/company-admin/jobs/${job.id}/edit`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() =>
                        navigate(
                            `/company/jobs/${job.id}/applications`
                        )
                    }
                >
                    Applications
                </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(
                        job.id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}