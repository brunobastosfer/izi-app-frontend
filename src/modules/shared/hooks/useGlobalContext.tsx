import { createContext, useContext, useState } from "react";
import { Usuario } from "../../login/types/Usuario";
import { getItemStorage, setItemStorage } from "../functions/storageProxy";
import { AuthType } from "../../login/types/AuthType";
import { Task } from "../../home/types/Task";

interface GlobalData {
  accessToken?: string;
  refreshToken?: string;
  user?: Usuario;
}

interface GlobalContextProps {
  globalData: GlobalData;
  setGlobalData: (globalData: GlobalData) => void;
  user: Usuario | undefined;
  setUser: (user: Usuario) => void;
  task?: Task[];
  setTask?: (task: Task[]) => void;
}

const GlobalContext = createContext({} as GlobalContextProps);

interface GlobalProviderProps {
  children: React.ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalData, setGlobalData] = useState<GlobalData>({});
  const [user, setUser] = useState<Usuario>();
  const [task, setTask] = useState<Task[]>([]);
  if(!getItemStorage('accessToken') || !getItemStorage('refreshToken') || !getItemStorage('user') ) {
    setItemStorage('accessToken', globalData.accessToken || '');
    setItemStorage('refreshToken', globalData.refreshToken || '');
    setItemStorage('user', user?.id || '');
  }

  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData, user, setUser, task, setTask }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const { globalData, setGlobalData, user, setUser, task, setTask } = useContext(GlobalContext);

  const setAcess = (auth: AuthType) => {
    setGlobalData({
      ...globalData,
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken
    });
  }


  return {
    globalData,
    setAcess,
    setUser,
    user,
    task,
    setTask
  }
}