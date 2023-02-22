import { useMemo, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import superjson from "superjson";

import { AuthGate } from "./components/AuthGate";
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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 0 },
          mutations: { retry: 0 },
        },
      })
  );

  const { token } = useAuth();

  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        transformer: superjson,
        links: [
          httpBatchLink({
            url: `${config.serverUrl}/trpc`,
            // optional
            headers() {
              return {
                authorization: token ? `Token ${token}` : undefined,
              };
            },
          }),
        ],
      }),
    [token]
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="h-screen bg-gray-900 text-white">
          <AuthGate>
            <RouterProvider router={router} />
          </AuthGate>
        </div>
      </QueryClientProvider>
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
