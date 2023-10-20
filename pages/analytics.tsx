import { useUser } from "@auth0/nextjs-auth0/client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Bar, Line} from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Button, Dropdown, MenuProps, Space, Typography } from "antd";
import DownOutlined from "@ant-design/icons";

Chart.register([
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
]);

const Analytics = () => {
  const user = useUser();
  const [chartData, setChartData] = useState<{
    labels: string[];
    data: number[];
  }>({
    labels: [],
    data: [],
  });
  const [selectedChartType, setSelectedChartType] = useState("bar");

  const items: MenuProps["items"] = [
    {
      key: "bar",
      label: <a onClick={() => setSelectedChartType("bar")}>Bar</a>,
    },
    {
      key: "area",
      label: <a onClick={() => setSelectedChartType("area")}>Area</a>,
    },
  ];

  useEffect(() => {
    const getReportData = async () => {
      try {
        const getReportsResponse = await fetch("/api/report/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.user?.sub,
          }),
        });
        if (getReportsResponse.ok) {
          const reports = await getReportsResponse.json();
          const countsMap: { [key: string]: number } = {};

          reports.forEach((element: any) => {
            const label: string =
              (dayjs(element.datetime).month() + 1).toString() +
              "/" +
              dayjs(element.datetime).year().toString();

            if (label in countsMap) {
              countsMap[label]++;
            } else {
              countsMap[label] = 1;
            }
          });

          const labels = Object.keys(countsMap);
          const data = Object.values(countsMap);
          setChartData({ labels, data });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getReportData();
  }, [user]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Injuries per month",
      },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        fill: true,
        label: "Injuries",
        data: chartData.data,
        borderColor: "#063E42",
        backgroundColor: "#37AEB8",
      },
    ],
  };

  return (
    <div className="parent-div w-[100%]" style={{ marginTop: "15px" }}>
      <div className="center">
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ["bar"],
          }}
        >
          <Typography.Link>
            <Button type="primary" className="bg-mauve">
            <Space>
              Select Chart Type
              <DownOutlined />
            </Space>
            </Button>
          </Typography.Link>
        </Dropdown>
      </div>
      <div className="w-[90vw] h-[80vh] center m-auto">
      {selectedChartType === "bar" && <Bar data={data} options={options} className=""/>}
      {selectedChartType === "area" && <Line data={data} options={options} className=""/>}
      </div>
    </div>
  );
};

export default Analytics;