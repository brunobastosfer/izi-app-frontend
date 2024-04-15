import { Usuario } from "./Usuario";

export interface AuthType {
  accessToken: string;
  refreshToken: string;
  user: Usuario;
}