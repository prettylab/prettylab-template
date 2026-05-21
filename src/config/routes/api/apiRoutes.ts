import { ApiRoute } from "@prettylab/core/types/ApiRoute";

export const apiRoutes: Record<string, ApiRoute> = {
  login: {
    href: "/api/auth/login",
  },
  check: {
    href: "/api/auth/check",
  },
  logout: {
    href: "/api/auth/logout",
  },
};
