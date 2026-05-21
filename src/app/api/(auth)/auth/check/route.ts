import { authCheck } from "@prettylab/db/routes/authCheck";

export const { GET } = authCheck({
  sessionTable: "session",
  userTable: "user",
});
