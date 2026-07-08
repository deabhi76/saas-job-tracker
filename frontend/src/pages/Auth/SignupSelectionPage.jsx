import { Link } from "react-router-dom";

export default function SignupSelectionPage() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">
        Choose Account Type
      </h2>

      <div className="row justify-content-center">

        <div className="col-md-4 mb-3">

          <div className="card">
            <div className="card-body text-center">

              <h4>Candidate</h4>

              <p>
                Search and apply for jobs.
              </p>

              <Link
                to="/signup/candidate"
                className="btn btn-primary"
              >
                Continue
              </Link>

            </div>
          </div>

        </div>

        <div className="col-md-4">

          <div className="card">
            <div className="card-body text-center">

              <h4>Company</h4>

              <p>
                Hire and manage recruiters.
              </p>

              <Link
                to="/signup/company"
                className="btn btn-success"
              >
                Continue
              </Link>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}