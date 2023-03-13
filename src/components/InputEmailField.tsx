import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  Field,
  type FieldInputProps,
  type FormikProps,
  type FieldMetaProps,
} from "formik";
import { FormValue } from "../types/forms";

const InputEmailField = () => {
  return (
    <Field type="email" name="email">
      {({
        field,
        form,
        meta,
      }: {
        field: FieldInputProps<string>;
        form: FormikProps<FormValue>;
        meta: FieldMetaProps<string>;
      }) => (
        <FormControl
          isRequired
          isInvalid={meta.touched && meta.error ? true : false}
        >
          <FormLabel>Correo</FormLabel>
          <Input type="email" {...field} />
          <FormErrorMessage>{form.errors.email}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default InputEmailField;
