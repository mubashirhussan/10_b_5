import React, { useState } from "react";
import CustomDataTable from "../../components/CustomDataTable";
import IndeterminateCheckbox from "../../components/IndeterminateCheckbox";
import {
  Button,
  Select,
  DatePicker,
  Input,
  Row,
  Col,
  Space,
  Tooltip,
} from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { DATA_VIEW_LIST } from "../../data";

const { Option } = Select;
const { Search } = Input;

const Index = () => {
  // const [expandedRowState, setExpandedRowState] = useState([]);
  // const [rowSelection, setRowSelection] = useState({});
  const [filters, setFilters] = useState({
    fid: null,
    filingType: null,
    company: null,
    insider: null,
    reportedDate: null,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Items per page

  // Filing type options for dropdown
  const filingTypeOptions = [
    { value: "10-K", label: "10-K" },
    { value: "10-Q", label: "10-Q" },
  ];

  const columns = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <IndeterminateCheckbox
    //       {...{
    //         checked: table.getIsAllRowsSelected(),
    //         indeterminate: table.getIsSomeRowsSelected(),
    //         onChange: table.getToggleAllRowsSelectedHandler(),
    //       }}
    //       className="custom-checkbox"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <div className="">
    //       <IndeterminateCheckbox
    //         {...{
    //           checked: row.getIsSelected(),
    //           disabled: !row.getCanSelect(),
    //           indeterminate: row.getIsSomeSelected(),
    //           onChange: row.getToggleSelectedHandler(),
    //         }}
    //         className="custom-checkbox"
    //       />
    //     </div>
    //   ),
    //   size: 50,
    // },
    {
      header: "FID",
      accessorKey: "fid",
      enableSorting: true,
      size: 100,
    },
    {
      header: "Company",
      accessorKey: "company",
      enableSorting: true,
      size: 150,
      minSize: 50,
      maxSize: 500,
      cell: ({ getValue }) => (
        <div className="break-words whitespace-normal">{getValue()}</div>
      ),
    },
    {
      header: "Insider",
      accessorKey: "insider",
      enableSorting: true,
      cell: ({ getValue }) => (
        <div className="break-words whitespace-normal">{getValue()}</div>
      ),
      size: 170,
      minSize: 50,
      maxSize: 500,
    },
    {
      header: "Designation",
      accessorKey: "designation",
      cell: ({ getValue }) => (
        <div className="break-words whitespace-normal">{getValue()}</div>
      ),
      size: 170,
      minSize: 50,
      maxSize: 500,
    },
    {
      header: "Filing Type",
      accessorKey: "filingType",
      cell: ({ getValue }) => (
        <div className="break-words whitespace-normal">{getValue()}</div>
      ),
      size: 50,
      minSize: 50,
      maxSize: 500,
    },
    { header: "Adoption Date", accessorKey: "adoptionDate" },
    {
      header: () => (
        <div className="text-center ">
          <div>Termination Date/</div>
          <div>Expiration Date</div>
        </div>
      ),
      accessorKey: "terminationDate",
      cell: ({ getValue }) => (
        <div className="break-words whitespace-normal">{getValue()}</div>
      ),
      size: 150,
      minSize: 50,
      maxSize: 500,
    },
    { header: "Security", accessorKey: "security" },
    { header: "Duration", accessorKey: "duration", size: 50 },
    { header: "Shares", accessorKey: "planShares", size: 50 },
    {
      header: "Plan",
      accessorKey: "plan",
      cell: ({ getValue }) => {
        const plan = getValue();
        const map = {
          A: "Amended",
          N: "New",
          T: "Terminated",
        };
        return (
          <Tooltip title={map[plan] || "N/A"}>
            <span className="cursor-pointer bg-gray-200 px-2 py-1 rounded">
              {plan}
            </span>
          </Tooltip>
        );
      },
      size: 50,
    },
    {
      header: "Material Info",
      accessorKey: "materialInfo",
      cell: ({ getValue }) => (
        <textarea
          defaultValue={getValue()}
          className="w-full min-h-[30px] p-2  rounded"
          onChange={(e) => {
            // Optional: handle change if needed
            console.log("Updated value:", e.target.value);
          }}
        />
      ),
      size: 200,
      minSize: 50,
      maxSize: 500,
    },
    // {
    //   header: "Aggregate no of shares",
    //   accessorKey: "aggregate",
    //   cell: ({ getValue }) => (
    //     <div className="break-words whitespace-normal">{getValue()}</div>
    //   ),
    //   size: 200,
    //   minSize: 50,
    //   maxSize: 500,
    // },
    {
      header: "Aggregate no of shares",
      accessorKey: "aggregate",
      cell: ({ getValue, row, column }) => (
        <textarea
          defaultValue={getValue()}
          className="w-full min-h-[30px] p-2  rounded"
          onChange={(e) => {
            // Optional: handle change if needed
            console.log("Updated value:", e.target.value);
          }}
        />
      ),
      size: 200,
      minSize: 50,
      maxSize: 500,
    },
    // { header: "Additional Info.", accessorKey: "additionalInfo" },
    // {
    //   accessorKey: "actions",
    //   header: "Actions",
    //   cell: ({ row }) => (
    //     <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
    //       <Button
    //         // disabled={isAllSelected}
    //         to={`/mapping/${row.original.companyName}`}
    //       >
    //         Map
    //       </Button>
    //     </div>
    //   ),
    //   enableSorting: false,
    // },
  ];

  // const handleRowClick = (e, row) => {
  //   if (e.target.type === "checkbox") {
  //     e.stopPropagation();
  //     return;
  //   }
  //   row.toggleExpanded();
  //   setExpandedRowStateById(row.id, row.original, row.index);
  // };

  // const setExpandedRowStateById = (id, content, columnIndex) => {
  //   expandedRowState[id] = { content, columnIndex };
  //   setExpandedRowState([...expandedRowState]);
  // };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const filterData = (data) => {
    return data.filter((item) => {
      // Filter by FID (case-insensitive partial match)
      if (
        filters.fid &&
        !item.fid.toLowerCase().includes(filters.fid.toLowerCase())
      ) {
        return false;
      }

      // Filter by filing type
      if (filters.filingType && item.filingType !== filters.filingType) {
        return false;
      }

      // Filter by company (case-insensitive partial match)
      if (
        filters.company &&
        !item.company.toLowerCase().includes(filters.company.toLowerCase())
      ) {
        return false;
      }

      // Filter by insider (case-insensitive partial match)
      if (
        filters.insider &&
        !item.insider.toLowerCase().includes(filters.insider.toLowerCase())
      ) {
        return false;
      }

      // Filter by reported date (compare dates)
      if (filters.reportedDate) {
        const filterDate = filters.reportedDate.startOf("day");
        const itemDate = new Date(item.adoptionDate);
        const itemDateStart = new Date(
          itemDate.getFullYear(),
          itemDate.getMonth(),
          itemDate.getDate()
        );

        if (!filterDate.isSame(itemDateStart)) {
          return false;
        }
      }

      return true;
    });
  };

  // Calculate total rows (or get from API response)
  const filteredData = filterData(DATA_VIEW_LIST);
  const totalRows = filteredData.length;

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing size
  };

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // setRowSelection({});
  };
  // Add this function to handle clearing all filters
  const clearAllFilters = () => {
    setFilters({
      fid: null,
      filingType: null,
      company: null,
      insider: null,
      reportedDate: null,
    });
    setCurrentPage(1); // Reset to first page when clearing filters
  };
  return (
    <div>
      <div className="custom-table-wrapper">
        {/* Filters Section */}
        <div className="mb-4 p-4 bg-white rounded shadow">
          <Row gutter={[16, 16]} wrap>
            <Col xs={24} sm={12} md={8} lg={4}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search by FID
                </label>
                <Search
                  placeholder="Enter FID"
                  allowClear
                  size="middle"
                  value={filters.fid || ""}
                  onSearch={(value) => handleFilterChange("fid", value)}
                  onChange={(e) => handleFilterChange("fid", e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filing Type
                </label>
                <Select
                  placeholder="Select filing type"
                  style={{ width: "100%" }}
                  size="middle"
                  allowClear
                  value={filters.filingType || undefined}
                  onChange={(value) => handleFilterChange("filingType", value)}
                >
                  {filingTypeOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <Search
                  placeholder="Enter company name"
                  allowClear
                  size="middle"
                  value={filters.company || ""}
                  onSearch={(value) => handleFilterChange("company", value)}
                  onChange={(e) =>
                    handleFilterChange("company", e.target.value)
                  }
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insider
                </label>
                <Search
                  placeholder="Enter insider name"
                  allowClear
                  size="middle"
                  value={filters.insider || ""}
                  onSearch={(value) => handleFilterChange("insider", value)}
                  onChange={(e) =>
                    handleFilterChange("insider", e.target.value)
                  }
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reported Date
                </label>
                <DatePicker
                  style={{ width: "100%" }}
                  size="middle"
                  placeholder="Select date"
                  value={filters.reportedDate}
                  onChange={(date) => handleFilterChange("reportedDate", date)}
                  showToday={false}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={4}>
              <div className="flex items-end h-full">
                <Button
                  type="default"
                  icon={<ClearOutlined />}
                  onClick={clearAllFilters}
                  className="w-full"
                  disabled={
                    !Object.values(filters).some((filter) => filter !== null)
                  }
                >
                  Clear All Filters
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <div className="table-container">
          {filteredData.length > 0 ? (
            <>
              <CustomDataTable
                columns={columns}
                data={getCurrentPageData() || []}
                // onRowSelect={(event, row) => handleRowClick(event, row)}
                // rowSelection={rowSelection}
                // setRowSelection={setRowSelection}
                // expandedRowContent={expandedRowState}
                // getRowCanExpand={() => true}
                // enableMultiRowSelection={true}
                currentPage={currentPage}
                totalRows={totalRows}
                pageSize={pageSize}
                handlePageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          ) : (
            <div className="text-center text-gray-500">No reports found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
