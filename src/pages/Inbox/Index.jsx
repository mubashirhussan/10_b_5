import React, { useState } from "react";
import CustomDataTable from "../../components/CustomDataTable";
import IndeterminateCheckbox from "../../components/IndeterminateCheckbox";
import { Button, Select, DatePicker, Input, Row, Col, Space } from "antd";
import { ClearOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

const Index = () => {
  const [expandedRowState, setExpandedRowState] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
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
    { value: "10k", label: "10-K" },
    { value: "10q", label: "10-Q" },
    { value: "8k", label: "8-K" },
    { value: "4", label: "Form 4" },
    { value: "5", label: "Form 5" },
  ];

  const columns = [
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
    { header: "FID", accessorKey: "fid", enableSorting: true },
    { header: "Company", accessorKey: "company", enableSorting: true },
    { header: "Insider", accessorKey: "insider", enableSorting: true },
    { header: "Designation", accessorKey: "designation" },
    { header: "Filing Type", accessorKey: "filingType" },
    { header: "Adoption Date", accessorKey: "adoptionDate" },
    {
      header: "Termination Date/Expiration Date",
      accessorKey: "terminationDate",
    },
    { header: "Security", accessorKey: "security" },
    { header: "Duration", accessorKey: "duration" },
    { header: "Shares", accessorKey: "planShares" },
    // { header: "Additional Info.", accessorKey: "additionalInfo" },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          <Button
            // disabled={isAllSelected}
            to={`/mapping/${row.original.companyName}`}
          >
            Map
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

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

  // ... (keep your existing dummyData array)
  const dummyData = [
    {
      fid: "FID0001",
      company: "COINBASE GLOBAL INC",
      insider: "Brian Armstrong",
      designation: "Founder, Chairman / CEO",
      adoptionDate: "15-Aug-2024",
      terminationDate: "14-Nov-2025",
      planShares: "3,750,000",
      reportedSell: "1,450,000",
      remainingShares: "2,300,000",
      remarks: "10-Q   361days",
      security: "company stock",
      filingType: "10k",
      duration: 187,
    },
    {
      fid: "FID0002",
      company: "COINBASE GLOBAL INC",
      insider: "Brian Armstrong",
      designation: "Founder, Chairman / CEO",
      adoptionDate: "16-Aug-2023",
      terminationDate: "15-Nov-2024",
      planShares: "1,800,000",
      reportedSell: "1,032,178",
      remainingShares: "767,822",
      remarks: "No remarks",
      security: "company stock",
      filingType: "10k",
      duration: 187,
    },
    {
      fid: "FID0003",
      company: "TESLA INC",
      insider: "Baglino Andrew D",
      designation: "Senior Vice President",
      adoptionDate: "13-Nov-2023",
      terminationDate: "31-Dec-24",
      planShares: "115,000",
      reportedSell: "11,799",
      remainingShares: "",
      remarks: "No remarks",
      security: "company stock",
      filingType: "10k",
      duration: 187,
    },
    {
      fid: "FID0004",
      company: "TESLA INC",
      insider: "Baglino Andrew D",
      designation: "Senior Vice President",
      adoptionDate: "1-Nov-2021",
      terminationDate: "N/A",
      planShares: "",
      reportedSell: "217,015",
      remainingShares: "",
      remarks: "No remarks",
      security: "company stock",
      filingType: "10k",
      duration: 187,
    },
    {
      fid: "FID0005",
      company: "TESLA INC",
      insider: "DENHOLM ROBYN M",
      designation: "Independent Chairman of the Board",
      adoptionDate: "25-Jul-2024",
      terminationDate: "18-Jun-25",
      planShares: "674,345",
      reportedSell: "112,390",
      remainingShares: "561,955",
      remarks: "No remarks",
      security: "company stock",
      filingType: "10k",
      duration: 187,
    },
    {
      fid: "FID0006",
      company: "TESLA INC",
      insider: "DENHOLM ROBYN M",
      designation: "Independent Chairman of the Board",
      adoptionDate: "23-Oct-2023",
      terminationDate: "16-Aug-24",
      planShares: "281,116",
      reportedSell: "187,411",
      remainingShares: "",
      remarks: "No remarks",
      security: "company stock",
      filingType: "10k",
      duration: 187,
    },
    {
      fid: "FID0007",
      company: "TESLA INC",
      insider: "Kirkhorn Zachary",
      designation: "CFO",
      adoptionDate: "29-Jul-2202",
      terminationDate: "N/A",
      planShares: "",
      reportedSell: "7,502",
      remainingShares: "",
      remarks: "No remarks",
      security: "company stock",
      filingType: "10k",
      duration: 187,
    },
    {
      fid: "FID0008",
      company: "NVIDIA CORPORATION",
      insider: "Kress Colette",
      designation: "CFO",
      adoptionDate: "22-Mar-2024",
      terminationDate: "15-May-2025",
      planShares: "50,000",
      reportedSell: "433,340",
      remainingShares: "66,660",
      remarks:
        "Split of 1:10 on 2024-06-10 , making the plan to 500,000 from 50,000",
      security: "company stock",
      filingType: "10k",
      duration: 187,
    },
    {
      fid: "FID0009",
      company: "NVIDIA CORPORATION",
      insider: "Kress Colette",
      designation: "CFO",
      adoptionDate: "24-Mar-2022",
      terminationDate: "N/A",
      planShares: "N/A",
      reportedSell: "12,124",
      remainingShares: "",
      remarks: "No remarks",
      security: "company stock",
      filingType: "10k",
      duration: 187,
    },
    {
      fid: "FID0010",
      company: "NVIDIA CORPORATION",
      insider: "Huang Jen Hsun",
      designation: "President and Chief Executive Officer",
      adoptionDate: "14-Mar-2024",
      terminationDate: "31-Mar-2025",
      planShares: "600,000",
      reportedSell: "6,000,000",
      remainingShares: "0",
      remarks:
        "Split of 1:10 on 2024-06-10 , making the plan to 6,000,000 from 600,000",
      security: "company stock",
      filingType: "10k",
      duration: 187,
    },
    {
      fid: "FID0011",
      company: "META PLATFORMS INC",
      insider: "Clegg Nicholas",
      designation: "President (division / unit / region)",
      adoptionDate: "12-May-2024",
      terminationDate: "16-May-2025",
      planShares: "7,528",
      reportedSell: "7,290",
      remainingShares: "",
      remarks: "No remarks",
      security: "company stock",
      filingType: "10k",
      duration: 187,
    },
  ];
  // Calculate total rows (or get from API response)
  const filteredData = filterData(dummyData);
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
    setRowSelection({});
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
                onRowSelect={(event, row) => handleRowClick(event, row)}
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
            <div className="text-center text-gray-500">No reports found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
