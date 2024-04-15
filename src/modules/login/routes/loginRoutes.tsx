import { RouteObject } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";

export enum LoginRoutesEnum {
  LOGIN = "/",
}

export const loginRoutes: RouteObject[] = [
  {
    path: LoginRoutesEnum.LOGIN,
    element: <LoginScreen />
  }
]