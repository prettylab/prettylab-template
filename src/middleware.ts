import { NextRequest, NextResponse } from "next/server";
import {
  generateApiPath,
  isProtectedRoute,
} from "@prettylab/core/utils/route/route";
import { errorRoutes } from "@/config/routes/errorRoutes";
import { routes } from "@/config/routes/routes";
import { isTrue } from "@prettylab/core/utils/type/isTrue";
import { apiRoutes } from "@/config/routes/api/apiRoutes";
import { protectedRoutes } from "@/config/routes/protectedRoutes";
import message, { matchMessageMeta } from "@prettylab/api/consts/message";
import { redirect } from "@prettylab/core/middleware/headers/redirect";
import { includeHeaders } from "@prettylab/core/middleware/headers/headers";
import { withAuthCheckMiddleware } from "@prettylab/core/middleware/withAuthCheckMiddleware";
import { isFalse } from "@prettylab/core/utils/type/isFalse";

export default async function middleware(req: NextRequest) {
  if (
    isTrue(process.env.TECHNICAL_BREAK) &&
    req.nextUrl.pathname !== errorRoutes.technical_break.href
  ) {
    return redirect(req, {
      message: message.TECHNICAL_BREAK,
      url: errorRoutes.technical_break.href,
      code: matchMessageMeta[message.TECHNICAL_BREAK].code,
    });
  }

  if (
    req.nextUrl.pathname === errorRoutes.technical_break.href &&
    isFalse(process.env.TECHNICAL_BREAK)
  ) {
    return NextResponse.redirect(new URL(routes.index.href, req.url));
  }

  const isLoginRoute = req.nextUrl.pathname === routes.login.href;

  const isProtected = isProtectedRoute(req.nextUrl.pathname);
  if (!isProtected && !isLoginRoute) {
    return includeHeaders(req);
  }

  const session = await withAuthCheckMiddleware(req, {
    cookieName: "sid",
    url: generateApiPath(apiRoutes.check.href),
  });

  if (!session && !isLoginRoute) {
    return redirect(req, {
      message: message.UNAUTHORIZED,
      url: routes.login.href,
      code: matchMessageMeta[message.UNAUTHORIZED].code,
    });
  }

  if (session && isLoginRoute) {
    return NextResponse.redirect(new URL(protectedRoutes.index.href, req.url));
  }

  return includeHeaders(req, session);
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon\\.ico|.*\\.(?:css|js|ts|tsx|json|svg|ico|png|jpg|jpeg|gif|webp|woff2?|ttf|eot|otf|xml|txt|map)$).*)",
  ],
};
