import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  message,
} from "antd";
import dayjs from 'dayjs';
import BodyMap from "./bodyMap";

interface EncircledArea {
  id: number;
  x: number;
  y: number;
  detail: string;
}

const GET_REPORT = gql`
  query GetReport($id: Int!) {
    getReport(id: $id) {
      id
      name
      datetime
      injuries {
        id
        injuryDescription
        x
        y
      }
    }
  }
`;

const UPDATE_INJURY_REPORT = gql`
  mutation UpdateInjuryReport(
    $id: Int!
    $name: String
    $datetime: String
    $injuries: [InjuryDetailInput!]
  ) {
    updateInjuryReport(
      id: $id
      name: $name
      datetime: $datetime
      injuries: $injuries
    ) {
      id
    }
  }
`;

const DELETE_INJURY_REPORT = gql`
  mutation DeleteInjuryReport($id: Int!) {
    deleteInjuryReport(id: $id) {
      id
    }
  }
`;

const EditReportModal: React.FC<{ isOpen: boolean; onClose: () => void; reportId: number, refetchReports: () => void; }> = ({
  isOpen,
  onClose,
  reportId,
  refetchReports
}) => {
  const [form] = Form.useForm();
  const [EncircledAreas, setEncircledAreas] = useState<EncircledArea[]>([]);

  const { data, loading } = useQuery(GET_REPORT, {
    variables: { id: reportId },
    skip: !isOpen || !reportId,
    fetchPolicy: 'network-only',
  });

  const [updateReportMutation, { loading: updating }] = useMutation(UPDATE_INJURY_REPORT);
  const [deleteReportMutation] = useMutation(DELETE_INJURY_REPORT);

  useEffect(() => {
    if (isOpen && data?.getReport) {
        const report = data.getReport;
        form.setFieldsValue({
            name: report.name,
            datetime: report.datetime ? dayjs(Number(report.datetime)) : null,
        });
        const mappedAreas = report.injuries.map((injury: any) => ({
            id: injury.id,
            x: injury.x,
            y: injury.y,
            detail: injury.injuryDescription,
        }));
        setEncircledAreas(mappedAreas);
    }
  }, [data, form, isOpen]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const deleteReport = async () => {
    try {
      await deleteReportMutation({ variables: { id: reportId } });
      message.success('Report deleted');
      refetchReports();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      message.error('Failed to delete report');
    }
  };

  const onSave = async (values: any) => {
    try {
      const injuriesToSave = EncircledAreas.map(area => ({
        injuryDescription: area.detail,
        x: area.x,
        y: area.y,
      }));

      await updateReportMutation({
        variables: {
          id: reportId,
          name: values.name,
          datetime: values.datetime?.toISOString(),
          injuries: injuriesToSave,
        }
      });
      message.success('Report updated');
      refetchReports();
      onClose();
    } catch (e) {
      console.error(e);
      message.error('Failed to update report');
    }
  };

  function updateEncircledAreas(areas: EncircledArea[]): void {
    setEncircledAreas(areas);
  }

  return (
    <>
      <Modal
        title={loading ? "Loading Report..." : "Edit Report"}
        centered
        open={isOpen}
        maskClosable={false}
        width={1000}
        onCancel={onClose}
        destroyOnClose={true}
        footer={null}
      >
        <Divider />
        <Form {...layout} form={form} name="control-hooks" onFinish={onSave}>
          <Form.Item name="name" label="Name">
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
              <Popconfirm
                title="Delete the task"
                description="Are you sure want to delete this report?"
                onConfirm={deleteReport}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  danger
                  type="primary"
                  size="large"
                  style={{ padding: "0 40px" }}
                >
                  Delete
                </Button>
              </Popconfirm>
              <Button
                type="primary"
                className="bg-mauve"
                htmlType="submit"
                loading={updating}
                size="large"
                style={{ padding: "0 40px" }}
              >
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditReportModal;
