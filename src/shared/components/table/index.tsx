import { TableColumn, TableRow } from 'shared/types';

import { Column } from './components';
import './style/index.css';

interface IProps {
  columns: TableColumn[];
  rows: TableRow[];
}

export const Table = ({ columns, rows }: IProps) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <Column key={col.id} id={col.id} content={col.content}></Column>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {row.cells.map((cell) => (
              <td key={cell.columnId + cell.rowId}>{cell.content}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
