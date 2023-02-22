import { Outlet } from "react-router-dom";

import { FileEntries } from "../components/FileEntries";
import { Layout } from "@/json-view-client/src/components/Layout";

export default function Index() {
  return (
    <Layout>
      <FileEntries />

      <Outlet />
    </Layout>
  );
}
