import { CSSProperties, ReactNode } from 'react';
import { LoadingWrapper } from './LoadingWrapper';

export type TableColumn = {
  label: ReactNode;
  field: string;
  thStyle?: CSSProperties,
  render?: (item: any, rowIndex: number, colIndex: number) => ReactNode;
};

export type TableProps<M> = {
  columns: TableColumn[];
  collection: M[];
  loading?: boolean;
  getRowKey?: (item: M) => string | number;
};

export function Table<M>({
  columns, collection, getRowKey, loading = false,
}: TableProps<M>) {
  function renderThead() {
    return (
      <thead className="thead">
        <tr className="tr head-tr">
          { columns.map((column: TableColumn) => (
            <th className="th" key={column.field} style={column.thStyle}>
              {column.label}
            </th>
          )) }
        </tr>
      </thead>
    );
  }

  function renderRow(item: any, i: number) {
    return (
      <tr className="tr body-tr" key={getRowKey ? getRowKey(item) : i}>
        { columns.map((column: TableColumn, j: number) => {
          let output: ReactNode = null;
          if (column.render) {
            output = column.render(item, i, j);
          } else if (column.field in item) {
            output = item[column.field];
          }

          return (
            <td className="td" key={`${column.field}-${j}`}>
              { output }
            </td>
          );
        }) }
      </tr>
    );
  }

  return (
    <LoadingWrapper loading={loading}>
      <div className="table-responsive">
        <table className="table">
          { renderThead() }
          <tbody className="tbody">
            {collection.map(renderRow)}
          </tbody>
        </table>
      </div>
    </LoadingWrapper>
  );
}
