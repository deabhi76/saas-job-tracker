import api, { authApi } from "./axios";

export const login = (data) =>
    authApi.post("/auth/login", data);

export const candidateSignup = (data) =>
    authApi.post(
        "/auth/signup/candidate",
        data
    );

export const companySignup = (data) =>
    authApi.post(
        "/auth/signup/company",
        data
    );

export const refreshToken = () =>
    authapi.post("/auth/refresh");

export const logout = () =>
    authApi.post("/auth/logout");

export const getMe = () =>
    api.get("/auth/me");

export const completeGoogleCompanySignup =
(data) => {

    return api.post(

        "/auth/signup/company/google",

        data

    );

};