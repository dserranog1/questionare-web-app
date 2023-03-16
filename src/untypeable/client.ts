import { createTypeLevelClient } from "untypeable";
import type { MyRouter } from "./router";

export const client = createTypeLevelClient<MyRouter>(
  //TODO write meaningful error messages
  async (path, method, input) => {
    let resolvedInit: RequestInit = {};
    let response: Response;
    switch (method) {
      case "GET":
        response = await fetch(path, resolvedInit);
        if (response.ok) {
          console.log("from here", response);
          return response.json();
        } else {
          return Promise.reject(new Error("Unexpected error"));
        }
      case "POST":
        resolvedInit = {
          method,
          body: JSON.stringify(input),
        };
        response = await fetch(path, resolvedInit);
        if (response.ok) {
          console.log("from here", response);
          return response.json();
        } else {
          return Promise.reject(new Error("Unexpected error"));
        }
    }
  }
);
