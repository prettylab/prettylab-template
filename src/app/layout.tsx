import { Metadata, Viewport } from "next";
import { protectedRoutes } from "@/config/routes/protectedRoutes";
import { routes } from "@/config/routes/routes";
import { errorRoutes } from "@/config/routes/errorRoutes";
import { headers } from "next/headers";
import { matchRoutePattern } from "@prettylab/core/utils/route/route";
import { ReactNode } from "react";
import NotifyProvider from "@prettylab/notify/provider/NotifyProvider/NotifyProvider";
import { isTrue } from "@prettylab/core/utils/type/isTrue";
import { redirect } from "next/navigation";
import Providers from "@prettylab/core/provider/Providers";
import CustomProviders from "@/components/provider/CustomProviders";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const routeMetaTags = {
    title: "Prettylab template",
    description: "Prettylab template",
    keywords: "prettylab,template",
    alternates: {
      canonical: "https://prettylab.pl",
    },
    openGraph: {
      title: "Prettylab template",
      description: "Prettylab template",
      url: "https://prettylab.pl",
      siteName: "Prettylab template",
    },
  };

  const routesList = [
    ...Object.values(protectedRoutes),
    ...Object.values(routes),
    ...Object.values(errorRoutes),
  ];

  const headersList = await headers();
  const pathname = await headersList.get("x-pathname");

  const route = routesList.find((route: any) =>
    matchRoutePattern(route.href, pathname || ""),
  );

  return {
    title: `${route?.label ? route.label + " - " : ""}${routeMetaTags.title}`,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headersList = await headers();
  const pathname = await headersList.get("x-pathname");

  if (
    pathname !== errorRoutes.technical_break.href &&
    isTrue(process.env.TECHNICAL_BREAK)
  ) {
    redirect(errorRoutes.technical_break.href);
  }

  return (
    <html lang="pl">
      <body>
        <Providers>
          <CustomProviders>
            <NotifyProvider>{children}</NotifyProvider>
          </CustomProviders>
        </Providers>
      </body>
    </html>
  );
}
