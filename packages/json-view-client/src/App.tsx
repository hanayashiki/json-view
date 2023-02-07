import { useState } from "react";

import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthContextProvider, useAuth } from "./utils/auth";
import Index from "@/json-view-client/src/pages";
import { config } from "@/json-view-client/src/utils/config";
import { trpc } from "@/json-view-client/src/utils/trpc";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [],
  },
]);

function TrpcApp() {
  const [queryClient] = useState(() => new QueryClient());

  const { token } = useAuth();

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${config.serverUrl}/trpc`,
          // optional
          headers() {
            return {
              authorization: token,
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <div className="h-screen bg-gray-800 text-white">
        <RouterProvider router={router} />
      </div>
    </trpc.Provider>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <TrpcApp />
    </AuthContextProvider>
  );
}

export default App;
