import { Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";

const AddFormModal = ({ modalData, isSecurityModal, setIsSecurityModal }) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Submitted Forms:", values.securityForms);
        setIsSecurityModal(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const noOfForms = modalData?.noOfSecurityFormsToBeAdded || 0;
  const handleModalClose = () => {
    form.resetFields();
    setIsSecurityModal(false);
  };
  const onSecurityChange = (values) => {
    console.log("values", values);
  };
  return (
    <Modal
      title="Add Form"
      centered
      width={1000}
      open={isSecurityModal}
      //   footer={null}
      onCancel={() => handleModalClose()}
      okText="Add"
      onOk={handleOk}

      // onCancel={() => setIsIssuerModal(false)}
    >
      <Form form={form} layout="vertical">
        {Array.from({ length: noOfForms }).map((_, index) => (
          <div key={index} className="p-2 border border-gray-300 rounded mb-3 ">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="shares" label="Enter No of Shares">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="shareType" label="Select Share Type">
                  <Select
                    placeholder="Share type"
                    onChange={onSecurityChange}
                    allowClear
                  >
                    <Option value="a">Common Stock A</Option>
                    <Option value="b">Common Stock B</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
        ))}
      </Form>
    </Modal>
  );
};

export default AddFormModal;
