import * as yup from 'yup';

const changepasswordSchema = yup.object({
  oldpassword: yup
    .string()
    .required('Old Password is required')
    .min(6, 'Old Password must be at least 6 characters'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),

  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default changepasswordSchema;
