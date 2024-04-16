import { Card } from "antd";
import { Column } from "../types/columnType"
import { CardContainer, IconsCardContent, ItemsCardContent } from "./card.style";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../home/types/Task";
import { DeleteOutlined, EditOutlined, RightCircleOutlined } from '@ant-design/icons';

interface Props {
  column: Column;
  tasks: Task[];
}

const ColumnComponent: React.FC<Props> = ({ column, tasks }) => {
  console.log(tasks)
  const { setNodeRef, attributes, listeners, transform, transition, isDragging }  = useSortable({
    id: column.id,
    data: {
      type: "Task",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    minHeight: "280px",
    width: "480px",
  }

  const styleDragging = {
    ...style,
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: 0.4,
    border: "2px solid black",
    bordeColor: "pink"
  }

  if(isDragging) {
    return (
      <Card 
        ref={setNodeRef} style={styleDragging} title={column.title} bordered={false} {...attributes} {...listeners}
      />
    )
  }

  return (
    <CardContainer>
      <Card ref={setNodeRef} style={style} title={column.title} bordered={false} {...attributes} {...listeners}>
        {
          tasks?.map((item) => {
            if(item.finished && column.title === "Tarefas finalizadas") {
              return (
                <ItemsCardContent key={item.id}>
                  <p>{item.name}</p>
                  <IconsCardContent>
                    <RightCircleOutlined style={{ cursor: "pointer" }}/>
                    <DeleteOutlined style={{ marginLeft: "10px", cursor: "pointer" }} />
                    <EditOutlined style={{ marginLeft: "10px", cursor: "pointer" }} />
                  </IconsCardContent>
                </ItemsCardContent>
              )
            } else if(!item.finished && column.title === "Tarefas a fazer") {
              return (
                <ItemsCardContent key={item.id}>
                  <p>{item.name}</p>
                </ItemsCardContent>
              )
            } else {
              return (
                <>
                </>
              )
            }
          })
        }
      </Card>
    </CardContainer>
  )
}

export default ColumnComponent;