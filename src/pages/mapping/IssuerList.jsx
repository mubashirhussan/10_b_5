/* eslint-disable no-debugger */
// import { Link } from "react-router-dom";
import CustomDataTable from "../../components/CustomDataTable";
// import CustomCard from "../../components/CustomCard";
import { useEffect, useState } from "react";
import IndeterminateCheckbox from "../../components/IndeterminateCheckbox";
import CustomTab from "../../components/CustomTab";
import { Button, Col, Form, Input, Row, Select } from "antd";
import IssuerModal from "./IssuerModal";
import ProcessedDetailModal from "./ProcessedDetailModal";
import ProcessedUpdateModal from "./ProcessedUpdateModal";
import { ISSUER_LIST } from "../../data";

const IssuerList = () => {
  const { Option } = Select;
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [isIssuerModal, setIsIssuerModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("unprocessed");
  const [processedData, setProcessedData] = useState([]);
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [companyNameFilter, setCompanyNameFilter] = useState("");
  const [cikFilter, setCikFilter] = useState("");

  useEffect(() => {
    setIsAllSelected(Object.keys(rowSelection).length > 1);
  }, [rowSelection, setIsAllSelected]);

  const handleRowClick = (e) => {
    if (e.target.type === "checkbox") {
      e.stopPropagation();
      return;
    }
  };

  const ProcessingTabs = [
    { value: "unprocessed", label: "Unprocessed" },
    { value: "processed", label: "Processed" },
  ];

  const handleTabChange = (value) => {
    setSelectedTab(value);
    setCurrentPage(1); // Reset to first page when changing tabs
    setRowSelection({}); // Clear selection when changing tabs
  };

  const onReasonChange = (value) => {
    console.log(value);
  };

  const handleMapClick = (rowData) => {
    setModalData([rowData]);
    setIsIssuerModal(true);
  };

  const handleDetailClick = (rowData) => {
    setModalData(rowData);
    setIsDetailModal(true);
  };

  const handleUpdateClick = (rowData) => {
    setModalData(rowData);
    setIsUpdateModal(true);
  };
  const getFilteredData = (data) => {
    return data.filter((item) => {
      // Handle company name filter (case insensitive)
      const companyNameMatch =
        !companyNameFilter ||
        (item.companyName &&
          item.companyName
            .toLowerCase()
            .includes(companyNameFilter.toLowerCase()));

      // Handle CIK filter (safe with null values)
      const cikMatch =
        !cikFilter ||
        (item.cik !== null &&
          item.cik !== undefined &&
          item.cik.toString().includes(cikFilter));

      return companyNameMatch && cikMatch;
    });
  };

  //   const getCurrentPageData = () => {
  //     const startIndex = (currentPage - 1) * pageSize;
  //     const endIndex = startIndex + pageSize;
  //     const dataToFilter =
  //       selectedTab === "unprocessed" ? ISSUER_LIST : processedData;
  //     const filteredData = getFilteredData(dataToFilter);
  //     return filteredData.slice(startIndex, endIndex);
  //   };
  const getCurrentPageData = () => {
    const dataToFilter =
      selectedTab === "unprocessed" ? ISSUER_LIST : processedData || [];
    const filteredData = getFilteredData(dataToFilter);

    // Always return all filtered data when not using pagination
    // Or implement proper pagination:
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setRowSelection({});
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleGroupMapClick = () => {
    const filteredData = getFilteredData(ISSUER_LIST);
    const selectedRows = filteredData.filter(
      (_, index) => rowSelection[(currentPage - 1) * pageSize + index]
    );
    setModalData(selectedRows);
    setIsIssuerModal(true);
  };

  const totalRows =
    selectedTab === "unprocessed"
      ? getFilteredData(ISSUER_LIST).length
      : getFilteredData(processedData).length;

  const currentData = getCurrentPageData();

  // ... (keep your existing column definitions)
  const unprocessedColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
          className="custom-checkbox"
        />
      ),
      cell: ({ row }) => (
        <div className="">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
            className="custom-checkbox"
          />
        </div>
      ),
      size: 50,
    },
    {
      accessorKey: "arcId",
      header: "A R C. Id",
      cell: ({ row }) => row.original.arcId || "N/A",
      enableColumnFilters: true,
    },
    {
      accessorKey: "companyName",
      header: "Company Name",
      cell: ({ row }) => row.original.companyName || "N/A",
    },
    {
      accessorKey: "cik",
      header: "CIK",
      cell: ({ row }) => row.original.cik || "N/A",
    },
    {
      accessorKey: "irs",
      header: "IRS",
      cell: ({ row }) => row.original.irs || "N/A",
    },
    {
      accessorKey: "fileNo",
      header: "File No",
      cell: ({ row }) => row.original.fileNo || "N/A",
    },
    {
      accessorKey: "yearEnd",
      header: "Year End",
      cell: ({ row }) => row.original.yearEnd || "N/A",
    },

    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          <Button
            disabled={isAllSelected}
            onClick={() => handleMapClick(row.original)}
            // to={`/mapping/${row.original.companyName}`}
          >
            Map
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];
  const processedColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
          className="custom-checkbox"
        />
      ),
      cell: ({ row }) => (
        <div className="">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
            className="custom-checkbox"
          />
        </div>
      ),
      size: 50,
    },
    {
      accessorKey: "arcId",
      header: "Company .Id",
      cell: ({ row }) => row.original.arcId || "N/A",
      enableColumnFilters: true,
    },
    {
      accessorKey: "companyName",
      header: "Company Name",
      cell: ({ row }) => row.original.companyName || "N/A",
    },
    {
      accessorKey: "cik",
      header: "CIK",
      cell: ({ row }) => row.original.cik || "N/A",
    },
    {
      accessorKey: "irs",
      header: "IRS",
      cell: ({ row }) => row.original.irs || "N/A",
    },
    {
      accessorKey: "fileNo",
      header: "File No",
      cell: ({ row }) => row.original.fileNo || "N/A",
    },
    {
      accessorKey: "yearEnd",
      header: "Year End",
      cell: ({ row }) => row.original.yearEnd || "N/A",
    },

    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div
          className="flex items-center space-x-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            // disabled={isAllSelected}
            onClick={() => handleDetailClick(row.original)}
            // to={`/mapping/${row.original.companyName}`}
          >
            Details
          </Button>
          <Button
            // disabled={isAllSelected}
            onClick={() => handleUpdateClick(row.original)}
            // to={`/mapping/${row.original.companyName}`}
          >
            Update
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];
  return (
    <>
      <div className="flex justify-between mb-2 items-center">
        <CustomTab tabs={ProcessingTabs} onTabChange={handleTabChange} />

        <Form
          name="basic"
          autoComplete="off"
          variant="underlined"
          initialValues={{ reason: "all" }}
          className="w-full justify-end"
        >
          <Row gutter={[8, 8]} justify="end" className="custom-form">
            {isAllSelected && (
              <Col>
                <Button
                  onClick={handleGroupMapClick}
                  className="no-focus-outline"
                >
                  Group Map
                </Button>
              </Col>
            )}

            <Col lg={4}>
              <Form.Item name="companyName">
                <Input
                  placeholder="Search by company name"
                  value={companyNameFilter}
                  onChange={(e) => setCompanyNameFilter(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col lg={4}>
              <Form.Item name="cik">
                <Input
                  placeholder="Search by cik number"
                  value={cikFilter}
                  onChange={(e) => setCikFilter(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col lg={4}>
              <Form.Item name="reason">
                <Select
                  placeholder="Insertion type"
                  onChange={onReasonChange}
                  allowClear
                >
                  <Option value="all">All</Option>
                  <Option value="bot">Bot</Option>
                  <Option value="analyst">Analyst</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <div className=" custom-table-wrapper ">
        {currentData.length > 0 ? (
          <CustomDataTable
            columns={
              selectedTab === "unprocessed"
                ? unprocessedColumns
                : processedColumns
            }
            data={currentData || []}
            onRowSelect={(event, row) => handleRowClick(event, row)}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            getRowCanExpand={() => true}
            enableMultiRowSelection={true}
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
      <IssuerModal
        isIssuerModal={isIssuerModal}
        setIsIssuerModal={setIsIssuerModal}
        modalData={modalData}
        setProcessedData={setProcessedData}
      />
      <ProcessedDetailModal
        isDetailModal={isDetailModal}
        setIsDetailModal={setIsDetailModal}
        modalData={modalData}
      />
      <ProcessedUpdateModal
        isUpdateModal={isUpdateModal}
        setIsUpdateModal={setIsUpdateModal}
        modalData={modalData}
      />
      {/* Keep your modal components */}
    </>
  );
};

export default IssuerList;
