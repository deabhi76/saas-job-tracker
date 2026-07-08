import api from "./axios";

export const createRecruiter = (data) =>
  api.post("/auth/recruiters", data);

export const getRecruiters = () =>
  api.get("/auth/recruiters");