import { authLogin } from "@prettylab/db/routes/authLogin";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export const { POST } = authLogin({
  cookieName: "sid",
  sessionTable: "session",
  userTable: "user",
  ttl: SESSION_TTL_SECONDS,
});
