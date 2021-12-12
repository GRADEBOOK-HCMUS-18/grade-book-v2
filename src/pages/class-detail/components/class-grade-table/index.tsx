import { Table } from 'shared/components';
import { TableColumn, TableRow } from 'shared/types';
import { Column, Cell } from './components';

export const ClassGradeTable = () => {
  const handleColEvent = (content: string, id: number) => {
    console.log(content, id);
  };

  const handleCellEdit = () => {};
  return (
    <Table
      columns={BuildCol(['Company', 'Contact', 'Country'], handleColEvent)}
      rows={BuildRows()}
    ></Table>
  );
};

const BuildCol = (
  items: any[],
  colEvent: (content: string, id: number) => void
): TableColumn[] => {
  const cols: TableColumn[] = [];

  for (let i = 0; i < items.length; i++) {
    const renderCol = (
      <div style={{ display: 'flex', padding: '0.5rem', alignItems: 'center' }}>
        {items[i]}
        <Column onColClick={colEvent} id={i} content={items[i]} />
      </div>
    );
    cols.push({
      id: i,
      content: renderCol,
    });
  }

  return cols;
};
const testRow = ['Alfreds Futterkiste', 'Maria Anders', 'Germany'];

const BuildRows = (): TableRow[] => {
  const row: TableRow[] = [];
  row.push({ id: 1, cells: [] });
  testRow.forEach((item, idx) =>
    row[0].cells.push({
      rowId: 1,
      columnId: 1 + idx,
      content: <Cell rowId={1} columnId={1 + idx} content={item} />,
    })
  );
  return row;
};
