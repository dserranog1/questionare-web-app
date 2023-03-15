export interface LoginOK {
  state: true;
  id: number;
  name: string;
  role: "estudiante" | "administrador";
  message: string;
}

export interface LoginFail {
  state: false;
  message: string;
}

export type loginResponse = LoginOK | LoginFail;
