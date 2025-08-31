import React, { useState } from "react";
import { Button, DatePicker, Divider, Form, Input, Modal, Space, message } from "antd";
import { useMutation, gql } from '@apollo/client';
import { useUser } from "@auth0/nextjs-auth0/client";
import BodyMap from "./bodyMap";

interface EncircledArea {
  id: number;
  x: number;
  y: number;
  detail: string;
}

const CREATE_INJURY_REPORT = gql`
  mutation CreateInjuryReport($userId: String!, $name: String!, $datetime: String!) {
    createInjuryReport(userId: $userId, name: $name, datetime: $datetime) {
      id
    }
  }
`;

const CREATE_INJURY_DETAIL = gql`
  mutation CreateInjuryDetail($reportId: Int!, $injuryDescription: String!, $x: Float!, $y: Float!) {
    createInjuryDetail(reportId: $reportId, injuryDescription: $injuryDescription, x: $x, y: $y) {
      id
    }
  }
`;

const CreateReportModal: React.FC<{ isOpen: boolean; onClose: () => void, refetchReports: () => void }> = ({
  isOpen,
  onClose,
  refetchReports
}) => {
  const { user } = useUser();
  const [EncircledAreas, setEncircledAreas] = useState<EncircledArea[]>([]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [createInjuryReport, { loading: creatingReport }] = useMutation(CREATE_INJURY_REPORT);
  const [createInjuryDetail, { loading: creatingDetail }] = useMutation(CREATE_INJURY_DETAIL);

  const onSave = async (values: any) => {
    try {
      const reportResult = await createInjuryReport({
        variables: {
          userId: user?.sub,
          name: values.name,
          datetime: values.datetime.toISOString(),
        },
      });

      const reportId = reportResult.data.createInjuryReport.id;

      if (reportId) {
        await Promise.all(
          EncircledAreas.map((area) =>
            createInjuryDetail({
              variables: {
                reportId: reportId,
                injuryDescription: area.detail,
                x: area.x,
                y: area.y,
              },
            })
          )
        );
      }
      message.success("Report Saved");
      refetchReports();
      onClose();
    } catch (e) {
      console.error(e);
      message.error("Failed to save report");
    }
  };

  function updateEncircledAreas(areas: EncircledArea[]): void {
    setEncircledAreas(areas);
  }

  return (
    <>
      <Modal
        title="Create Report"
        centered
        open={isOpen}
        maskClosable={false}
        width={1000}
        onCancel={onClose}
        destroyOnClose={true}
        footer={null}
      >
        <Divider />
        <Form {...layout} name="control-hooks" onFinish={onSave}>
          <Form.Item name="name" label="Name" required>
            <Input />
          </Form.Item>
          <Form.Item name="datetime" label="Date/Time">
            <DatePicker showTime />
          </Form.Item>
          <Divider />
          <BodyMap onUpdateEncircledAreas={updateEncircledAreas} initialAreas={EncircledAreas} />
          <Divider />
          <Form.Item wrapperCol={{ span: 24 }}>
            <Space style={{ float: "right" }}>
              <Button
                danger
                onClick={onClose}
                size="large"
                style={{ padding: "0 40px" }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                className="bg-mauve"
                    htmlType="submit"                    
                    loading={creatingReport || creatingDetail}
                size="large"
                style={{ padding: "0 40px" }}
              >
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateReportModal;
