import { Route } from "@prettylab/core/types/Route";

export const protectedRoutes: Record<string, Route> = {
  index: {
    href: "/admin",
    label: "Dashboard",
  },
};
