import { msg } from "@lingui/core/macro";

export const commonRoutingConstants = {
  routes: {
    "/": msg({ message: "/" }),
    "/consent": msg({ message: "/consent" }),
    "/error": msg({ message: "/error" }),
    "/login": msg({ message: "/login" }),
    "/login/accept": msg({ message: "/login/accept" }),
    "/login/deny": msg({ message: "/login/deny" }),
    "/logout": msg({ message: "/logout" }),
    "/logout/accept": msg({ message: "/logout/accept" }),
    "/logout/callback": msg({ message: "/logout/callback" }),
    "/logout/deny": msg({ message: "/logout/deny" }),
    "/logout/init": msg({ message: "/logout/init" }),
  },
} as const;
