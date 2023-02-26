import React, { useContext } from "react";
import { useMemo } from "react";

import { makeObservable, observable } from "mobx";
import * as R from "remeda";

import { trpc } from "../utils/trpc";

export interface LocalFile {
  id: string;
  editing: boolean;
}

export class Store {
  @observable
  localFiles: Map<string, LocalFile> = new Map();

  getNextFileName() {
    let exampleId = 0;
    while (
      this.utils.myFiles
        .getData()
        ?.find((d) => d.filename === `example${exampleId || ""}.json`)
    ) {
      exampleId++;
    }

    return `example${exampleId || ""}.json`;
  }

  constructor(public utils: ReturnType<(typeof trpc)["useContext"]>) {
    makeObservable(this);
  }

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

  async insertFile() {
    const newFile = await this.utils.client.insertFile.mutate({
      filename: this.getNextFileName(),
    });

    this.utils.myFiles.setData(undefined, (files) => [
      ...(files ?? []),
      {
        ...newFile,
        "@open_at": null,
      },
    ]);
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
