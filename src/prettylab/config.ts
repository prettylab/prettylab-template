import { protectedRoutes } from "@/config/routes/protectedRoutes";
import { protectedApiRoutes } from "@/config/routes/api/protectedApiRoutes";
import { apiRoutes } from "@/config/routes/api/apiRoutes";
import { routes } from "@/config/routes/routes";
import { Config } from "@prettylab/core/types/Config";

const config: Config = {
  api: { message: {}, matchMessageMeta: {}, messagePath: "message" },
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
  db: {
    uri: process.env.DATABASE_URL,
    connectionLimit: 10,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
};

export default config;
