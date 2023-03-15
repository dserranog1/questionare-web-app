import { initUntypeable } from "untypeable";
import { LoginResponse } from "../types/api";

const u = initUntypeable().pushArg<"GET" | "POST" | "PUT" | "DELETE">();

const router = u.router({
  "/api/v1/login": {
    POST: u
      .input<{ email: string; password: string }>()
      .output<LoginResponse>(),
  },
});

export type MyRouter = typeof router;
