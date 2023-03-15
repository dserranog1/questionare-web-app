import { createServer } from "miragejs";
import type { AnyResponse } from "miragejs/-types";

export function startMirage() {
  createServer({
    routes() {
      this.post("api/v1/login", () => {
        // uncomment to try succesfull response
        const response: AnyResponse = {
          state: true,
          id: "1",
          name: "Daniel Serrano",
          role: "administrador",
          message: "Ingreso exitoso",
        };
        return response;
        // uncomment for a 401 response
        // return new Response(
        //   401,
        //   {},
        //   { state: false, message: "Contraseña o email invalido" }
        // );
      });
    },
  });
}
