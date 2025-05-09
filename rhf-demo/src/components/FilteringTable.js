import React, { useMemo } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import Mock_data from "../data/MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./coulmns";
import "../styles/table.css";
import GlobalFilter from "./GlobalFilter";

const BasicTable = () => {
  const columns = useMemo(() => GROUPED_COLUMNS, []); // use memo ensures data is not created for every render
  const data = useMemo(() => Mock_data, []);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const groupProps = headerGroup.getHeaderGroupProps();
            return (
              <tr key={groupProps.key} {...groupProps}>
                {headerGroup.headers.map((column) => {
                  const headerProps = column.getHeaderProps();
                  return (
                    <th key={headerProps.key} {...headerProps}>
                      {column.render("Header")}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            return (
              <tr key={rowProps.key} {...rowProps}>
                {row.cells.map((cell) => {
                  const cellProps = cell.getCellProps();
                  return (
                    <td key={cellProps.key} {...cellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => {
            const footerProps = footerGroup.getFooterGroupProps();
            return (
              <tr key={footerProps.key} {...footerProps}>
                {footerGroup.headers.map((column) => {
                  const footerCellProps = column.getFooterProps();
                  return (
                    <td key={footerCellProps.key} {...footerCellProps}>
                      {column.render("Footer")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tfoot>
      </table>
    </>
  );
};

export default BasicTable;
