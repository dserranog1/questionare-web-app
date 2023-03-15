import { Model } from "miragejs";
// eslint-disable-next-line import/no-unresolved
import { ModelDefinition } from "miragejs/-types";
import { Student } from "../types/student";
import { User } from "../types/user";

const studentModel: ModelDefinition<Student> = Model.extend({});
const userModel: ModelDefinition<User> = Model.extend({});

export const models = {
  student: studentModel,
  user: userModel,
};
