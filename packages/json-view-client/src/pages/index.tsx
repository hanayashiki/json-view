import { Outlet } from "react-router-dom";

import { Layout } from "@/json-view-client/src/components/Layout";

export default function Index() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
