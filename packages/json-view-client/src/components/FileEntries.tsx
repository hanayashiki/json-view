import { cx } from "classix";

import { useStore } from "../utils/store";
import { FileModel } from "@/json-view-server/src/models/FileModel";

function FileEntry({
  file,
  isOpen,
  onClick,
}: {
  file: FileModel.ListVO;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cx(
        "text-xs p-1 cursor-pointer",
        isOpen && "bg-white bg-opacity-10"
      )}
      onClick={onClick}
    >
      {file.filename}
    </div>
  );
}

export function FileEntries() {
  const store = useStore();

  const files = store.useFiles();

  const openFile = store.useOpenFile();

  return (
    <div className="flex">
      {files.map((file) => (
        <FileEntry
          file={file}
          isOpen={file.id === openFile?.id}
          key={file.id}
          onClick={async () => {
            store.openFile(file.id);
          }}
        />
      ))}
    </div>
  );
}
