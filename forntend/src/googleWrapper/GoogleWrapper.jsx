import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import SignIn from '../Components/Button/SignIn'
function GoogleWrapper() {
  return (
   <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <SignIn/>
   </GoogleOAuthProvider>
  )
}

export default GoogleWrapper