import { authLogout } from "@prettylab/db/routes/authLogout";

export const { POST } = authLogout({
  cookieName: "sid",
  sessionTable: "session",
});
