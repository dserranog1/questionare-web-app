import { initUntypeable } from "untypeable";
import { LoginResponse, StudentsResponse } from "../types/api";

const u = initUntypeable().pushArg<"GET" | "POST" | "PUT" | "DELETE">();

const router = u.router({
  "/api/v1/login": {
    POST: u
      .input<{ email: string; password: string }>()
      .output<LoginResponse>(),
  },
  "/api/v1/user/getUsers": {
    GET: u.output<StudentsResponse>(),
  },
});

export type MyRouter = typeof router;
