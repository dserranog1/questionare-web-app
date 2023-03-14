import { initUntypeable } from "untypeable";
import { loginResponse } from "../types/api";

const u = initUntypeable().pushArg<"GET" | "POST" | "PUT" | "DELETE">();

const router = u.router({
  "/api/v1/login": {
    POST: u
      .input<{ email: string; password: string }>()
      .output<loginResponse>(),
  },
});

export type MyRouter = typeof router;
