import { createTypeLevelClient } from "untypeable";
import type { MyRouter } from "./router";

export const client = createTypeLevelClient<MyRouter>(
  async (path, method, input) => {
    let resolvedInit: RequestInit = {};
    switch (method) {
      case "GET":
        return fetch(path).then((res) => res.json());
      case "POST":
        resolvedInit = {
          method,
          body: JSON.stringify(input),
        };
        return fetch(path, resolvedInit).then((res) => res.json());
    }
  }
);
