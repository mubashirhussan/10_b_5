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
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import IndeterminateCheckbox from "../../components/IndeterminateCheckbox";
import CustomDataTable from "../../components/CustomDataTable";

const AffiliateModal = ({
  isAffiliateModal,
  setIsAffiliateModal,
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
  const [searchForm] = Form.useForm(); // Search form
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
              checked: rowSelection?.araId === row.original.araId, // Single selection check
              disabled: !row.getCanSelect(),
            }}
            className="custom-checkbox"
            onChange={(e) => {
              e.stopPropagation(); // Prevent row selection propagation

              if (e.target.checked) {
                setRowSelection(row.original); // Store only the selected row

                // Set form values based on selected row
                form.setFieldsValue({
                  araId: row.original.araId || "",
                  affiliateName: row.original.affiliateName || "",
                  cik: row.original.cik || "",
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
  ];
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
  // Handle modal close
  const handleModalClose = () => {
    form.resetFields(); // Clear the form
    setRowSelection({}); // Clear row selection
    setIsAffiliateModal(false); // Close the modal
  };
  useEffect(() => {
    if (isAffiliateModal && modalData.length > 0) {
      // Assuming modalData contains the selected row
      const selectedRow = modalData[0]; // or use the appropriate logic to get the selected row
      searchForm.setFieldsValue({
        affiliateName: selectedRow.affiliateName || "",
        // Set other fields if needed
      });
    }
  }, [isAffiliateModal, modalData, form]);
  return (
    <div>
      <Modal
        title="Mapping"
        centered
        width={1000}
        open={isAffiliateModal}
        footer={null}
        onCancel={() => handleModalClose()}
        // onOk={() => setIsIssuerModal(false)}
        // onCancel={() => setIsIssuerModal(false)}
      >
        <div className="py-2">
          <Form autoComplete="off" form={searchForm} variant={"underlined"}>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              className="justify-end mb-2 custom-form"
            >
              <Col className="gutter-row mb-0" span={6}>
                <Form.Item
                  className="mb-0"
                  name="affiliateName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your affiliate name!",
                    },
                  ]}
                >
                  <Input placeholder="Affiliate name" />
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
                    name="affiliateName"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="CIk"
                    name="cik"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="ARA. ID"
                    name="araId"
                    rules={[{ required: true, message: "Please input!" }]}
                    hidden
                  >
                    <Input />
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

export default AffiliateModal;
