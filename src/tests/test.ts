import { RequestWithValidationResult } from "./requestWithValidation";
import { testSaleCreditVisa } from "./testCase/Issuer_KFC_RD/101VISA-CARD";

export interface FolderNode {
  name: string;
  type: "folder";
  children: FileNode[];
  function?: never;
}

export interface FileNodeFile {
  name: string;
  type: "file";
  function: (fileName: string) => Promise<RequestWithValidationResult[]>;
  children?: never;
}

export type FileNode = FolderNode | FileNodeFile;

export const TEST_FILES: FileNode[] = [
  {
    name: "CARD",
    type: "folder",
    children: [
      {
        name: "Visa Card",
        type: "file",
        function: testSaleCreditVisa,
      },
    ],
  },
];
