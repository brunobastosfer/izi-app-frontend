import React, { ChangeEvent, useState } from 'react';
import { Modal, Input, Alert } from 'antd';
import { useRequest } from '../hooks/useRequest';
import { Task } from '../../home/types/Task';
import { getItemStorage } from '../functions/storageProxy';

interface ModalProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  setShouldUpdate: (shouldUpdate: boolean) => void;
  edit: boolean;
  itemEdit: Task;
  setEdit: (shouldUpdate: boolean) => void;
  setItemEdit: (item: Task) => void;
}

const ModalComponent: React.FC<ModalProps> = ({ open, setOpen, setShouldUpdate, edit, setEdit, itemEdit, setItemEdit }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [titleTask, setTitleTask] = useState<string>('');
  const [inputEmpty, setInputEmpty] = useState(false);
  const { taskPostRequest, taskPutRequest } = useRequest();
  const user = getItemStorage('user');

  const handleOk = async() => {
    if(titleTask !== '') {
      setConfirmLoading(true);
      const newTask = {
        name: titleTask,
        userId: user
      }
      if(edit) {
        setTimeout(async() => {
          setOpen(false);
          setConfirmLoading(false);
          setShouldUpdate(true);
          setEdit(false);
          await taskPutRequest<Task[]>(`/task/${itemEdit.id}`, newTask);
        }, 2000);
        return;
      }
      setTimeout(async() => {
        setOpen(false);
        setConfirmLoading(false);
        setShouldUpdate(true);
        await taskPostRequest<Task[]>(`/`, newTask);
      }, 2000);
      return;
    }
    setInputEmpty(true);
    setTimeout(() => {
      setInputEmpty(false);
    }, 1500)
  };

  const handleCancel = () => {
    setOpen(false);
    setEdit(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (edit) {
      setItemEdit({...itemEdit, name: e.target.value});
      setTitleTask(e.target.value);
    } else {
      setTitleTask(e.target.value);
    }
  }

  return (
    <>
      <Modal
        title={ edit ? "Editar tarefa" : "Adicionar nova tarefa"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input onChange={(e) => handleChange(e)} value={edit ? itemEdit.name : titleTask}/>
        {
          inputEmpty &&
          <Alert message="O campo é obrigatório." type="error" style={{ border: "none", background: "none" }}/>
        }
      </Modal>
    </>
  );
};

export default ModalComponent;