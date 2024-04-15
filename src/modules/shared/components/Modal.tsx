import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { useRequest } from '../hooks/useRequest';
import { Task } from '../../home/types/Task';
import { getItemStorage } from '../functions/storageProxy';

interface ModalProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  setShouldUpdate: (shouldUpdate: boolean) => void;
}

const ModalComponent: React.FC<ModalProps> = ({ open, setOpen, setShouldUpdate }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [titleTask, setTitleTask] = useState<string>('');
  const { taskPostRequest } = useRequest();
  const user = getItemStorage('user');

  const handleOk = async() => {
    setConfirmLoading(true);
    const newTask = {
      name: titleTask,
      userId: user
    }
    setTimeout(async() => {
      setOpen(false);
      setConfirmLoading(false);
      setShouldUpdate(true);
      await taskPostRequest<Task[]>(`/`, newTask);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Adicionar nova tarefa"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input onChange={(e) => setTitleTask(e.target.value)}/>
      </Modal>
    </>
  );
};

export default ModalComponent;