import React, { useContext } from "react";
import { useMemo } from "react";

import * as R from "remeda";

import { trpc } from "../utils/trpc";

export class Store {
  constructor(public utils: ReturnType<(typeof trpc)["useContext"]>) {}

  async openFile(id: string) {
    this.utils.myFiles.setData(
      undefined,
      (files) =>
        files?.map((f) => ({
          ...f,
          "@open_at": f.id === id ? new Date() : f["@open_at"],
        })) ?? []
    );
    await this.utils.client.updateFile.mutate({
      id,
      "@open_at": new Date(),
    });
  }

  async changeFileContent(id: string, content: string) {
    this.utils.myFiles.setData(
      undefined,
      (files) =>
        files?.map((f) => ({
          ...f,
          content,
        })) ?? []
    );

    await this.utils.client.updateFile.mutate({
      id,
      content,
    });
  }

  useFiles() {
    return trpc.myFiles.useQuery().data ?? [];
  }

  useOpenFile() {
    const files = this.useFiles();

    return useMemo(
      () =>
        R.pipe(
          files,
          R.maxBy((f) => f["@open_at"]?.getTime() || 0)
        ),
      [files]
    );
  }
}

export const StoreContext = React.createContext<Store>({} as any);

export const StoreProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const utils = trpc.useContext();

  const store = useMemo(() => new Store(utils), []);

  return React.createElement(StoreContext.Provider, { value: store }, children);
};

export const useStore = () => {
  return useContext(StoreContext);
};
