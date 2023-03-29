import { Button, Radio, RadioGroup, Tooltip } from "@chakra-ui/react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { FieldArray, Form, FormikErrors } from "formik";
import { FC, PropsWithChildren, useState } from "react";
import { RegisterQuestionValues } from "../../types/forms";
import CustomInputField from "./items/CustomInputField";

interface Props {
  correctOption: string;
  setCorrectOption: React.Dispatch<React.SetStateAction<string>>;
  errors: FormikErrors<RegisterQuestionValues>;
  values: RegisterQuestionValues;
}

const QuestionsAddForm: FC<PropsWithChildren<Props>> = ({
  errors,
  values,
  children,
  correctOption,
  setCorrectOption,
}) => {
  return (
    <Form className="flex w-14 flex-col gap-8">
      <CustomInputField
        type="text"
        name="title"
        label="Título"
        errorMessage={errors.title}
        isRequired={true}
      />
      <FieldArray
        name="answers"
        render={(arrayHelpers) => {
          const answers = values.answers;
          return (
            <>
              <div className="relative flex flex-col gap-6">
                <p className="absolute right-0 -top-3 text-2">Correcta</p>
                {answers && answers.length > 0
                  ? answers.map((_, idx) => {
                      return (
                        <div key={idx} className="flex flex-row gap-5">
                          <Tooltip
                            label="Deben existir mínimo 2 respuestas"
                            isDisabled={answers.length >= 3}
                          >
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                if (answers.length > 2) {
                                  setCorrectOption("1");
                                  arrayHelpers.remove(idx);
                                }
                              }}
                            >
                              <MinusCircleIcon className="mt-6 w-5 fill-red-500 hover:fill-red-300" />
                            </button>
                          </Tooltip>
                          <div className="flex w-full flex-row justify-between">
                            <CustomInputField
                              type="text"
                              label={`Respuesta ${idx}`}
                              isRequired={true}
                              name={`answers.${idx}.description`}
                              errorMessage={"Campo obligatorio"}
                            />
                            <RadioGroup
                              name="answer"
                              value={correctOption}
                              onChange={setCorrectOption}
                            >
                              <Radio
                                borderColor="cool-grey-300"
                                mt="7"
                                ml="8"
                                mr="4"
                                value={`${idx}`}
                              ></Radio>
                            </RadioGroup>
                          </div>
                        </div>
                      );
                    })
                  : null}
                <Button
                  borderColor="teal-500"
                  variant="outline"
                  mt="6"
                  onClick={(e) => {
                    e.preventDefault();
                    arrayHelpers.push({ description: "" });
                  }}
                >
                  <PlusCircleIcon className="w-5 fill-teal-500" />{" "}
                  <p className="mx-6 text-teal-600">Añadir respuesta</p>
                </Button>
              </div>
            </>
          );
        }}
      />

      {children}
    </Form>
  );
};

export default QuestionsAddForm;
