import {
    useState,
    useEffect
}
from "react";

import {
    useParams,
    useNavigate
}
from "react-router-dom";

import {
    getJobById,
    applyToJob,
    uploadResume,
    hasApplied
}
from "../../api/jobApi";

import {
    useAuth
} from "../../context/AuthContext";



export default function CandidateJobDetails() {

    const {
        isAuthenticated,
        user
    } = useAuth();

    const navigate =
        useNavigate();

    const { id } =
        useParams();

   
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

    const loadJob =
    async () => {

        try {

            const response =
                await getJobById(id);

            setJob(
                response.data.data
            );

        } catch (err) {

            console.error(err);

            alert(
                "Failed to load job"
            );
        }
    };

    const checkApplied =
async () => {

    try {

        const response =
            await hasApplied(id);

            console.log("HAS APPLIED RESPONSE:", response.data);

        setApplied(

            response
            .data
            .data
            .applied

        );

    } catch (err) {

        console.error(err);

    }

};

    const handleApply =
async () => {

    if (!isAuthenticated) {

    navigate("/login");

    return;
}

    if (!resumeFile) {

        alert(
            "Please upload a resume"
        );

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
    await uploadResume(
        formData
    );

console.log(
    "UPLOAD RESPONSE:",
    uploadResponse.data
);

const resumeUrl =
    uploadResponse
        .data
        .resumeUrl;

console.log(
    "RESUME URL:",
    resumeUrl
);

        console.log(
    "APPLY PAYLOAD:",
    {
        resumeUrl
    }
);

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
        navigate(
            "/candidate/my-applications"
        );

    } catch (err) {

        console.error(err);

        console.log(
        "BACKEND ERROR:",
        err.response?.data
    );

        alert(
            "Application failed"
        );
    }
};

    if (!job) {

        return (
            <p>
                Loading...
            </p>
        );
    }

//     const handleApply =
// async () => {

//     try {

//         await applyToJob(
//             id
//         );

//         alert(
//             "Application submitted"
//         );

//     } catch (err) {

//         console.error(err);

//         alert(
//             err.response?.data?.message
//             || "Failed to apply"
//         );
//     }
// };

    const isOwnCompanyJob =
    user?.role === "RECRUITER" &&
    Number(user.companyId) === Number(job.company_id);

console.log("Applied:", applied);

    return (

        <div
            className="container mt-4"
        >

            <h2>
                {job.title}
            </h2>

            <h2>
                {job.company_name}
            </h2>

            <p>

                <strong>
                    Description:
                </strong>

                {" "}

                {job.description}

            </p>

            <p>

                <strong>
                    Location:
                </strong>

                {" "}

                {job.location}

            </p>

            <p>

                <strong>
                    Salary:
                </strong>

                {" "}

                {job.salary_min}

                {" - "}

                {job.salary_max}

            </p>

            <p>

                <strong>
                    Employment Type:
                </strong>

                {" "}

                {
                    job.employment_type
                }

            </p>

            {
    isAuthenticated ? (
        <>
            <input
                type="file"
                accept=".pdf"
                className="form-control mb-3"
                onChange={(e) =>
                    setResumeFile(
                        e.target.files[0]
                    )
                }
            />

  {
isOwnCompanyJob ? (

<button
    className="btn btn-secondary"
    disabled
>
    Posted by Your Company
</button>

) : applied ? (

<button
    className="btn btn-secondary"
    disabled
>
    Already Applied
</button>

) : (

<button
    className="btn btn-success"
    onClick={handleApply}
>
    Apply
</button>

)
}
        </>
    ) : (
        <button
            className="btn btn-primary"
            onClick={() =>
                navigate("/login")
            }
        >
            Login to Apply
        </button>
    )
}

        </div>
    );
}