import { createServer, Response } from "miragejs";
import { factories } from "./factories";
import { models } from "./models";

export function startMirage() {
  createServer({
    models: models,
    factories: factories,
    seeds(server) {
      server.createList("student", 30);
      server.create("user", {
        name: "Daniel Serrano",
        role: "administrador",
      });
    },
    routes() {
      this.post("api/v1/login", (schema) => {
        const userData = schema.find("user", "1");
        if (userData) {
          const payload = {
            state: true,
            message: "Ingreso exitoso",
            ...userData.attrs,
          };
          return new Response(200, {}, payload);
        } else {
          const payload = {
            state: false,
            message: "Contraseña o email invalido",
          };
          return new Response(404, {}, payload);
        }
      });
      this.get("api/v1/user/getUsers", (schema) => {
        const payload = {
          state: true,
          message: "Listado de estudiantes",
          students: schema.all("student").models,
        };
        // return new Response(200, {}, payload);
        return new Response(
          404,
          {},
          {
            state: false,
            message: "Fallo en el listado de estudiantes",
          }
        );
      });
    },
  });
}
