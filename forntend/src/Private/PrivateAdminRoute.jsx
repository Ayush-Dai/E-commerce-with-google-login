import React,{useState,useEffect} from 'react'
import {Navigate} from 'react-router-dom';
import {adminauthApi} from '../APIs/GoogleApi';


function PrivateAdminRoute({element : Element}) {
const [isLoading, setIsLoading] = useState(true);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userData, setUserData] = useState(null);

useEffect(()=>{
    const checkAuth=async()=>{
        try{
    console.log("Checking admin authentication via API...");
    const response=await adminauthApi();
    if(response && response.data && response.data.success===true && response.data.isAdmin===true){
        console.log("Admin authentication successful");
        console.log(response);
        setIsAuthenticated(true);
        setUserData(response.data);
    }else{
        console.log("Admin authentication failed");
        setIsAuthenticated(false);
        setIsLoading(false);
    }
        }catch(e){
console.log("Admin auth check error:",e);
setIsAuthenticated(false);
setIsLoading(false);
        }finally{
            setIsLoading(false);
        }
    }
    checkAuth();
},[]);
if(isLoading){
    return <div>Loading...</div>
}

//pass userData as a prop to the protected component
return isAuthenticated ? <Element userData={userData}/>:<Navigate to="*"/>
}
export default PrivateAdminRoute