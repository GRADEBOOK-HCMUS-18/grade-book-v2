export type TableColumn = {
  id: number | string;
  content: string | number | JSX.Element;
};

export type TableRow = {
  id: number | string;
  cells: TableCell[];
};

export type TableCell = {
  columnId: number | string;
  rowId: number | string;
  content: string | number | JSX.Element;
};
