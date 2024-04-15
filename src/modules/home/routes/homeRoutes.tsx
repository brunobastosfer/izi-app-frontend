import { RouteObject } from "react-router-dom";

import HomeScreen from "../screens/HomeScreen";

export enum HomeRoutesEnum {
  HOME = "/",
}

export const homeScreens: RouteObject[] = [
  {
    path: HomeRoutesEnum.HOME,
    element: <HomeScreen />
  },
]