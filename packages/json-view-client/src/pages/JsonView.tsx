import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { Editor } from "../components/Editor";
import { TreeView } from "../components/TreeView";
// import { useStore } from "../utils/store";

export default function JsonView() {
  // `react-resizable-panels` use overflow: hidden by default,
  // but it hides pop ups from the editor
  return (
    <PanelGroup
      className="flex-1 min-h-0 !h-[initial] !overflow-visible"
      direction="horizontal"
    >
      <Panel className="!overflow-visible min-w-0">
        <Editor />
      </Panel>
      <PanelResizeHandle className="w-1" />
      <Panel className="!overflow-visible min-w-0">
        <TreeView />
      </Panel>
    </PanelGroup>
  );
}
