import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Field, type FieldProps } from "formik";
import { FC } from "react";
import { Options } from "../types/forms";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  errorMessage?: string;
  options: Options;
}

const CustomSelectField: FC<Props> = ({
  name,
  label,
  placeholder,
  errorMessage,
  options,
}) => {
  return (
    <Field type="select" name={name}>
      {({ meta, form }: FieldProps<string>) => (
        <FormControl
          isRequired
          isInvalid={meta.touched && meta.error ? true : false}
        >
          <FormLabel>{label}</FormLabel>
          <Select
            placeholder={placeholder}
            errorBorderColor="red-vivid-500"
            name={name}
            onBlur={() => {
              form.setTouched({ [name]: true });
            }}
            onChange={(option) => {
              form.setFieldValue(name, option?.value);
            }}
            selectedOptionStyle="check"
            options={options}
            defaultValue={null}
          />
          <FormErrorMessage textColor="red-vivid-500">
            {errorMessage}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default CustomSelectField;
