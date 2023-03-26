export interface User {
  id: string;
  firstName: string;
  secondName: string | undefined;
  surname: string;
  secondSurName: string | undefined;
  typeDocument: 1 | 2 | 3;
  documentNumber: number;
  email: string;
  phone: number;
  role: "estudiante" | "administrador";
}

export type UserState = User | null;
export type UserList = User[];
