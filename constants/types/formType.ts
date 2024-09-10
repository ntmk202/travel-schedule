export interface SignUpFormValues {
    email: string;
    password: string;
    username: string;
}
  
export interface SignInFormValues {
    email: string;
    password: string;
}

export interface VerifyEmailFormValues {
    email: string;
}
  
export interface UpdatePasswordFormValues {
    password: string;
    confirmPassword: string;
}

export interface EditPasswordFormValues {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
