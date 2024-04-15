import React from 'react';
import { Card, Col, Row } from 'antd';
import { CardContainer } from './card.style';

const CardComponent: React.FC = () => (
    <Row gutter={20} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 172px)", width: "100%"}}>
      <Col span={8}>
        <Card title="Tarefas a fazer" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Tarefas finalizadas" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
);

export default CardComponent;