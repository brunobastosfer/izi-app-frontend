import React, { useEffect, useMemo, useState } from 'react';
import { Card, Col, Row, FloatButton } from 'antd';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Task } from '../../home/types/Task';
import useWindowSize from '@custom-react-hooks/use-window-size';
import { IconsCardContent, ItemsCardContent, TextFinishTask } from './card.style';
import { DeleteOutlined, EditOutlined, RightCircleOutlined, LeftCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import ModalComponent from './Modal';
import { useRequest } from '../hooks/useRequest';
import { getItemStorage } from '../functions/storageProxy';
import { Column } from '../types/columnType';
import ColumnComponent from './Column';
import { createPortal } from 'react-dom';

const CardComponent: React.FC = () => {
  const { taskGetRequest, taskPutRequest, taskDeleteRequest } = useRequest();
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>();
  const [open, setOpen] = useState<boolean>(false);
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [task, setTask] = useState<Task[]>([]);
  const [itemEdit, setItemEdit] = useState<Task>({} as Task);
  const user = getItemStorage('user');
  const { width } = useWindowSize();

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3
    }
  }))

  useEffect(() => {
    async function getTask() {
      const response = await taskGetRequest<Task[]>(`/task/user/${user}`);
      setTask(response);
      return response;
    }
    getTask();
    setShouldUpdate(false);
    setColumns([
      {
        id: generateId(),
        title: "Tarefas a fazer"
      },
      {
        id: generateId(),
        title: "Tarefas finalizadas"
      }
  
  ])
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

  const handleEdit = (item: Task) => {
    setEdit(true);
    setOpen(true);
    setItemEdit(item)
  }

  return (
    <Row gutter={20} style={{ margin: 0, display: "flex", alignItems: "center", border: "1px solid yellow",justifyContent: "center", height: "calc(100vh - 72px)", width: "auto",backgroundImage:"linear-gradient(180deg, #0573B1 0%, #10A3E7 100%)"}}>
    <React.Fragment>
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <SortableContext items={columnsId}>
        {
          columns.map((col) => (
            <ColumnComponent key={col.id} column={col} tasks={task}/>
          ))
        }
      </SortableContext>
      {createPortal(
        <DragOverlay>
          { activeColumn && <ColumnComponent column={activeColumn} tasks={task}/> }
        </DragOverlay>, document.body)
      }
      </DndContext>
    </React.Fragment>
      <FloatButton icon={<PlusCircleOutlined />} onClick={() => setOpen(!open)}/>
      {
        open &&
        <ModalComponent 
          open={open}
          setOpen={setOpen}
          setShouldUpdate={setShouldUpdate}
          edit={edit}
          itemEdit={itemEdit}
          setEdit={setEdit}
          setItemEdit={setItemEdit}
        />
      }
    </Row>
  )

  function createNewColumn() {
    const ColumnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`
    }

    setColumns([...columns, ColumnToAdd])
  }

  function generateId() {
    return Math.floor(Math.random() * 10001)
  }

  function onDragStart(event: DragStartEvent) {
    if(event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column)
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if(!over) return ;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if(activeColumnId === overColumnId) return;

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId);

      const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    })
  }
}

export default CardComponent;