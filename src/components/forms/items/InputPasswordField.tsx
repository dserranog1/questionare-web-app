import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import {
  Field,
  type FieldMetaProps,
  type FormikProps,
  type FieldInputProps,
} from "formik";
import { FC, useState } from "react";
import { SignInValues } from "../../../types/forms";

interface Props {
  isDisabled?: boolean;
}

const InputPasswordField: FC<Props> = ({ isDisabled }) => {
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
          <Tooltip
            isDisabled={isDisabled ? !isDisabled : true}
            label="Contacta a un administrador para cambiar la contraseña"
          >
            <InputGroup>
              <Input
                errorBorderColor="red-vivid-500"
                type={showPassword ? "text" : "password"}
                {...field}
                bgColor="cool-grey-100"
                focusBorderColor="light-blue-vivid-600"
                border="1px"
                borderColor="cool-grey-300"
                isDisabled={isDisabled ? isDisabled : false}
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
                  isDisabled={isDisabled ? isDisabled : false}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Tooltip>
          <FormErrorMessage textColor="red-vivid-500">
            {form.errors.password}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default InputPasswordField;
