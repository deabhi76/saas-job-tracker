// import axios from "axios";

// const api = axios.create({

//     baseURL:
//         "http://localhost:5000/api",

//     withCredentials: true

// });

// export const setAuthToken = (token) => {

//     if (token) {

//         api.defaults.headers.common.Authorization =
//             `Bearer ${token}`;

//     } else {

//         delete api.defaults.headers.common.Authorization;

//     }

// };

// export default api;

import axios from "axios";

export const authApi = axios.create({

    baseURL:
        "http://localhost:5000/api",

    withCredentials: true

});

const api = axios.create({

    baseURL:
        "http://localhost:5000/api",

    withCredentials: true

});

export const setAuthToken = (token) => {

    if (token) {

        api.defaults.headers.common.Authorization =
            `Bearer ${token}`;

    } else {

        delete api.defaults.headers.common.Authorization;

    }

};

let isRefreshing = false;

let failedQueue = [];

const processQueue = (

    error,

    token = null

) => {

    failedQueue.forEach(

        promise => {

            if (error) {

                promise.reject(error);

            } else {

                promise.resolve(token);

            }

        }

    );

    failedQueue = [];

};

api.interceptors.response.use(

    response => response,

    async error => {

        const originalRequest =
            error.config;

        if (

            error.response?.status !== 401 ||

            originalRequest._retry

        ) {

            return Promise.reject(error);

        }

        originalRequest._retry = true;

        if (isRefreshing) {

            return new Promise(

                (resolve, reject) => {

                    failedQueue.push({

                        resolve,

                        reject

                    });

                }

            ).then(

                token => {

                    originalRequest.headers.Authorization =
                        `Bearer ${token}`;

                    return api(originalRequest);

                }

            );

        }

        isRefreshing = true;

        try {

            const response =
                await authApi.post(
                    "/auth/refresh"
                );

            const accessToken =
                response.data.accessToken;

            setAuthToken(
                accessToken
            );

            processQueue(
                null,
                accessToken
            );

            originalRequest.headers.Authorization =
                `Bearer ${accessToken}`;

            return api(
                originalRequest
            );

        } catch (err) {

            processQueue(
                err,
                null
            );

            setAuthToken(null);

            window.location.href =
                "/login";

            return Promise.reject(err);

        } finally {

            isRefreshing = false;

        }

    }

);

export default api;