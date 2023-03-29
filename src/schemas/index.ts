import { array, number, object, string } from "yup";
import { emailRegex } from "../misc/regex";

export const SignUpSchema = object({
  email: string()
    .email("Correo inválido")
    .required("El correo es obligatorio")
    .matches(emailRegex, "Correo invalido"),
  password: string()
    .required("La contraseña es obligatoria")
    .min(8, "Mínimo 8 cáracteres"),
  phone: number()
    .required("Campo obligatorio")
    .positive("Debe ser un número positivo")
    .typeError("Valor inválido"),
  firstName: string().required("Campo obligatorio"),
  surname: string().required("Campo obligatorio"),
  typeDocument: string().required("Selecciona una de las opciones"),
  documentNumber: number()
    .required("Campo obligatorio")
    .typeError("Valor inválido"),
});

export const SignInSchema = object({
  email: string()
    .email("Correo inválido")
    .required("El correo es obligatorio")
    .matches(emailRegex, "Correo invalido"),
  password: string()
    .required("La contraseña es obligatoria")
    .min(8, "Mínimo 8 cáracteres"),
});

export const RegisterQuestionSchema = object({
  title: string().required("El título es obligatorio"),
  answers: array()
    .of(
      object({
        description: string().required("Campo obligatorio"),
      })
    )
    .min(2, "Mínimo 2 respuestas"),
});
