import React from 'react';
import changepasswordSchema from '@/Schemas/ChangepswdSchema';
import { changePasswordApi } from '../../APIs/GoogleApi';
import iziToast from 'izitoast';
import { useFormik } from 'formik';

function ChangePassword() {
  const initialValues = {
    oldpassword: '',
    password: '',
    confirmPassword: '',
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: changepasswordSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await changePasswordApi(values);
        console.log('Data sent:', response.data);

        if (response.status === 201) {
          iziToast.success({
            title: 'success',
            message: response?.data?.message,
            position: 'topRight',
            timeout: 3000,
          });

          action.resetForm();
        }
      } catch (error) {
        console.error('Error during changing password:', error);

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
    <div className="flex justify-center items-center h-[80vh]">
      <form
        className="w-[600px] p-6 mx-auto rounded-lg bg-gray-600/100 shadow-md"
        onSubmit={handleSubmit}
      >
        <label className="block mb-2 text-white">
          Old Password: <span className="text-red-500 gap-1 pl-2 "> </span>
          <input
            type="password"
            name="oldpassword"
            className="block w-full border p-2 rounded mt-1"
            value={values.oldpassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.oldpassword && touched.oldpassword && (
            <p className="text-red-400">{errors.oldpassword}</p>
          )}
        </label>

        <label className="block mb-2 text-white">
          New Password:
          <input
            type="password"
            name="password"
            className="block w-full border p-2 rounded mt-1"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && <p className="text-red-400">{errors.password}</p>}
        </label>

        <label className="block mb-2 text-white">
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            className="block w-full border p-2 rounded mt-1"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-400">{errors.confirmPassword}</p>
          )}
        </label>

        <button
          type="submit"
          className="mt-2 hover:bg-green-700 cursor-pointer bg-green-500 text-white px-4 py-2 rounded"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
