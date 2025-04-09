import {
  Modal,
  Row,
  Col,
  Card,
  Typography,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import React, { useEffect } from "react";

const { Text } = Typography;

const ProcessedUpdateModal = ({
  isUpdateModal,
  setIsUpdateModal,
  modalData,
}) => {
  const [form] = Form.useForm();
  // Set form fields with modalData when modal opens or data changes
  useEffect(() => {
    if (isUpdateModal && modalData) {
      console.log("Modal Data:", modalData); // Add this line
      form.setFieldsValue({
        arcId: modalData.arcId,
        companyName: modalData.companyName,
        cikIrs: modalData.cikIrs,
        fileNo: modalData.fileNo,
        yearEnd: modalData.yearEnd,
        cusip: modalData.cusip,
        insertionType: modalData.insertionType,
      });
    }
  }, [isUpdateModal, modalData, form]);

  const handleSubmit = (values) => {
    console.log("Received values:", values);
    // Here you would typically call an API to update the data
    setIsUpdateModal(false);
  };

  return (
    <Modal
      title="Update Company Detail"
      centered
      width={800}
      open={isUpdateModal}
      onOk={() => form.submit()}
      okText="Update"
      onCancel={() => setIsUpdateModal(false)}
    >
      <Card>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={isUpdateModal ? modalData : {}}
        >
          <Row gutter={[16, 24]}>
            <Col span={6}>
              <Form.Item name="arcId" label="ARC ID">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="companyName" label="Company Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="cikIrs" label="CIK IRS">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="fileNo" label="File No">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="yearEnd" label="Year End">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="cusip" label="CUSIP">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="insertionType" label="Insertion Type">
                <Select>
                  <Select.Option value="Type1">Type 1</Select.Option>
                  <Select.Option value="Type2">Type 2</Select.Option>
                  <Select.Option value="Type3">Type 3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  );
};

export default ProcessedUpdateModal;
