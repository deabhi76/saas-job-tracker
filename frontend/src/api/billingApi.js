import api from "./axios";

export const getPlans = () =>
    api.get("/billing/plans");

export const getSubscription = () =>
    api.get("/billing/subscriptions/me");

export const purchaseSubscription =
    (planId) =>
        api.post(
            "/billing/subscriptions",
            { planId }
        );

export const cancelSubscription =
    (subscriptionId) =>
        api.patch(
            `/billing/subscriptions/${subscriptionId}/cancel`
        );

export const getCompanyFeatures =
    () =>
        api.get(
            "/billing/features/company"
        );

export const getPersonalFeatures =
    () =>
        api.get(
            "/billing/features/personal"
        );

export const getPayments =
() =>
    api.get(
        "/billing/payments/me"
    );