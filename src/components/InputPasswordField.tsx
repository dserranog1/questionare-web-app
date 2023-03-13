import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  Field,
  type FieldMetaProps,
  type FormikProps,
  type FieldInputProps,
} from "formik";
import { useState } from "react";
import { FormValue } from "../types/forms";

const InputPasswordField = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Field name="password">
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
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input type={showPassword ? "text" : "password"} {...field} />
            <InputRightElement width="4.5rem">
              <Button onClick={() => setShowPassword(!showPassword)} size="sm">
                {showPassword ? "Ocultar" : "Mostrar"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default InputPasswordField;
