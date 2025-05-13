import * as yup from "yup";

const userSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must be at most 25 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  // confirmPassword: yup
  //   .string()
  //   .required("Confirm Password is required")
  //   .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default userSchema;
