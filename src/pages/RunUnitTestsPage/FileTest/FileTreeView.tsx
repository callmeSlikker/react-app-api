import React, { useEffect, useState } from "react";

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

  const handleFolderCheckboxChange = () => {
    const allFiles = getAllChildFilePaths(node, path);
    const isAllSelected = allFiles.every(f => selected.includes(f));
    if (isAllSelected) {
      allFiles.forEach(f => toggle(f)); // unselect all
    } else {
      allFiles.forEach(f => {
        if (!selected.includes(f)) toggle(f); // select only unselected
      });
    }
  };

  const isFolderSelected = () => {
    const allFiles = getAllChildFilePaths(node, path);
    return allFiles.every(f => selected.includes(f));
  };

  if (node.type === "folder") {
    return (
      <div style={{ marginLeft: 20 }}>
        <label style={{ cursor: "pointer", fontWeight: "bold" }}>
          <input
            type="checkbox"
            checked={isFolderSelected()}
            onChange={handleFolderCheckboxChange}
            style={{ marginRight: 5 }}
          />
          <span onClick={() => setOpen(!open)}>
            {open ? "📂" : "📁"} {node.name}
          </span>
        </label>
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
