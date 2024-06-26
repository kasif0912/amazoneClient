import React, { useContext, useEffect, useState } from "react";
import "../cart/cart.css";
import { Divider } from "@mui/material";
import { api } from "../../redux/apiConfig";
import { useParams, useNavigate } from "react-router-dom";
import { Logincontext } from "../context/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";

const Cart = () => {
  const { id } = useParams("");
  const navigate = useNavigate();
  // console.log(id);

  const { account, setAccount } = useContext(Logincontext);
  const [inddata, setIndedata] = useState("");
  console.log("Individual product details", inddata);

  // for getting single product details
  const getintdata = async () => {
    const res = await api.get(`/getproductsone/${id}`);
    console.log(res.data);
    if (res.status !== 200) {
      alert("no data available");
    } else {
      setIndedata(res.data.individualData);
    }
  };

  useEffect(() => {
    setTimeout(getintdata, 1000);
  }, [id]);

  // function for to add product in cart
  const addtocart = async (id) => {
    console.log(id);
    try {
      const response = await api.post(`/addcart/${id}`);
      const data = response.data;
      console.log(data);
      if (response.status !== 201) {
        alert("no data available");
      } else {
        console.log("product added in cart");
        setAccount(data);
        navigate("/buynow");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleBuyNow = () => {
  //   // Navigate to BuyNow page with respective data
  //   navigate("/buynow", { state: { productData: inddata } });
  // };
  return (
    <div className="cart_section">
      {inddata && Object.keys(inddata).length && (
        <div className="cart_container">
          {/* left side  product image part */}
          <div className="left_cart">
            <img src={inddata.detailUrl} alt="cart" />
            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart(inddata.id)}
              >
                Add to Cart
              </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
          </div>
          {/* right side product details */}
          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className="mrp">
              M.R.P. : <del>₹{inddata.price.mrp}</del>
            </p>
            <p>
              Deal of the Day :{" "}
              <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span>
            </p>
            <p>
              You save :{" "}
              <span style={{ color: "#B12704" }}>
                {" "}
                ₹{inddata.price.mrp - inddata.price.cost} (
                {inddata.price.discount}){" "}
              </span>
            </p>

            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{inddata.discount}</span>
              </h5>
              <h4>
                FREE Delivery :
                <span style={{ color: "#111", fontWeight: "600" }}>
                  Oct 8 - 21
                </span>{" "}
                Details
              </h4>
              <p style={{ color: "#111" }}>
                Fastest delivery:
                <span style={{ color: "#111", fontWeight: "600" }}>
                  Tomorrow 11AM
                </span>
              </p>
            </div>

            <p className="description">
              About the Item :{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.4px",
                }}
              >
                {inddata.description}
              </span>
            </p>
          </div>
        </div>
      )}

      {!inddata ? (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
