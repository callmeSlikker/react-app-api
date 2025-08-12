// types.ts
export enum InputType {
  TEXT = "text",
  NUMBER = "number",
  SELECT = "select",
  DATE = "date",
}

export interface GenericFormField {
  label: string;
  key: string;
  value?: string | number;
  type: InputType;
  options?: string[];
}

export type GenericFormFields = Record<string, GenericFormField>;


export interface GenericTableColumn {
  key: string;
  label: string;
}

export interface GenericTableRow {
  [key: string]: string | number;
}

export interface GenericTableProps {
  columns: GenericTableColumn[];
  data: GenericTableRow[];
}
