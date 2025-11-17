import { React, useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth, signInApi } from '../../APIs/GoogleApi';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import SignInSchema from '../../Schemas/SignInSchema';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
function SignIn() {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: SignInSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await signInApi(values);
        if (response && response.status === 200 && response.data.user) {
          const { _id, email, role, name, image } = response.data.user;
          // const token = response.data.token;
          const obj = { _id, email, role, name, image };
          localStorage.setItem('user', JSON.stringify(obj));
          console.log('user detail', response.data.user);
          action.resetForm();

          window.dispatchEvent(new Event('auth-success'));
          // setTimeout(() => navigate('/products'), 100);

          navigate('/products');
          iziToast.success({
            title: 'Success',
            message: 'Logged in successfully',
            position: 'topRight',
            timeout: 3000,
          });
        }
      } catch (error) {
        console.log('error while requesting google login', error);

        if (error.response && error.response.status === 400) {
          iziToast.error({
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
            // timeout: 5000,
            close: true,
            transitionIn: 'fadeInLeft',
            transitionOut: 'fadeOutRight',
            timeout: 3000,
          });
        }
      }
    },
  });

  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult['code']);
        const { _id, email, role, name, image } = result.data.user;
        const token = result.data.token;
        const obj = { _id, email, name, role, image, token };
        localStorage.setItem('user', JSON.stringify(obj));
        console.log('user detail', result.data.user);

        window.dispatchEvent(new Event('auth-success'));
        //  setTimeout(() => navigate('/products'), 300);

        navigate('/products');
        iziToast.success({
          title: 'Success',
          message: 'Logged in successfully',
          position: 'topRight',
          timeout: 5000,
        });
      }
    } catch (error) {
      console.log('error while requesting google login', error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong!',
        position: 'topRight',
        close: true,
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOutRight',
        timeout: 3000,
      });
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });

  return (
    <>
      (
      <div className="flex justify-center flex-col items-center h-[80vh] ">
        <form
          className="w-[600px] p-6 mx-auto rounded-lg bg-gray-600/100 shadow-md"
          onSubmit={handleSubmit}
        >
          <label className="block mb-2 text-white">
            Email:
            <input
              type="email"
              name="email"
              value={values.email}
              className="block w-full border p-2 rounded mt-1"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.email && touched.email && <p className="text-red-400">{errors.email}</p>}
          </label>

          <label className="block mb-2 text-white">
            Password:
            <input
              type="password"
              name="password"
              value={values.password}
              className="block w-full border p-2 rounded mt-1"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.password && touched.password && (
              <p className="text-red-400">{errors.password}</p>
            )}
          </label>

          <button
            type="submit"
            className="mt-2 hover:bg-green-700 cursor-pointer bg-green-500 text-white px-4 py-2 rounded"
          >
            Log in
          </button>

          <p className="inline pl-2.5 text-white">
            Doesn't have an account?{' '}
            <a className="text-blue-300 hover:text-blue-500" href="/signup">
              Sign Up
            </a>
          </p>
        </form>
        <p>or</p>

        {/* google login */}
        <button
          type="button"
          className="w-[600px] mt-4 bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 flex items-center justify-center hover:bg-green-100 transition cursor-pointer"
          onClick={() => {
            googleLogin();
          }}
        >
          <img
            src="https://www.bing.com/th?id=OIP.-GOu9NFfFJir5vLUmM3JhwHaHa&w=193&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.9&pid=3.1&rm=2"
            alt="Google Logo"
            className="w-10 h-10 pr-3 "
          />
          Log in with google
        </button>
      </div>
      )
    </>
  );
}

export default SignIn;
