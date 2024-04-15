import React, { useEffect, useState } from 'react';
import { Card, Col, Row, FloatButton } from 'antd';
import { useRequest } from '../hooks/useRequest';
import { Task } from '../../home/types/Task';
import { getItemStorage } from '../functions/storageProxy';
import { DeleteOutlined, EditOutlined, RightCircleOutlined, LeftCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { IconsCardContent, ItemsCardContent, TextFinishTask } from './card.style';
import useWindowSize from '@custom-react-hooks/use-window-size';
import ModalComponent from './Modal';

const CardComponent: React.FC = () => {
  const { taskGetRequest, taskPutRequest, taskDeleteRequest } = useRequest();
  const [open, setOpen] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
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
    setShouldUpdate(false);
  }, [shouldUpdate])

  const handleFinishTask = async(id: string, body: any) => {
    body.finished = true;
    const response = await taskPutRequest<Task[]>(`/task/${id}`, body);
    setShouldUpdate(true);
    setTask(response);
  }

  const handleTodoTask = async(id: string, body: any) => {
    body.finished = false;
    const response = await taskPutRequest<Task[]>(`/task/${id}`, body);
    setShouldUpdate(true);
    setTask(response);
  }

  const handleDelete = async(id: string) => {
    await taskDeleteRequest(`/task/${id}`);
    const taskUpdated = task.filter((item) => item.id !== id);
    setTask(taskUpdated);
    setShouldUpdate(true);
  }

  return (
    <Row gutter={20} style={{ margin: 0, display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 72px)", width: "auto",backgroundImage:"linear-gradient(180deg, #0573B1 0%, #10A3E7 100%)"}}>
      <Col span={width >= 580 ? 8 : 16}>
        <Card title="Tarefas a fazer" bordered={false} style={{ minHeight: "280px" }}>
        {
          task.length > 0 &&
          task?.map((item) => {
            if(item.finished === false)  {
              return (
                <ItemsCardContent>
                  <p>{item.name}</p>
                  <IconsCardContent>
                    <RightCircleOutlined style={{ cursor: "pointer" }} onClick={() => handleFinishTask(item.id, item)}/>
                    <DeleteOutlined style={{ marginLeft: "10px", cursor: "pointer" }} onClick={() => handleDelete(item.id)}/>
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
          task.length > 0 &&
          task?.map((item) => {
            if(item.finished === true)  {
              return (
                <ItemsCardContent>
                  <TextFinishTask>{item.name}</TextFinishTask>
                  <IconsCardContent>
                    <LeftCircleOutlined style={{ marginLeft: "10px", cursor: "pointer"  }} onClick={() => handleTodoTask(item.id, item)}/>
                    <DeleteOutlined style={{ marginLeft: "10px", cursor: "pointer"  }} onClick={() => handleDelete(item.id)}/>
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
      <FloatButton icon={<PlusCircleOutlined />} onClick={() => setOpen(!open)}/>
      {
        open &&
        <ModalComponent open={open} setOpen={setOpen} setShouldUpdate={setShouldUpdate}/>
      }
    </Row>
  )
}

export default CardComponent;