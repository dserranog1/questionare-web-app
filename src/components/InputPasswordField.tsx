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
import { SignInValues } from "../types/forms";

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
        form: FormikProps<SignInValues>;
        meta: FieldMetaProps<string>;
      }) => (
        <FormControl
          isRequired
          isInvalid={meta.touched && meta.error ? true : false}
        >
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              errorBorderColor="red-vivid-500"
              type={showPassword ? "text" : "password"}
              {...field}
              bgColor="cool-grey-100"
              focusBorderColor="light-blue-vivid-600"
              border="1px"
              borderColor="cool-grey-300"
            />
            <InputRightElement width="">
              <Button
                onClick={() => setShowPassword(!showPassword)}
                mr="1"
                size="sm"
                variant="outline"
                fontWeight="medium"
                textColor="light-blue-vivid-700"
                _hover={{}}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage textColor="red-vivid-500">
            {form.errors.password}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default InputPasswordField;
