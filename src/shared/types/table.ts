export type TableColumn = {
  id: number;
  content: string | number | JSX.Element;
};

export type TableRow = {
  id: number;
  cells: TableCell[];
};

export type TableCell = {
  columnId: number;
  rowId: number;
  content: string | number | JSX.Element;
};
