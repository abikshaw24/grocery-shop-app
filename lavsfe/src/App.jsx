import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import NavigationBar from "./Components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Checkout from "./Pages/checkout";
import Cart from "./pages/Cart";
import Billing from "./pages/Billing";
import Register from "./Pages/Register";
import MyOrders from "./Pages/MyOrders";
import AdminOrders from "./Pages/AdminOrders";
import AdminLogin from "./Pages/AdminLogin";
import ProtectedAdminRoute from "./Pages/ProtectedAdminRoute";
import OrderSuccess from "./Pages/OrderSuccess";


function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/billing"
          element={<Billing />}
        />

      <Route
       path="/cart"
       element={<Cart />}
      />
      
       <Route
      path="/register"
      element={<Register />}
      />

      <Route
      path="/checkout"
      element={<Checkout />}
      />

      <Route
      path="/billing"
      element={<Billing />}
    />

    <Route
      path="/my-orders"
      element={<MyOrders />}
    />

   <Route
  path="/admin/orders"
  element={
    <ProtectedAdminRoute>
      <AdminOrders />
    </ProtectedAdminRoute>
   }
   />
    <Route
      path="/admin/login" 
      element={<AdminLogin />}
    />
    
    <Route
      path="/order-success"
      element={<OrderSuccess />}
    />

    <Route
      path="/admin-orders"
      element={<AdminOrders />}
    />

      </Routes>

     

    </BrowserRouter>

  );
}

export default App;