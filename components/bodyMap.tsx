import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface EncircledArea {
  id: number;
  x: number;
  y: number;
  detail: string;
}

const BodyMap: React.FC<{
  initialAreas?: EncircledArea[];
  onUpdateEncircledAreas: (areas: EncircledArea[]) => void;
}> = ({ onUpdateEncircledAreas: onAreasChange, initialAreas: areas = [] }) => {
  const handleAreaClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "BUTTON") {
      event.stopPropagation(); // Stop event propagation to prevent adding new encircles
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newArea: EncircledArea = {
      x,
      y,
      id: Date.now(), // Use timestamp for a unique key
      detail: "",
    };
    const newAreas = [...areas, newArea];
    onAreasChange(newAreas);
  };

  const handleDeleteArea = (id: number) => {
    const updatedAreas = areas.filter((area) => area.id !== id);
    onAreasChange(updatedAreas);
  };

  const onUpdateDetails = (id: number, newDetail: string) => {
    const updatedAreas = areas.map((area) =>
      area.id === id ? { ...area, detail: newDetail } : area
    );
    onAreasChange(updatedAreas);
  };

  const columns: ColumnsType<EncircledArea> = [
    {
      title: "Label",
      key: "id",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Details",
      key: "detail",
      render: (record) => (
        <Input
          id={"detail-text-" + record.id}
          value={record.detail}
          onChange={(e) => onUpdateDetails(record.id, e.target.value)}
        />
      ),
    },
  ];

  return (
    <Row>
      <Col sm={12} xs={24}>
        <div className="bodyContainer" onClick={handleAreaClick}>
          <img src="body.png" alt="Body Outline" />
          {areas.map((area, index) => (
            <div
              key={area.id}
              className="clickableArea center"
              style={{ left: `${area.x - 15}px`, top: `${area.y - 15}px` }}
            >
              <span className="areaId">{index + 1}</span>
              <Button
                className="deleteButton"
                type="primary"
                onClick={() => handleDeleteArea(area.id)}
                shape="circle"
                size="small"
                danger
              />
            </div>
          ))}
        </div>
      </Col>
      <Col sm={12} xs={24}>
        <Table
          bordered
          pagination={{ hideOnSinglePage: true, pageSize: 5 }}
          columns={columns}
          dataSource={areas}
          rowKey="id"
        />
      </Col>
    </Row>
  );
};

export default BodyMap;
