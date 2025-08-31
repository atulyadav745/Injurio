import React, { useEffect, useRef, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button, Input, InputRef, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { DownloadOutlined } from '@ant-design/icons';
import { useUser } from "@auth0/nextjs-auth0/client";
import { FilterConfirmProps } from "antd/es/table/interface";
import CreateReportModal from "@/components/createReportModal";
import EditReportModal from "@/components/editReportModal";
import { CSVLink } from 'react-csv';

const GET_INJURY_REPORTS_BY_USER = gql`
  query InjuryReports($userId: String!) {
    injuryReports(userId: $userId) {
      id
      name
      datetime
      created_at
    }
  }
`;

interface DataType {
  id: number,
  name: string;
  detail: string;
  datetime: string;
  created_at: string;
}

const Report: React.FC = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(0);
  const { user } = useUser();

  const { data, loading, error, refetch } = useQuery(GET_INJURY_REPORTS_BY_USER, {
    variables: { userId: user?.sub },
    skip: !user?.sub,
  });

  const openCreateReportModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateReportModal = () => {
    setCreateModalOpen(false);
    refetch();
  };

  const openEditReportModal = (report: number) => {
    setSelectedReport(report)
    setEditModalOpen(true);
  };

  const closeEditReportModal = () => {
    setEditModalOpen(false);
    refetch();
  };

  type DataIndex = keyof DataType;

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Serial Number",
      dataIndex: "",
      key: "serialNumber",
      render: (text, record, index) => index + 1,
      width: 100,
    },
    {
      title: "Reporter Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
      }) => (
        <div
          style={{ padding: 8, display: "flex" }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Space>
            <Input
              ref={searchInput}
              placeholder={`Search by Name`}
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => handleSearch(confirm, 'name')}
              style={{ display: "block" }}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(confirm, 'name')}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }}></SearchOutlined>
      ),
      onFilter: (value, record) =>
        record['name']
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    {
      title: "Date/Time of Injury",
      dataIndex: "datetime",
      render: (datetime) => {
        if (!datetime) return 'N/A';
        const date = new Date(Number(datetime));
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
      },
      sorter: (a, b) => (new Date(Number(a.datetime)).getTime() || 0) - (new Date(Number(b.datetime)).getTime() || 0),
    },
    // {
    //   title: "Type of Injury",
    //   dataIndex: "detail",
    //   render: (text, record, index) => index+1,
    // },
    {
      title: "Date/Time of Report",
      dataIndex: "created_at",
      render: (datetime) => {
        if (!datetime) return 'N/A';
        const date = new Date(Number(datetime));
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
      },
      sorter: (a, b) => (new Date(Number(a.created_at)).getTime() || 0) - (new Date(Number(b.created_at)).getTime() || 0),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => 

      <Button
       className="bg-mauve text-white hover:text-white"
        size="large"
        style={{ margin: "1rem" }}
        onClick={() => openEditReportModal(record.id)}
      >
        Edit / Delete
      </Button>
      ,
    },
  ];

  return (
    <>
     <div className="report-container">
      <div className="report-cont center dropdown">
        <Button
         className="bg-mauve text-white hover:text-white"
          icon={<PlusOutlined />}
          size="large"
          style={{ margin: "1rem" }}
          onClick={openCreateReportModal}
        >
          Add Report
        </Button>
        <CreateReportModal isOpen={isCreateModalOpen} onClose={closeCreateReportModal} refetchReports={refetch} />
        <EditReportModal reportId={selectedReport} isOpen={isEditModalOpen} onClose={closeEditReportModal} refetchReports={refetch} />
        <CSVLink data={data?.injuryReports || []}>
        <Button
         className="bg-mauve text-white hover:text-white"
         icon={<DownloadOutlined />}
          size="large"
          style={{ margin: "1rem" }}
        >
          Download Report
        </Button>
        </CSVLink>
      </div>
      <div className="table-container">
      <Table bordered columns={columns} scroll={{ x: 'max-width' }} dataSource={data?.injuryReports} loading={loading} rowKey="id" />
      </div>
      </div>
    </>
  );
};

export default Report;
