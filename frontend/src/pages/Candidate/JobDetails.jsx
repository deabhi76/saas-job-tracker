

import {
    useState,
    useEffect
} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import {
    getJobById,
    applyToJob,
    uploadResume,
    hasApplied
} from "../../api/jobApi";

import {
    useAuth
} from "../../context/AuthContext";

export default function CandidateJobDetails() {

    const {
        isAuthenticated,
        user
    } = useAuth();

    const navigate = useNavigate();

    const { id } = useParams();

    const [
        job,
        setJob
    ] = useState(null);

    const [
        resumeFile,
        setResumeFile
    ] = useState(null);

    const [
        applied,
        setApplied
    ] = useState(false);

    useEffect(() => {

        loadJob();

        if (isAuthenticated) {

            checkApplied();

        }

    }, []);

    const loadJob = async () => {

        try {

            const response =
                await getJobById(id);

            setJob(
                response.data.data
            );

        } catch (err) {

            console.error(err);

            alert("Failed to load job");

        }

    };

    const checkApplied = async () => {

        try {

            const response =
                await hasApplied(id);

            setApplied(
                response.data.data.applied
            );

        } catch (err) {

            console.error(err);

        }

    };

    const handleApply = async () => {

        if (!isAuthenticated) {

            navigate("/login");

            return;

        }

        if (!resumeFile) {

            alert("Please upload a resume");

            return;

        }

        try {

            const formData =
                new FormData();

            formData.append(
                "resume",
                resumeFile
            );

            const uploadResponse =
                await uploadResume(formData);

            const resumeUrl =
                uploadResponse.data.resumeUrl;

            await applyToJob(
                id,
                {
                    resumeUrl
                }
            );

            alert(
                "Application submitted"
            );

            setApplied(true);

            if (
                user.role === "CANDIDATE"
            ) {

                navigate(
                    "/candidate/my-applications"
                );

            } else if (
                user.role === "RECRUITER"
            ) {

                navigate(
                    "/recruiter/my-applications"
                );

            }

        } catch (err) {

            console.error(err);

            alert(
                "Application failed"
            );

        }

    };

    if (!job) {

        return (

            <div className="container py-5 text-center">

                <div className="spinner-border text-primary" />

            </div>

        );

    }

    const isOwnCompanyJob =

        user?.role === "RECRUITER" &&

        Number(user.companyId) === Number(job.company_id);



        const backPath =
    user?.role === "CANDIDATE"
        ? "/candidate/jobs"
        : user?.role === "RECRUITER"
        ? "/recruiter/browse-jobs"
        : "/jobs";

    return (

        <div className="container py-4">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    {/* Back */}

                    <button

                        className="btn btn-link text-decoration-none ps-0 mb-4"

                        onClick={() => navigate(backPath)}

                    >

                        ← Back to Available Jobs

                    </button>

                    {/* Header */}

                    <div className="mb-4">

                        <div className="d-flex align-items-center mb-3">

                            <h2 className="fw-bold mb-0">

                                {job.title}

                            </h2>

                            <span className="mx-2 text-muted">

                                •

                            </span>

                            <h4 className="text-muted mb-0">

                                {job.company_name}

                            </h4>

                        </div>

                        <span className="badge bg-secondary me-2">

                            {job.location}

                        </span>

                        <span className="badge bg-primary">

                            {job.employment_type}

                        </span>

                    </div>

                    {/* Description */}

                    <div className="card border-0 shadow-sm rounded-4 mb-4">

                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-3">

                                Job Description

                            </h5>

                            <p className="mb-0">

                                {job.description}

                            </p>

                        </div>

                    </div>

                    {/* Details */}

                    <div className="card border-0 shadow-sm rounded-4 mb-4">

                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-3">

                                Job Details

                            </h5>

                            <div className="row">

                                <div className="col-md-6">

                                    <p>

                                        <strong>

                                            Salary

                                        </strong>

                                    </p>

                                    <p>

                                        ₹{job.salary_min}

                                        {" - "}

                                        ₹{job.salary_max}

                                    </p>

                                </div>

                                <div className="col-md-6">

                                    <p>

                                        <strong>

                                            Employment Type

                                        </strong>

                                    </p>

                                    <p>

                                        {job.employment_type}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Apply */}

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-3">

                                Apply for this Job

                            </h5>

                            {

                                isAuthenticated

                                    ?

                                    <>

                                        <input

                                            type="file"

                                            accept=".pdf"

                                            className="form-control"

                                            onChange={(e) =>

                                                setResumeFile(

                                                    e.target.files[0]

                                                )

                                            }

                                        />

                                        {

                                            isOwnCompanyJob

                                                ?

                                                <div className="d-flex justify-content-center mt-3">

    <button
        className="btn btn-outline-secondary px-4"
        disabled
    >
        Posted by Your Company
    </button>

</div>

                                                :

                                                applied

                                                    ?

                                                    <div className="d-flex justify-content-center mt-3">

    <button
        className="btn btn-secondary px-4"
        disabled
    >
        Already Applied
    </button>

</div>

                                                    :

                                                    <div className="d-flex justify-content-center mt-3">

    <button
        className="btn btn-success px-4"
        onClick={handleApply}
    >
        Apply Now
    </button>

</div>

                                        }

                                    </>

                                    :

                                    <button

                                        className="btn btn-primary w-100"

                                        onClick={() =>

                                            navigate("/login")

                                        }

                                    >

                                        Login to Apply

                                    </button>

                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}