import { Outlet } from "react-router-dom";

import { FileEntries } from "../components/FileEntries";
import { Layout } from "@/json-view-client/src/components/Layout";
import { trpc } from "@/json-view-client/src/utils/trpc";

export default function Index() {
  const myFilesQuery = trpc.myFiles.useQuery();

  return (
    <Layout>
      <FileEntries files={myFilesQuery.data ?? []} />

      <Outlet />
    </Layout>
  );
}
