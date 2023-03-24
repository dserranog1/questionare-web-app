import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, type FieldInputProps, type FieldMetaProps } from "formik";
import { FC } from "react";

interface Props {
  type: string;
  name: string;
  label: string;
  errorMessage?: string;
}

const CustomInputField: FC<Props> = ({ type, name, label, errorMessage }) => {
  return (
    <Field type={type} name={name}>
      {({
        field,
        meta,
      }: {
        field: FieldInputProps<string>;
        meta: FieldMetaProps<string>;
      }) => (
        <FormControl
          isRequired
          isInvalid={meta.touched && meta.error ? true : false}
        >
          <FormLabel>{label}</FormLabel>
          <Input
            errorBorderColor="red-vivid-500"
            type={type}
            {...field}
            bgColor="cool-grey-100"
            focusBorderColor="light-blue-vivid-600"
            border="1px"
            borderColor="cool-grey-300"
          />
          <FormErrorMessage textColor="red-vivid-500">
            {errorMessage}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default CustomInputField;
