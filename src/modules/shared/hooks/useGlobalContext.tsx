import { createContext, useContext, useState } from "react";
import { Usuario } from "../../login/types/Usuario";
import { setItemStorage } from "../functions/storageProxy";
import { AuthType } from "../../login/types/AuthType";

interface GlobalData {
  accessToken?: string;
  refreshToken?: string;
  user?: Usuario;
}

interface GlobalContextProps {
  globalData: GlobalData;
  setGlobalData: (globalData: GlobalData) => void;
}

const GlobalContext = createContext({} as GlobalContextProps);

interface GlobalProviderProps {
  children: React.ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalData, setGlobalData] = useState<GlobalData>({});
  setItemStorage('accessToken', globalData.accessToken || '');
  setItemStorage('refreshToken', globalData.refreshToken || '');

  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);

  const setAcess = (auth: AuthType) => {
    setGlobalData(auth);
  }

  const setUser = (user: Usuario) => {
    console.log(user)
    setGlobalData({ ...globalData, user });
    console.log(globalData)
  }

  const user = () => globalData.user;


  return {
    globalData,
    setAcess,
    setUser,
    user
  }
}