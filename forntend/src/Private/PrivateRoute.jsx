import { React, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuthApi } from '../APIs/GoogleApi';

const PrivateRoute = ({ element: Element }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
        const checkAuth = async () => {
          try {
            console.log("Checking authentication via API...");
            const response = await checkAuthApi();
            if (
              response &&
              response.data &&
              response.data.success === true && // Explicit check
              response.data.user &&
              typeof response.data.user._id === "string" // Ensure valid user ID
            ) {
              console.log("Authentication successful");
              console.log(response);
              setIsAuthenticated(true);
              setUserData(response.data); // Store user data from API response
            } else {
              console.log("Authentication failed");
              setIsAuthenticated(false);
            }
          } catch (err) {
            console.error("Auth check error:", err);
            setIsAuthenticated(false);
          } finally {
            setIsLoading(false);
          }
        };
      
        checkAuth();
    }, []);
      
    if (isLoading) {
      return <div>Loading...</div>;
    }
      
    // Pass userData as a prop to the protected component
    return isAuthenticated ? <Element userData={userData} /> : <Navigate to="/signin" />;
};
  
export default PrivateRoute;