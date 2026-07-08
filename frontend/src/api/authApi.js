import api from "./axios";

export const login = (data) =>
    api.post("/auth/login", data);

export const candidateSignup = (data) =>
    api.post(
        "/auth/signup/candidate",
        data
    );

export const companySignup = (data) =>
    api.post(
        "/auth/signup/company",
        data
    );

export const refreshToken = () =>
    api.post("/auth/refresh");

export const logout = () =>
    api.post("/auth/logout");

export const getMe = () =>
    api.get("/auth/me");