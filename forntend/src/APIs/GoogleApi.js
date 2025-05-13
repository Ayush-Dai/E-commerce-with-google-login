import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

const googleAuth = (code) => api.get(`/api/auth/google?code=${code}`);
const signUpApi = (userData) => api.post('/api/auth/signup', userData);
const signInApi = (data) => api.post('/api/auth/signin', data);
const logoutApi = () => api.get('/api/auth/logout');
// const getProducts = () => api.get('/api/products');
const checkAuthApi = () => api.get('/api/auth/check-auth');
const allproductsApi = () => api.get('/api/products');
const allUsersApi=()=>api.get('/api/usersDetails');
const deleteUserApi=(id)=>api.delete(`/api/userDetails/delete/${id}`);
const productApi = (id) => api.get(`/api/products/${id}`);
const addProductApi=(data)=>api.post(`/api/addproducts`,data);
const editProductApi=(id,data)=>api.put(`/api/updateProduct/${id}`,data);
const deleteProductApi=(id)=>api.delete(`/api//deleteProduct/${id}`);
const changePasswordApi=(data)=>api.post('/api/auth/changePassword',data);
const adminauthApi=()=>api.get('/api/adminauth/admin');
const createOrderApi=(data)=>api.post('/api/Order/createOrder',data);
const getAllOrder=()=>api.get(`/api/Order//getallorder`);
const getOrderByUserId=(id)=>api.get(`api/Order/getorderbyid/${id}`);

export { googleAuth, signUpApi, signInApi, logoutApi, checkAuthApi,allproductsApi,productApi,addProductApi,
  editProductApi,deleteProductApi,allUsersApi,changePasswordApi,adminauthApi,deleteUserApi,createOrderApi,getAllOrder,getOrderByUserId};
