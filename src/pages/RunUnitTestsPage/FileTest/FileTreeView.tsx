import React, { useState } from "react";
import { SelectedFile } from "../pyTestRunner";

export interface FileNodeFile {
  name: string;
  type: "file";
  function: (fileName: string) => Promise<any>;
}

export interface FileNodeFolder {
  name: string;
  type: "folder";
  children: (FileNodeFile | FileNodeFolder)[];
}

export type FileNodeType = FileNodeFile | FileNodeFolder;

interface FileNodeProps {
  node: FileNodeType;
  toggle: (fileNode: FileNodeFile) => void;
  selected: SelectedFile[];
  currentPath: string;
}

const FileNode: React.FC<FileNodeProps> = ({
  node,
  toggle,
  selected,
  currentPath,
}) => {
  const [open, setOpen] = useState(false);
  const fullPath = `${currentPath}/${node.name}`;

  const getAllChildFileNodes = (n: FileNodeType): FileNodeFile[] => {
    if (n.type === "file") {
      return [
        {
          name: n.name,
          type: "file",
          function: (n as any).function,
        },
      ];
    }

    return n.children?.flatMap((child) => getAllChildFileNodes(child)) || [];
  };
  const isFolderFullySelected = () => {
    const allFiles = getAllChildFileNodes(node);
    return allFiles.every((f) => selected.some((s) => s.fileName === f.name));
  };

  const handleFolderCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();
    const allFiles = getAllChildFileNodes(node); // no path

    const isSelected = (f: FileNodeFile) =>
      selected.some((s) => s.fileName === f.name);

    const allSelected = allFiles.every(isSelected);

    allFiles.forEach((f) => {
      if (allSelected) {
        toggle(f); // deselect
      } else if (!isSelected(f)) {
        toggle(f); // select
      }
    });
  };

  if (node.type === "folder") {
    return (
      <div style={{ marginLeft: 20, display: "flex", flexDirection: "column"}}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <input
            type="checkbox"
            checked={isFolderFullySelected()}
            onChange={handleFolderCheckboxChange}
            onClick={(e) => e.stopPropagation()}
          />
          <span
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              userSelect: "none",
            }}
            onClick={() => setOpen(!open)}
          >
            {open ? "📂" : "📁"} {node.name}
          </span>
        </div>
        {open &&
          node.children.map((child) => (
            <FileNode
              key={`${fullPath}/${child.name}`}
              node={child}
              toggle={toggle}
              selected={selected}
              currentPath={fullPath}
            />
          ))}
      </div>
    );
  }

  return (
    <div style={{ marginLeft: 40 }}>
      <label>
        <input
          type="checkbox"
          checked={selected.some((s) => s.fileName === node.name)}
          onChange={() => toggle(node)}
        />
        {node.name}
      </label>
    </div>
  );
};

export default function FileTreeView({
  fileTree,
  selectedFiles,
  toggleFile,
}: {
  fileTree: FileNodeType[];
  selectedFiles: SelectedFile[];
  toggleFile: (fileNode: FileNodeFile) => void;
}) {
  return (
    <div>
      {fileTree.length === 0 ? (
        <p>Loading...</p>
      ) : (
        fileTree.map((node) => (
          <FileNode
            key={node.name}
            node={node}
            toggle={toggleFile}
            selected={selectedFiles}
            currentPath=""
          />
        ))
      )}
    </div>
  );
}
