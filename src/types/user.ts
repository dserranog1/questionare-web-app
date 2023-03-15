export interface User {
  id: number;
  name: string;
  role: "estudiante" | "administrador";
}

export type UserState = User | null;
