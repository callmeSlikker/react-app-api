import { RequestWithValidationResult } from "./requestWithValidation";
import { testRequestQR01 } from "./testCase/REQUEST QR/requestQR01";
import { testRequestQR02 } from "./testCase/REQUEST QR/requestQR02";
import { testRequestQR03 } from "./testCase/REQUEST QR/requestQR03";
import { testSaleCreditVisa } from "./testCase/SALE CREDIT/101VISA-CARD";
import { testSaleCreditMaster } from "./testCase/SALE CREDIT/102MASTERCARD";
import { testSaleCreditJCB } from "./testCase/SALE CREDIT/103JCB-CARD";
import { testSaleCreditUPI } from "./testCase/SALE CREDIT/104UNIONPAY";
import { testSaleCreditDCI } from "./testCase/SALE CREDIT/105DCI";
import { testSaleCreditAmex } from "./testCase/SALE CREDIT/106AMEX-CARD";
import { testSaleCreditTBA } from "./testCase/SALE CREDIT/107TBA";
import { testSaleLinepay } from "./testCase/SALE LINEPAY/400LINEPAY";
import { testSaleQRCPromptpay } from "./testCase/SALE QRC/201PROMPTPAY";
import { testSaleQRCVisa } from "./testCase/SALE QRC/202QR-VISA";
import { testSaleQRCMaster } from "./testCase/SALE QRC/203QR-MASTER";
import { testSaleQRCJCB } from "./testCase/SALE QRC/204QR-JCB";
import { testSaleQRCUPI } from "./testCase/SALE QRC/205QR-UPI";
import { testSaleQRCTPN } from "./testCase/SALE QRC/206QR-TPN";
import { testSaleRabbit } from "./testCase/SALE RABBIT/300RABBIT";
import { testSaleWallet } from "./testCase/SALE WALLET/500WALLET";

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
    name: "SALE CRADIT",
    type: "folder",
    children: [
      {
        name: "VISA CARD",
        type: "file",
        function: testSaleCreditVisa,
      },
      {
        name: "MASRER CARD",
        type: "file",
        function: testSaleCreditMaster,
      },
      {
        name: "JCB CARD",
        type: "file",
        function: testSaleCreditJCB,
      },
      {
        name: "UPI CARD",
        type: "file",
        function: testSaleCreditUPI,
      },
      {
        name: "DCI CARD",
        type: "file",
        function: testSaleCreditDCI,
      },
      {
        name: "AMEX CARD",
        type: "file",
        function: testSaleCreditAmex,
      },
      {
        name: "TBA",
        type: "file",
        function: testSaleCreditTBA,
      },
    ],
  },
  {
    name: "SALE QRC",
    type: "folder",
    children: [
      {
        name: "QR PROMPTPAY",
        type: "file",
        function: testSaleQRCPromptpay,
      },
      {
        name: "QR VISA",
        type: "file",
        function: testSaleQRCVisa,
      },
      {
        name: "QR MASTER",
        type: "file",
        function: testSaleQRCMaster,
      },
      {
        name: "QR JCB",
        type: "file",
        function: testSaleQRCJCB,
      },
      {
        name: "QR UPI",
        type: "file",
        function: testSaleQRCUPI,
      },
      {
        name: "QR TPN",
        type: "file",
        function: testSaleQRCTPN,
      },
    ],
  },
  {
    name: "SALE RABBIT",
    type: "folder",
    children: [
      {
        name: "RABBIT",
        type: "file",
        function: testSaleRabbit,
      },
    ],
  },
  {
    name: "SALE LINEPAY",
    type: "folder",
    children: [
      {
        name: "LINEPAY",
        type: "file",
        function: testSaleLinepay,
      },
    ],
  },
  {
    name: "SALE WALLET",
    type: "folder",
    children: [
      {
        name: "WALLET",
        type: "file",
        function: testSaleWallet,
      },
    ],
  },
  {
    name: "REQUEST QR",
    type: "folder",
    children: [
      {
        name: "QR 01",
        type: "file",
        function: testRequestQR01,
      },
      {
        name: "QR 02",
        type: "file",
        function: testRequestQR02,
      },
      {
        name: "QR 03",
        type: "file",
        function: testRequestQR03,
      },
    ],
  },
];
