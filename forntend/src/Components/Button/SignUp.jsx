import React from 'react';
import { useFormik } from 'formik';
import userSchema from '../../Schemas/Schema';
import { signUpApi } from '../../APIs/GoogleApi';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
function SignUp() {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await signUpApi(values);
        console.log('Data sent:', response.data);

        if (response.status === 201) {
          iziToast.success({
            title: 'Success',
            message: response?.data?.message,
            position: 'topRight',
            timeout: 3000,
          });

          action.resetForm();
        }
      } catch (error) {
        console.error('Error during signup:', error);

        if (error.response && error.response.status === 400) {
          iziToast.warning({
            title: 'Warning',
            message: error.response.data.message,
            position: 'topRight',
            timeout: 3000,
          });
        } else {
          iziToast.error({
            title: 'Error',
            message: 'Something went wrong!',
            position: 'topRight',
            timeout: 3000,
            close: true,
            transitionIn: 'fadeInLeft',
            transitionOut: 'fadeOutRight',
          });
        }
      }
    },
  });

  return (
    <>
      <div className="flex justify-center items-center h-[80vh]">
        <form
          className="w-[600px] p-6 mx-auto rounded-lg bg-gray-600/100 shadow-md"
          onSubmit={handleSubmit}
        >
          <label className="block mb-2 text-white">
            Name:
            <input
              type="text"
              name="name"
              className="block w-full border p-2 rounded mt-1"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && <p className="text-red-400">{errors.name}</p>}
          </label>

          <label className="block mb-2 text-white">
            Email:
            <input
              type="email"
              name="email"
              className="block w-full border p-2 rounded mt-1"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && <p className="text-red-400">{errors.email}</p>}
          </label>

          <label className="block mb-2 text-white">
            Password:
            <input
              type="password"
              name="password"
              className="block w-full border p-2 rounded mt-1"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <p className="text-red-400">{errors.password}</p>
            )}
          </label>

          <button
            type="submit"
            className="mt-2 hover:bg-green-700 cursor-pointer bg-green-500 text-white px-4 py-2 rounded"
          >
            Register
          </button>

          <p className="inline pl-2.5 text-white">
            Already have an account?{' '}
            <a className="text-blue-300 hover:text-blue-500" href="/signin">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;
