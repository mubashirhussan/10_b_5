import { Modal, Row, Col, Card, Typography, Button } from "antd";
import React from "react";

const { Text } = Typography;

const ProcessedDetailModal = ({
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
                ARC ID
              </Text>
              <Text>{modalData?.arcId || "N/A"}</Text>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text strong style={{ marginBottom: 4 }}>
                Company Name
              </Text>
              <Text>{modalData?.companyName || "N/A"}</Text>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text strong style={{ marginBottom: 4 }}>
                CIK IRS
              </Text>
              <Text>{modalData?.cikIrs || "N/A"}</Text>
            </div>
          </Col>

          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text strong style={{ marginBottom: 4 }}>
                File No
              </Text>
              <Text>{modalData?.fileNo || "N/A"}</Text>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text strong style={{ marginBottom: 4 }}>
                Year End
              </Text>
              <Text>{modalData?.yearEnd || "N/A"}</Text>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text strong style={{ marginBottom: 4 }}>
                CUSIP
              </Text>
              <Text>{modalData?.cusip || "N/A"}</Text>
            </div>
          </Col>

          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text strong style={{ marginBottom: 4 }}>
                Insertion Type
              </Text>
              <Text>{modalData?.insertionType || "N/A"}</Text>
            </div>
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default ProcessedDetailModal;
