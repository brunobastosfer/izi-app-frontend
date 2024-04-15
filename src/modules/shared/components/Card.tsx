import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { useRequest } from '../hooks/useRequest';
import { Task } from '../../home/types/Task';
import { getItemStorage } from '../functions/storageProxy';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IconsCardContent, ItemsCardContent, TextFinishTask } from './card.style';
import useWindowSize from '@custom-react-hooks/use-window-size';

const CardComponent: React.FC = () => {
  const { taskGetRequest } = useRequest();
  const [task, setTask] = useState<Task[]>([]);
  const user = getItemStorage('user');
  const { width } = useWindowSize();

  useEffect(() => {
    async function getTask() {
      const response = await taskGetRequest<Task[]>(`/task/user/${user}`);
      setTask(response);
      return response;
    }
    getTask();
  }, [])

  return (
    <Row gutter={20} style={{ margin: 0, display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 72px)", width: "auto",backgroundImage:"linear-gradient(180deg, #0573B1 0%, #10A3E7 100%)"}}>
      <Col span={width >= 580 ? 8 : 16}>
        <Card title="Tarefas a fazer" bordered={false} style={{ minHeight: "280px" }}>
        {
          task?.map((item) => {
            if(item.finished === false)  {
              return (
                <ItemsCardContent>
                  <p>{item.name}</p>
                  <IconsCardContent>
                    <DeleteOutlined style={{ cursor: "pointer" }}/>
                    <EditOutlined style={{ marginLeft: "10px", cursor: "pointer" }}/>
                  </IconsCardContent>
                </ItemsCardContent>
              )
            }
            return (
              <></>
            )
          })
        }
        </Card>
      </Col>
      <Col span={width >= 580 ? 8 : 16} >
        <Card title="Tarefas finalizadas" bordered={false} style={{ minHeight: "280px" }}>
        {
          task?.map((item) => {
            if(item.finished === true)  {
              return (
                <ItemsCardContent>
                  <TextFinishTask>{item.name}</TextFinishTask>
                  <IconsCardContent>
                    <DeleteOutlined style={{ cursor: "pointer" }}/>
                  </IconsCardContent>
                </ItemsCardContent>
              )
            }
            return (
              <></>
            )
          })
        }
        </Card>
      </Col>
    </Row>
  )
}

export default CardComponent;