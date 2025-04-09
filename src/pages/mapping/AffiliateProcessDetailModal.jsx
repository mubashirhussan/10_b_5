import { Modal, Row, Col, Card, Typography, Button } from "antd";
import React from "react";

const { Text } = Typography;

const AffiliateProcessDetailModal = ({
  isDetailModal,
  setIsDetailModal,
  modalData,
}) => {
  return (
    <Modal
      title="Mapping Detail"
      centered
      width={800}
      open={isDetailModal}
      //   footer={null}
      onCancel={() => setIsDetailModal(false)}
      footer={[
        <Button
          key="cancel"
          type="primary"
          onClick={() => setIsDetailModal(false)}
        >
          Cancel
        </Button>,
      ]}
    >
      <Card>
        <Row gutter={[16, 24]}>
          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text strong style={{ marginBottom: 4 }}>
                Affiliate ID
              </Text>
              <Text>{modalData?.araId || "N/A"}</Text>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text strong style={{ marginBottom: 4 }}>
                Affiliate Name
              </Text>
              <Text>{modalData?.affiliateName || "N/A"}</Text>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text strong style={{ marginBottom: 4 }}>
                CIK
              </Text>
              <Text>{modalData?.cik || "N/A"}</Text>
            </div>
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default AffiliateProcessDetailModal;
