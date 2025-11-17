import SignIn from './Components/Button/SignIn';
import SignUp from './Components/Button/SignUp';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import NotFound from './Components/NotFound/NotFound';
import GoogleWrapper from './googleWrapper/GoogleWrapper';
import Product from './Components/Products/Product';
import PrivateRoute from './Private/PrivateRoute';
import PrivateAdminRoute from './Private/PrivateAdminRoute';
import ChangePassword from './Components/Button/ChangePassword';
import Admin from './Components/Admin/Admin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import UsersDet from './Components/Admin/Dashboard/UsersDet';
import ProductDet from './Components/Admin/Dashboard/OrderDet';
import OrderDet from './Components/Admin/Dashboard/ProductDet';
import YoursOrder from './Components/Products/YoursOrder';

function App() {
  // let sangam = 'Unused variable here';
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/signin" element={<GoogleWrapper />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<PrivateRoute element={Product} />} />
        <Route path="/changePswd" element={<PrivateRoute element={ChangePassword} />} />
        <Route path="/yourOrders" element={<PrivateRoute element={YoursOrder} />} />

        <Route path="/admin" element={<PrivateAdminRoute element={Admin} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="manageUsers" element={<UsersDet />} />
          <Route path="manageProducts" element={<ProductDet />} />
          <Route path="manageOrders" element={<OrderDet />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
