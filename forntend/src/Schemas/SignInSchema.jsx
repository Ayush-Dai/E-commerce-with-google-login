import * as yup from "yup";

const SignInSchema = yup.object({
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

export default SignInSchema;
