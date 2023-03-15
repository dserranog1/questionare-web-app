export type User = {
  id: number;
  name: string;
  role: "estudiante" | "administrador";
} | null;
