import React, { useState } from "react";
import CustomDataTable from "../../components/CustomDataTable";
import { SECURITY_LIST } from "../../data";
import { Button, Select } from "antd";
import AddFormModal from "./AddFormModal";

const SecurityList = () => {
  const { Option } = Select; // Correct way to get Option
  const [data, setData] = useState(SECURITY_LIST);
  //   const [rowSelection, setRowSelection] = useState({});
  //   const [expandedRowState, setExpandedRowState] = useState([]);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Items per page
  const [modalData, setModalData] = useState();
  const [isSecurityModal, setIsSecurityModal] = useState(false);
  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFormClick = (rowData) => {
    setModalData(rowData);
    setIsSecurityModal(true);
  };
  const columns = [
    {
      accessorKey: "filingId",
      header: "Filling Id",
      cell: ({ row }) => row.original.filingId || "N/A",
      enableColumnFilters: true,
    },

    {
      accessorKey: "materialInfo",
      header: "Material Info",
      cell: ({ row }) => row.original.materialInfo || "N/A",
    },
    {
      accessorKey: "noOfSecurityFormsToBeAdded",
      header: "No of Security Forms to Be Added",
      cell: ({ row, getValue, column, table }) => {
        const initialValue = getValue();

        const handleChange = (e) => {
          table.options.meta?.updateData(
            row.index,
            column.id,
            Number(e.target.value)
          );
        };

        return (
          <input
            type="number"
            value={initialValue}
            onChange={handleChange}
            style={{ width: "100%", padding: "4px" }}
          />
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          <Button
            onClick={() => handleFormClick(row.original)}
            // disabled={isAllSelected}
            // to={`/mapping/${row.original.companyName}`}
          >
            Add Form
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

  // Calculate total rows (or get from API response)
  const totalRows = data.length;
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing size
  };
  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };
  return (
    <>
      <div className=" custom-table-wrapper ">
        {data.length > 0 ? (
          <CustomDataTable
            columns={columns}
            data={getCurrentPageData() || []}
            //   onRowSelect={(event, row) => handleRowClick(event, row)}
            //   rowSelection={rowSelection}
            //   setRowSelection={setRowSelection}
            //   getRowCanExpand={() => true}
            //   enableMultiRowSelection={true}
            setData={setData}
            currentPage={currentPage}
            totalRows={totalRows}
            pageSize={pageSize}
            handlePageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        ) : (
          <div className="text-center text-gray-500">No record found.</div>
        )}
      </div>
      <AddFormModal
        modalData={modalData}
        isSecurityModal={isSecurityModal}
        setIsSecurityModal={setIsSecurityModal}
      />
    </>
  );
};

export default SecurityList;
