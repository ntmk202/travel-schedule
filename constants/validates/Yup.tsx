import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email Address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email Address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  username: Yup.string()
    .required("Username is required"),
  // avatar: Yup.string()
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
    .required("Confirm password is required"),
});

export const EditPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export const newScheduleSchema = Yup.object().shape({
  title: Yup.string().required('Destination is required'),
  location: Yup.string().required('Location is required'),
  traveler: Yup.string().required('Traveler type is required'),
  price: Yup.string().required('Budget is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required')
});
