/* eslint-disable no-debugger */
// import { Link } from "react-router-dom";
import CustomDataTable from "../../components/CustomDataTable";
// import CustomCard from "../../components/CustomCard";
import { useEffect, useState } from "react";
import IndeterminateCheckbox from "../../components/IndeterminateCheckbox";
import CustomTab from "../../components/CustomTab";
import { Button, Col, Form, Input, Row, Select } from "antd";
import AffiliateModal from "./AffiliateModal";
import ProcessedDetailModal from "./ProcessedDetailModal";
import ProcessedUpdateModal from "./ProcessedUpdateModal";

const AffiliateList = () => {
  const { Option } = Select; // Correct way to get Option
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [expandedRowState, setExpandedRowState] = useState([]);
  const [isAffiliateModal, setIsAffiliateModal] = useState(false);
  const [processedData, setProcessedData] = useState();

  const [modalData, setModalData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("unprocessed");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Items per page
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  console.log("processedData", processedData);
  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setRowSelection({});
    // You might want to fetch new data here if using API
  };

  // const [columnFilters, setColumnFilters] = useState([]);
  useEffect(() => {
    setIsAllSelected(Object.keys(rowSelection).length > 1);
  }, [rowSelection, setIsAllSelected]);

  const handleRowClick = (e, row) => {
    if (e.target.type === "checkbox") {
      e.stopPropagation(); // Prevent row selection when clicking checkbox
      return;
    }
    row.toggleExpanded();
    setExpandedRowStateById(row.id, row.original, row.index);
  };
  const setExpandedRowStateById = (id, content, columnIndex) => {
    expandedRowState[id] = { content, columnIndex };
    setExpandedRowState([...expandedRowState]);
  };
  const ProcessingTabs = [
    { value: "unprocessed", label: "Unprocessed" },
    { value: "processed", label: "Processed" },
  ];

  const handleTabChange = (value) => {
    setSelectedTab(value);
    console.log("Selected Tab:", value);
  };
  const onReasonChange = (value) => {
    console.log(value);
  };
  const handleMapClick = (rowData) => {
    setModalData([rowData]); // For single row, wrap in array
    setIsAffiliateModal(true);
  };
  const handleDetailClick = (rowData) => {
    setModalData(rowData); // For single row, wrap in array
    setIsDetailModal(true);
  };
  const handleUpdateClick = (rowData) => {
    setModalData(rowData); // For single row, wrap in array
    setIsUpdateModal(true);
  };
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
      accessorKey: "araId",
      header: "A R A. Id",
      cell: ({ row }) => row.original.araId || "N/A",
      enableColumnFilters: true,
    },
    {
      accessorKey: "affiliateName",
      header: "Affiliate Name",
      cell: ({ row }) => row.original.affiliateName || "N/A",
    },
    {
      accessorKey: "cik",
      header: "CIK",
      cell: ({ row }) => row.original.cik || "N/A",
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
      accessorKey: "araId",
      header: "A R A. Id",
      cell: ({ row }) => row.original.araId || "N/A",
      enableColumnFilters: true,
    },
    {
      accessorKey: "affiliateName",
      header: "Affiliate Name",
      cell: ({ row }) => row.original.affiliateName || "N/A",
    },
    {
      accessorKey: "cik",
      header: "CIK",
      cell: ({ row }) => row.original.cik || "N/A",
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
  const columns =
    selectedTab === "unprocessed" ? unprocessedColumns : processedColumns;
  const dummyData = Array.from({ length: 125 }, (_, index) => ({
    araId: `${10000 + index}`,
    affiliateName: `Company ${index + 1}`,
    cik: `${20000 + index}`,
  }));
  // Calculate total rows (or get from API response)
  //   const totalRows = dummyData.length;
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing size
  };
  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return dummyData.slice(startIndex, endIndex);
  };
  // Handle group map button click
  const handleGroupMapClick = () => {
    const selectedRows = dummyData.filter(
      (_, index) => rowSelection[(currentPage - 1) * pageSize + index]
    );
    setModalData(selectedRows);
    setIsAffiliateModal(true);
  };
  const currentData =
    selectedTab === "unprocessed" ? getCurrentPageData() : processedData || []; // default to empty array
  const totalRows =
    selectedTab === "unprocessed" ? dummyData.length : processedData;
  return (
    <>
      <div className="flex justify-between mb-2 items-center">
        {/* Tabs on the Left Side */}
        <CustomTab tabs={ProcessingTabs} onTabChange={handleTabChange} />

        {/* Form on the Right Side */}
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
                  // disabled={!isAllSelected}
                  //   to={`/mapping/${123}`}
                >
                  Group Map
                </Button>
              </Col>
            )}

            <Col lg={4}>
              <Form.Item
                name="companyName"
                rules={[
                  {
                    required: true,
                    message: "Please input your company name!",
                  },
                ]}
              >
                <Input placeholder="Search by company name" />
              </Form.Item>
            </Col>
            <Col lg={4}>
              <Form.Item
                name="cik"
                rules={[
                  {
                    required: true,
                    message: "Please input your company name!",
                  },
                ]}
              >
                <Input placeholder="Search by cik number" />
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
          <>
            <CustomDataTable
              columns={columns}
              data={currentData || []} // Pass only current page data
              onRowSelect={(event, row) => handleRowClick(event, row)} // Pass event to handleRowClick
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              expandedRowContent={expandedRowState}
              getRowCanExpand={() => true}
              enableMultiRowSelection={true}
              currentPage={currentPage}
              totalRows={totalRows}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        ) : (
          <div className="text-center text-gray-500">No record found.</div>
        )}
      </div>
      <AffiliateModal
        isAffiliateModal={isAffiliateModal}
        setIsAffiliateModal={setIsAffiliateModal}
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
    </>
  );
};

export default AffiliateList;
