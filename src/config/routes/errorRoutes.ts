import { Route } from "@prettylab/core/types/Route";

export const errorRoutes: Record<string, Route> = {
  not_found: {
    href: "/not-found",
    label: "Not found",
  },
  unauthorized: {
    href: "/forbidden",
    label: "Forbidden",
  },
  technical_break: {
    href: "/technical-break",
    label: "Technical break",
  },
};
