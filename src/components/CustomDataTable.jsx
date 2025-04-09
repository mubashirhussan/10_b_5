import React from "react";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getExpandedRowModel,
  // getFilteredRowModel,
} from "@tanstack/react-table";

import CustomPagination from "./CustomPagination";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";

const CustomDataTable = ({
  columns,
  data,
  expandedRowContent,
  getRowCanExpand,
  onRowSelect = () => {},
  setRowSelection,
  rowSelection = {},
  columnFilters,
  enableMultiRowSelection,
  currentPage,
  totalRows,
  pageSize,
  handlePageChange,
  onPageSizeChange,
  setData,
}) => {
  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onRowSelectionChange: setRowSelection,
    preserveSelectedRowKeys: false,
    getRowId: (row) => row.id,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row
          )
        );
      },
    },
    state: {
      rowSelection,
      columnFilters,
    },
    enableMultiRowSelection: enableMultiRowSelection,
  });

  return (
    <>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="responsive-table border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-[#9EA0A5] text-left uppercase text-[12px] border-b-2 border-[#F4F6F9] font-medium"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2"
                    style={{ width: `${header.getSize()}px` }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span className="ml-1">
                          {{
                            asc: <ArrowDownUp size={14} />,
                            desc: <ArrowUpDown size={14} />,
                          }[header.column.getIsSorted()] || (
                            <ArrowDownUp size={14} />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <tr
                  key={row.id}
                  className={`even:bg-[#F9F9F9] odd:bg-white hover:bg-blue-100 cursor-pointer ${
                    row.getIsSelected() ? "bg-blue-200" : ""
                  }`}
                  onClick={(e) => onRowSelect(e, row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-2 border-b-2 border-[#F4F6F9]"
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && expandedRowContent[row.id] && (
                  <tr key={`expanded-${row.id}`}>
                    <td colSpan={columns.length}>
                      <div style={{ padding: "10px", background: "#DFDFDF" }}>
                        <div className="grid grid-cols-7 gap-4">
                          {Object.entries(
                            expandedRowContent[row.id].content
                          ).map(([key, value]) => (
                            <div key={key}>
                              <div className="font-medium text-gray-700">
                                {key}
                              </div>
                              <div className="text-gray-900">
                                {value || "N/A"}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center pagination justify-between pt-4">
        <CustomPagination
          currentPage={currentPage}
          totalRows={totalRows}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </>
  );
};

export default CustomDataTable;
