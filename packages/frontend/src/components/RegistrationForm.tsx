import React from "react";
import { Form, Formik, FormikProps, Field, FormikHelpers } from "formik";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import auth from "../utils/auth";
import * as yup from "yup";

const RegistrationSchema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Please enter a password"),
  confirm: yup
    .string()
    .test("equal", "Passwords do not match", function (v: any) {
      return v !== this.resolve(yup.ref("password"));
    }),
});

type Values = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

function RegistrationForm() {
  let initialValues = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegistrationSchema}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <Form style={{ width: "100%" }}>
          <Field name="name">
            {({ form, field }: any) => (
              <FormControl
                mb={4}
                isInvalid={form.errors.name && form.touched.name}
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} id="name" variant="outline" shadow="sm" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email">
            {({ form, field }: any) => (
              <FormControl
                mb={4}
                isInvalid={form.errors.email && form.touched.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" variant="outline" shadow="sm" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ form, field }: any) => (
              <FormControl
                mb={4}
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  variant="outline"
                  shadow="sm"
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="confirm">
            {({ form, field }: any) => (
              <FormControl
                mb={4}
                isInvalid={form.errors.confirm && form.touched.confirm}
              >
                <FormLabel htmlFor="confirm">Confirm Password</FormLabel>
                <Input
                  {...field}
                  id="confirm"
                  type="password"
                  variant="outline"
                  shadow="sm"
                />
                <FormErrorMessage>{form.errors.confirm}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
            mr={4}
            shadow="sm"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );

  async function handleSubmit(
    { email, password, name }: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) {
    await auth.register({ email, password, name });
    setSubmitting(false);
  }
}

export default RegistrationForm;
