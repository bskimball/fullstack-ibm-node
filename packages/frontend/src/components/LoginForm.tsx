import React from "react";
import {
  Button,
  Checkbox,
  DarkMode,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { Formik, Field, Form, FormikHelpers, FormikProps } from "formik";
import auth from "../utils/auth";
import { useRouter } from "next/router";
import { object, string } from "yup";

const LoginSchema = object().shape({
  email: string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: string().required("Password is required"),
});

type Values = {
  email: string;
  password: string;
  remember: boolean;
};

function LoginForm() {
  let initialValues = { email: "", password: "", remember: false };
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <DarkMode>
          <Form style={{ width: "100%" }}>
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
            <Field name="remember">
              {({ field }: any) => (
                <FormControl mb={4}>
                  <Checkbox {...field}>Remember me</Checkbox>
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
            <Button colorScheme="blue" variant="ghost">
              forgot password?
            </Button>
          </Form>
        </DarkMode>
      )}
    </Formik>
  );

  async function handleSubmit(
    { email, password, remember }: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) {
    try {
      await auth.login({ email, password, remember });
      await router.push("/");
    } catch (error) {
      throw new Error(error);
    } finally {
      setSubmitting(false);
    }
  }
}

export default LoginForm;
