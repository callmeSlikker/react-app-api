import React, { useState } from "react";

export interface FileNodeType {
  name: string;
  type: "file" | "folder";
  children?: FileNodeType[];
}

interface FileNodeProps {
  node: FileNodeType;
  toggle: (filePath: string) => void;
  path: string;
  selected: string[];
}

const FileNode: React.FC<FileNodeProps> = ({ node, toggle, path, selected }) => {
  const [open, setOpen] = useState(false);
  const currentPath = `${path}/${node.name}`;

  const getAllChildFilePaths = (n: FileNodeType, base: string): string[] => {
    if (n.type === "file") {
      return [`${base}/${n.name}`];
    }
    return n.children?.flatMap(child => getAllChildFilePaths(child, `${base}/${n.name}`)) || [];
  };

  const handleFolderCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const allFiles = getAllChildFilePaths(node, path);
    const isAllSelected = allFiles.every(f => selected.includes(f));
    if (isAllSelected) {
      allFiles.forEach(f => toggle(f));
    } else {
      allFiles.forEach(f => {
        if (!selected.includes(f)) toggle(f);
      });
    }
  };

  const isFolderSelected = () => {
    const allFiles = getAllChildFilePaths(node, path);
    return allFiles.length > 0 && allFiles.every(f => selected.includes(f));
  };

  if (node.type === "folder") {
    return (
      <div style={{ marginLeft: 20, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <input
            type="checkbox"
            checked={isFolderSelected()}
            onChange={handleFolderCheckboxChange}
            onClick={(e) => e.stopPropagation()}
          />
          <span
            style={{ cursor: "pointer", fontWeight: "bold", userSelect: "none" }}
            onClick={() => setOpen(!open)}
          >
            {open ? "📂" : "📁"} {node.name}
          </span>
        </div>
        {open &&
          node.children?.map((child) => (
            <FileNode
              key={`${currentPath}/${child.name}`}
              node={child}
              toggle={toggle}
              path={currentPath}
              selected={selected}
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
          checked={selected.includes(currentPath)}
          onChange={() => toggle(currentPath)}
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
  selectedFiles: string[];
  toggleFile: (filePath: string) => void;
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
            path=""
            selected={selectedFiles}
          />
        ))
      )}
    </div>
  );
}
