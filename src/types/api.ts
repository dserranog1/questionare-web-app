export interface loginOK {
  state: true;
  id: number;
  name: string;
  role: "estudiante" | "administrador";
  message: string;
}

export interface loginFail {
  state: false;
  message: string;
}

export type loginResponse = loginOK | loginFail;
