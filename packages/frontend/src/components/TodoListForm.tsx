import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  DarkMode,
  Select,
} from "@chakra-ui/core";
import { Formik, Field, Form, FormikProps, FormikHelpers } from "formik";
import { string, object } from "yup";

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

const ListFormSchema = object().shape({
  title: string().required("Title is required"),
  color: string().required("Please choose a color"),
});

type Values = {
  title: string;
  color: string;
};

type Props = {
  create: any;
};

function TodoListForm({ create }: Props) {
  return (
    <Formik
      initialValues={{ title: "", color: "blue" }}
      validationSchema={ListFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <DarkMode>
          <Form>
            <Field name="title">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.title && form.touched.title}
                  mb={4}
                >
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    {...field}
                    id="title"
                    placeholder="enter title"
                    shadow="sm"
                  />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="color">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.color && form.touched.color}
                  mb={4}
                >
                  <FormLabel htmlFor="color">Color</FormLabel>
                  <Select {...field}>
                    {colors.map((color) => (
                      <option key={color} value={color} color={`${color}[500]`}>
                        {color}
                      </option>
                    ))}
                  </Select>
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
        </DarkMode>
      )}
    </Formik>
  );

  async function handleSubmit(
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) {
    await create(values);
    setSubmitting(false);
  }
}

export default TodoListForm;
