import "server-only";

export const constants = {
  payloadTypes: {
    loginAcceptResponse: "login-accept-response",
    loginDenyResponse: "login-deny-response",
    loginRequest: "login-request",
    logoutAcceptResponse: "logout-accept-response",
    logoutDenyResponse: "logout-deny-response",
    logoutRequest: "logout-request",
  },
} as const;
