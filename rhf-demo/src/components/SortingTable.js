import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Mock_data from "../data/MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./coulmns";
import '../styles/table.css'

const BasicTable = () => {
  const columns = useMemo(() => GROUPED_COLUMNS, []); // use memo ensures data is not created for every render
  const data = useMemo(() => Mock_data, []);
  const tableInstance = useTable({
    columns,
    data,
  },
useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } =
    tableInstance;
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>{column.isSorted ? (column.isSortedDesc ? 'down': 'up'): ''}</span>
                </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return(
            <tr {...row.getRowProps()}>
                {
                    row.cells.map(cell => (
                        <td {...cell.getCellProps()} >{cell.render('Cell')}</td>
                    ))
                }
            </tr>
          )
        })}
      </tbody>
      <tfoot>
        {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map(column => (
                    <td {...column.getFooterProps()}>
                        {column.render('Footer')}
                    </td>
                ))}
            </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default BasicTable;
