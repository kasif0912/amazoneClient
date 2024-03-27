import React, { useEffect, useState } from "react";
import "../buynow/buynow.css";
import { Divider } from "@mui/material";
import Option from "./Option";
import Subtotal from "./Subtotal";
import Right from "./Right";
import { useLocation } from "react-router-dom";
import { api } from "../../redux/apiConfig";

const Buynow = () => {
  // const location = useLocation();
  const [cartData, setCartData] = useState("");
  console.log(cartData);

  // useEffect(() => {
  //   if (location.state && location.state.productData) {
  //     console.log("Product data from Cart:", location.state.productData);
  //   }
  // }, [location.state]);

  const buyNowCart = async () => {
    const res = await api.get("/cartdetails");
    const data = res.data;
    if (res.status !== 200) {
      console.log("cannot get cartDetails");
    }
    setCartData(data);
  };

  useEffect(() => {
    buyNowCart();
  }, []);

  return (
    <>
      {cartData.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all items</p>
              <span className="leftbuyprice">Price</span>
              <Divider />

              {cartData.map((e, k) => {
                return (
                  <>
                    <div className="item_containert">
                      <img src={e.detailUrl} alt="" />
                      <div className="item_details">
                        <h3>{e.title.longTitle}</h3>
                        <h3>{e.title.shortTitle}</h3>
                        <h3 className="diffrentprice">₹{e.price.cost}</h3>
                        <p className="unusuall">Usually dispatched in 8 days</p>
                        <p>Eligible for FREE Shipping</p>
                        <img
                          src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png%22%20alt=%22logo"
                          alt=""
                        />
                        <Option deleteData={e.id} get={buyNowCart}/>
                      </div>
                      <h3 className="item_price">₹{e.price.cost}</h3>
                    </div>
                    <Divider />
                  </>
                );
              })}

              <Divider />
              <Subtotal item={cartData} />
            </div>

            {/* for right buy container */}
            <Right item={cartData} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Buynow;
