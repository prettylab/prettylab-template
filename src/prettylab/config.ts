import { protectedRoutes } from "@/config/routes/protectedRoutes";
import { protectedApiRoutes } from "@/config/routes/api/protectedApiRoutes";
import { apiRoutes } from "@/config/routes/api/apiRoutes";
import { routes } from "@/config/routes/routes";
import { Config } from "@prettylab/core/types/Config";

const config: Config = {
  api: { message: {}, matchMessageMeta: {}, messagePath: "status" },
  core: {
    settings: {
      cookie_name: "settings",
      defaults: {
        ["menu-collapsed"]: false,
      },
    },
    routes: {
      protectedRoutes: { ...protectedRoutes, ...protectedApiRoutes },
      publicRoutes: { ...routes, ...apiRoutes },
    },
  },
};

export default config;
