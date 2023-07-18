import { useEffect, useState } from "react";
import { Offline, Online } from "react-detect-offline";
import toast, { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Footer from "./Components/Footer/Footer";
import About from "./Components/About/About";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import NonFound from "./Components/NonFound/NonFound";
import jwtDecode from "jwt-decode";
import ProdectedRoute from "./Components/ProdectedRoute/ProdectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CheckOut from "./Components/CheckOut/CheckOut";
import { CartContextProvider } from "./Components/Context/Context";

function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);
  const [userData, setUserData] = useState(null);
  function saveUserData() {
    let encodeToken = localStorage.getItem("userToken");
    let decodeToken = jwtDecode(encodeToken);
    setUserData(decodeToken);
  }
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout setUserData={setUserData} userData={userData} />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "cart",
          element: (
            <ProdectedRoute>
              <Cart />
            </ProdectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProdectedRoute>
              <CheckOut />
            </ProdectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: <ProductDetails />,
        },
        {
          path: "login",
          element: <Login saveUserData={saveUserData} />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "products",
          element: (
            <ProdectedRoute>
              <Products />
            </ProdectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProdectedRoute>
              <Brands />
            </ProdectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProdectedRoute>
              <Categories />
            </ProdectedRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProdectedRoute>
              <About />
            </ProdectedRoute>
          ),
        },
        { path: "footer", element: <Footer /> },
        { path: "*", element: <NonFound /> },
      ],
    },
  ]);
  return (
    <>
      <CartContextProvider>
        <Offline>
          <div className="offline-div">Only shown offline (surprise!)</div>
        </Offline>
        <Toaster />
        <RouterProvider router={routers}></RouterProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
