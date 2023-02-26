import { useDeferredValue, useMemo } from "react";

import ReactJson from "react-json-view";

import { parseLooseJson } from "../utils/parser";
import { useStore } from "../utils/store";

export const TreeView = () => {
  const store = useStore();
  const openFile = store.useOpenFile();

  const json = useMemo(() => {
    try {
      if (openFile) {
        const t0 = performance.now();
        try {
          return parseLooseJson(openFile.content);
        } finally {
          console.info(
            `TreeView: parseLooseJson used ${performance.now() - t0}ms`
          );
        }
      }
    } catch (e) {
      return null;
    }
  }, [openFile?.content]);

  const deferredJson = useDeferredValue(json);

  return (
    <div className="whitespace-pre font-mono h-full overflow-auto">
      <ReactJson
        src={deferredJson || {}}
        collapsed={3}
        theme="monokai"
        name={false}
      />
    </div>
  );
};
