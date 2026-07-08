import {
  useState,
  useEffect
}
from "react";

import { Link }
from "react-router-dom";

import api
from "../../api/axios";

export default function CandidateJobs() {

  const [
    jobs,
    setJobs
  ] = useState([]);

  useEffect(() => {

    loadJobs();

  }, []);

  const loadJobs =
  async () => {

    try {

      const response =
        await api.get(
          "/jobs"
        );

      setJobs(
        response.data.data
      );

    } catch (err) {

      console.error(err);
    }
  };

  return (

    <div>

      <h2>
        Available Jobs
      </h2>

      <div
        className="row"
      >

        {jobs.map(
          (job) => (

            <div
              key={job.id}
              className="col-md-6 mb-3"
            >

              <div
                className="card"
              >

                <div
                  className="card-body"
                >

                  <h5>
                    {job.title}
                  </h5>

                  <h5>
                    {job.company_name}
                  </h5>

                  <p>
                    {job.location}
                  </p>

                  <p>
                    {
                      job.employment_type
                    }
                  </p>

                  <Link
                    to={`/jobs/${job.id}`}
                    className="btn btn-primary"
                  >
                    View
                  </Link>

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}