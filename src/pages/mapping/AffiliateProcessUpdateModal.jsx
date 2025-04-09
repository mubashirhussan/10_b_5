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

const AffiliateProcessUpdateModal = ({
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
        araId: modalData.araId,
        affiliateName: modalData.affiliateName,
        cik: modalData.cik,
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
              <Form.Item name="araId" label="Affiliate ID">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="affiliateName" label="Affiliate Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="cik" label="CIK ">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  );
};

export default AffiliateProcessUpdateModal;
