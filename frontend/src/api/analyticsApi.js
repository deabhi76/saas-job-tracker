import api from "./axios";

export const getCandidateAnalytics = () =>
    api.get("/analytics/candidate");

export const getRecruiterAnalytics = () =>
    api.get("/analytics/recruiter");

export const getCompanyAnalytics = () =>
    api.get("/analytics/company");

export const getAdminAnalytics = () =>
    api.get("/analytics/admin");