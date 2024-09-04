import * as Yup from "yup";

// Validation schema for the Sign In form
export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email Address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

// Validation schema for the Sign Up form
export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email Address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  username: Yup.string()
    .required("Username is required"),
});

export const VerifyEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email Address is required"),
});

export const FixPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});