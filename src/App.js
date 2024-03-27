import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import Maincomp from "./components/home/Maincomp";
import Newnav from "./components/newnavbar/Newnav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/signup_signin/Signin";
import Signup from "./components/signup_signin/Signup";
import Cart from "./components/cart/Cart";
import Buynow from "./components/buynow/Buynow";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import Success from "./components/buynow/Success";
import Cancel from "./components/buynow/Cancel";

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, []);
  return (
    <>
      {data ? (
        <>
          <BrowserRouter>
            <Navbar />
            <Newnav />
            <Routes>
              <Route exact path="/login" element={<Signin />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/" element={<Maincomp />} />
              <Route exact path="/getproductsone/:id" element={<Cart />} />
              <Route exact path="/buynow" element={<Buynow />} />
              <Route exact path="/success" element={<Success />} />
              <Route exact path="/cancel" element={<Cancel />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
}

export default App;
