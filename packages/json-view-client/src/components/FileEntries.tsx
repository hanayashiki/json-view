import { useMemo } from "react";

import { cx } from "classix";
import * as R from "remeda";

import { trpc } from "../utils/trpc";
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

export function FileEntries(props: { files: FileModel.ListVO[] }) {
  const { files } = props;

  const utils = trpc.useContext();

  const openFile = useMemo(
    () =>
      R.pipe(
        files,
        R.maxBy((f) => f["@open_at"]?.getTime() || 0)
      ),
    [files]
  );

  const fileMutation = trpc.updateFile.useMutation({
    onSuccess: () => utils.myFiles.invalidate(),
  });

  return (
    <div className="flex">
      {files.map((file) => (
        <FileEntry
          file={file}
          isOpen={file.id === openFile?.id}
          key={file.id}
          onClick={async () => {
            utils.myFiles.setData(
              undefined,
              (files) =>
                files?.map((f) => ({
                  ...f,
                  "@open_at": f.id === file.id ? new Date() : f["@open_at"],
                })) ?? []
            );

            await fileMutation.mutateAsync({
              id: file.id,
              "@open_at": new Date(),
            });
          }}
        />
      ))}
    </div>
  );
}
