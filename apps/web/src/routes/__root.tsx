import type { QueryClient } from "@tanstack/react-query";

import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import Loader from "@/components/loader";
import { Toaster } from "@/components/ui/sonner";
import type { orpc } from "@/utils/orpc";
import appCss from "../index.css?url";

export type RouterAppContext = {
  orpc: typeof orpc;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "My App",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  const isFetching = useRouterState({ select: (s) => s.isLoading });
  return (
    <html className="dark" lang="en">
      <head>
        <HeadContent />
        <link
          crossOrigin=""
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin=""
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <div className="grid h-svh grid-rows-[auto_1fr]">
          {/* <Header /> */}
          {isFetching ? <Loader /> : <Outlet />}
        </div>
        <Toaster richColors />
        {/* <TanStackRouterDevtools position="bottom-left" /> */}
        {/* <ReactQueryDevtools buttonPosition="bottom-right" position="bottom" /> */}
        <Scripts />
      </body>
    </html>
  );
}
