import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const Navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center font-bold text-7xl text-pink-300 pt-50">
        404! Page Not Found
      </div>

      <p
        className="flex justify-center items-center font-bold text-2xl text-blue-300 cursor-pointer pt-5 hover:text-blue-500 underline"
        onClick={() => Navigate('/')}
      >
        Go To Home Page
      </p>
    </>
  );
}

export default NotFound;
