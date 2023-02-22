import MonacoEditor from "@monaco-editor/react";

import { useStore } from "../utils/store";

export function Editor() {
  const store = useStore();
  const openFile = store.useOpenFile();

  return (
    <MonacoEditor
      theme="vs-dark"
      path={openFile?.filename}
      defaultLanguage="javascript"
      defaultValue={openFile?.content ?? ""}
      onChange={async (content) => {
        if (openFile && content) {
          await store.changeFileContent(openFile?.id, content);
        }
      }}
    />
  );
}
