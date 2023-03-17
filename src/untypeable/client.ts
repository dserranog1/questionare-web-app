import { createTypeLevelClient } from "untypeable";
import { APIFail } from "../types/api";
import type { MyRouter } from "./router";

export const client = createTypeLevelClient<MyRouter>(
  async (path, method, input) => {
    let resolvedInit: RequestInit = {};
    let response: Response;
    let failedResponse: APIFail;
    // since all fail responses have the same structure, we can be sure
    // the response is of type APIFail if the response is not ok
    switch (method) {
      case "GET":
        response = await fetch(path);
        if (response.ok) {
          return response.json();
        } else {
          failedResponse = await response.json();
          return Promise.reject(new Error(failedResponse.message));
        }
      case "POST":
        resolvedInit = {
          method,
          body: JSON.stringify(input),
        };
        response = await fetch(path, resolvedInit);
        if (response.ok) {
          return response.json();
        } else {
          failedResponse = await response.json();
          return Promise.reject(new Error(failedResponse.message));
        }
    }
  }
);
