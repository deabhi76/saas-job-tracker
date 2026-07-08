import api from "./axios";

export const createJob = async (jobData) => {
    try {
        const res = await api.post("/jobs", jobData);
        return res.data;
    } catch (err) {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        console.log("REQUEST:", jobData);
        throw err;
    }
};

export const getMyJobs = () =>
  api.get("/jobs/my-jobs");

export const deleteJob = (jobId) =>
  api.delete(`/jobs/${jobId}`);

export const getJobById = (jobId) =>
  api.get(`/jobs/${jobId}`);

export const updateJob = (
  jobId,
  data
) =>
  api.put(
    `/jobs/${jobId}`,
    data
  );

  export const applyToJob =
(
    jobId,
    data
) =>
    api.post(
        `/jobs/${jobId}/apply`,
        data
    );

export const uploadResume =
(formData) =>
    api.post(
        "/jobs/upload-resume",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data"
            }
        }
    );

export const getMyApplications =
() =>
    api.get(
        "/jobs/applications/my-applications"
    );

export const updateApplicationStatus =
(
    applicationId,
    status
) =>
    api.patch(
        `/jobs/applications/${applicationId}/status`,
        {
            status
        }
    );

export const getApplicationsForJob =
(jobId) =>
    api.get(
        `/jobs/${jobId}/applications`
    );

export const hasApplied =
(jobId) =>

api.get(

    `/jobs/job/${jobId}/applied`

);