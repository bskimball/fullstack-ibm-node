import React from "react";
import {
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/core";
import { Formik, Field, Form, FormikProps, FormikHelpers } from "formik";
import { object, string } from "yup";

const TodoSchema = object().shape({
  title: string().required("Title is required"),
  description: string(),
});

type Prop = {
  add: any;
};

type Values = {
  title: string;
  description: string;
};

function TodoForm({ add }: Prop) {
  let initialValues = { title: "", description: "" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={TodoSchema}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <Form>
          <Field name="title">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.title && form.touched.title}
                mb={4}
              >
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input {...field} placeholder="enter title" shadow="sm" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="description">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.description && form.touched.description}
                mb={4}
              >
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  {...field}
                  placeholder="enter description"
                  shadow="sm"
                />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
            shadow="sm"
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </Button>
        </Form>
      )}
    </Formik>
  );

  async function handleSubmit(
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) {
    await add(values);
    setSubmitting(false);
  }
}

export default TodoForm;
