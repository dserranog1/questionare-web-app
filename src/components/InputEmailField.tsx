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
          <Input
            errorBorderColor="red-vivid-500"
            type="email"
            {...field}
            bgColor="cool-grey-100"
            focusBorderColor="light-blue-vivid-600"
            border="1px"
            borderColor="cool-grey-300"
          />
          <FormErrorMessage textColor="red-vivid-500">
            {form.errors.email}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default InputEmailField;
