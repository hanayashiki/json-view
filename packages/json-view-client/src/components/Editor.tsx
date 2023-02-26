import MonacoEditor, { BeforeMount } from "@monaco-editor/react";
import useEvent from "react-use-event-hook";

import { parseLooseJson } from "../utils/parser";
import { useStore } from "../utils/store";

export function Editor() {
  const store = useStore();
  const openFile = store.useOpenFile();

  const beforeMount: BeforeMount = useEvent(async (monaco) => {
    monaco.languages.registerDocumentFormattingEditProvider("json", {
      provideDocumentFormattingEdits: function (model) {
        const t0 = performance.now();
        const json = parseLooseJson(model.getValue());
        const result = JSON.stringify(json, undefined, 2);
        console.info(
          `Formatting: parseLooseJson and JSON.stringify used ${
            performance.now() - t0
          }ms`
        );

        return [
          {
            range: model.getFullModelRange(),
            text: result,
          },
        ];
      },
      displayName: "Loose JSON",
    });

    monaco.languages.json.jsonDefaults.setModeConfiguration({
      ...monaco.languages.json.jsonDefaults.modeConfiguration,
      documentFormattingEdits: false,
    });

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      trailingCommas: "ignore",
      comments: "ignore",
    });
  });

  const onChange = useEvent(async (content) => {
    if (openFile && content) {
      await store.changeFileContent(openFile?.id, content);
    }
  });

  return (
    <MonacoEditor
      theme="vs-dark"
      path={openFile?.filename}
      defaultLanguage="json"
      defaultValue={openFile?.content ?? ""}
      onChange={onChange}
      beforeMount={beforeMount}
      options={{
        tabSize: 2,
      }}
    />
  );
}
