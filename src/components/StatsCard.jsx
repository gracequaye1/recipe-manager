import React from "react";
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";

function StatsCard({ title, count }) {
  return (
    <Card style={{ width: "150px", textAlign: "center" }}>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <h2 style={{ margin: 0 }}>{count}</h2>
      </CardBody>
    </Card>
  );
}

export default StatsCard;
