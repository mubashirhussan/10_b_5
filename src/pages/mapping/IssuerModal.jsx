import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import IndeterminateCheckbox from "../../components/IndeterminateCheckbox";
import CustomDataTable from "../../components/CustomDataTable";

const IssuerModal = ({
  isIssuerModal,
  setIsIssuerModal,
  modalData,
  setProcessedData,
}) => {
  //   const navigate = useNavigate();
  const { Option } = Select;
  const [rowSelection, setRowSelection] = useState({});
  const [form] = Form.useForm();
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // setRowSelection([]);
    // You might want to fetch new data here if using API
  };
  const handleRowClick = (e) => {
    if (e.target.type === "checkbox") {
      e.stopPropagation();
      return;
    }
    // setRowSelection(row);
  };
  console.log("rowSelection", rowSelection);
  const columns = [
    {
      id: "select",
      cell: ({ row }) => (
        <div>
          <IndeterminateCheckbox
            {...{
              checked: rowSelection?.arcId === row.original.arcId, // Single selection check
              disabled: !row.getCanSelect(),
            }}
            className="custom-checkbox"
            onChange={(e) => {
              e.stopPropagation(); // Prevent row selection propagation

              if (e.target.checked) {
                setRowSelection(row.original); // Store only the selected row

                // Set form values based on selected row
                form.setFieldsValue({
                  arcId: row.original.arcId || "",
                  companyName: row.original.companyName || "",
                  cikIrs: row.original.cikIrs || "",
                  irs: row.original.cikIrs || "",
                  fileNo: row.original.fileNo || "",
                  yearEnd: row.original.yearEnd || "",
                  cusip: row.original.cusip || "",
                  insertionType: row.original.insertionType || "",

                  businessArea: "Default Area",
                  mailAddress: "Default Address",
                  businessPhone: "123456789",
                  country: "Default Country",
                  areaCode: "000",
                });
              } else {
                setRowSelection({}); // Deselect row
                form.resetFields();
              }
            }}
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
      accessorKey: "cikIrs",
      header: "CIK IRS",
      cell: ({ row }) => row.original.cikIrs || "N/A",
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
      accessorKey: "cusip",
      header: "Cusip",
      cell: ({ row }) => row.original.cusip || "N/A",
    },
    {
      accessorKey: "insertionType",
      header: "Insertion Type",
      cell: ({ row }) => row.original.insertionType || "N/A",
    },
  ];
  // Handle modal close
  const handleModalClose = () => {
    form.resetFields(); // Clear the form
    setRowSelection({}); // Clear row selection
    setIsIssuerModal(false); // Close the modal
  };
  //   const dummyData = Array.from({ length: 15 }, (_, index) => ({
  //     arcId: `${10000 + index}`,
  //     companyName: `Company ${index + 1}`,
  //     cikIrs: `${20000 + index}`,
  //     fileNo: `${30000 + index}`,
  //     yearEnd: `${2020 + (index % 5)}`,
  //     cusip: `CUSIP${index}`,
  //     insertionType: `Type ${String.fromCharCode(65 + (index % 3))}`,
  //   }));
  const onFinish = (values) => {
    setProcessedData([values]);
    handleModalClose();
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onReasonChange = (value) => {
    console.log(value);
  };

  const totalRows = modalData.length;
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return modalData.slice(startIndex, endIndex);
  };
  //   const handleCancel = () => {
  //     navigate(-1);
  //   };

  return (
    <div>
      <Modal
        title="Mapping"
        centered
        width={1000}
        open={isIssuerModal}
        footer={null}
        onCancel={() => handleModalClose()}
        // onOk={() => setIsIssuerModal(false)}
        // onCancel={() => setIsIssuerModal(false)}
      >
        <div className="py-2">
          <Form autoComplete="off" variant={"underlined"}>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              className="justify-end mb-2 custom-form"
            >
              <Col className="gutter-row mb-0" span={6}>
                <Form.Item
                  className="mb-0"
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your company name!",
                    },
                  ]}
                >
                  <Input placeholder="Company name" />
                </Form.Item>
              </Col>

              <Col className="gutter-row mb-0" span={6}>
                <Form.Item name="reason" className="mb-0">
                  <Select
                    placeholder="Select a reason"
                    onChange={onReasonChange}
                    allowClear
                    className="mb-0"
                  >
                    <Option value="male">
                      Company Name Correctly Assigned
                    </Option>
                    <Option value="female">
                      Company Name Incorrectly Reported
                    </Option>
                    <Option value="other">Company Mapped with Name</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {/* <CustomCard className={"rounded-b-lg"}> */}
          <div className=" table-container mb-5">
            {modalData.length > 0 ? (
              <>
                <CustomDataTable
                  columns={columns}
                  data={getCurrentPageData() || []}
                  onRowSelect={(event, row) => handleRowClick(event, row)} // Pass event to handleRowClick
                  rowSelection={rowSelection}
                  enableMultiRowSelection={false}
                  setRowSelection={setRowSelection}
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

          <Card className="mt-4">
            <Form
              form={form}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label="Name"
                    name="companyName"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Cik"
                    name="cikIrs"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Irs"
                    name="irs"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="File No"
                    name="fileNo"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label="Business Area"
                    name="businessArea"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Mail Address"
                    name="mailAddress"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Business Phone"
                    name="businessPhone"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label="Area Code"
                    name="areaCode"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row className="justify-end custom-form gap-2">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    color="default"
                    className="  !outline-none"
                    variant="text"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Card>

          {/* </CustomCard> */}
        </div>
      </Modal>
    </div>
  );
};

export default IssuerModal;
