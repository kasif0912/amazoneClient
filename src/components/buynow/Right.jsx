import React from "react";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { loadStripe } from "@stripe/stripe-js";

const Right = ({ item }) => {
  const [val, setVal] = useState(false);

  // Calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    item.forEach((e) => {
      totalPrice += e.price.cost;
    });
    return totalPrice.toFixed(2); // Round to 2 decimal places
  };
  // console.log(calculateTotalPrice());
  console.log(item);

  // payment integeration
  const makePayment = async () => { 
    const stripe = await loadStripe(
      "pk_test_51OwgfASBZRhVBRtafeFiaDN38gSs2kJHJ1u1Qvh3H83lLKC3Sz8VXnK2P9mE72DkdxWlw9JlSlrM5Vho9NETLiI000sZAcvYl5"
    );
    const body = {
      products: item,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:8000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="right_buy">
      <img
        src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
        alt="rightimg"
      />
      <div className="cost_right">
        <p>Your order is eligible for FREE Delivery.</p>
        <br />
        <span style={{ color: "#565959" }}>
          Select this option at checkout. Details
        </span>

        <h3>
          Subtotal ({item.length} items):
          <span style={{ fontWeight: "700" }}> ₹{calculateTotalPrice()}</span>
        </h3>
        <button className="rightbuy_btn"  onClick={makePayment}>
          Proceed to Buy
        </button>

        <div className="emi" onClick={() => setVal(!val)}>
          Emi available
          {!val ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </div>
        <span className={val ? "show" : "hide"}>
          {" "}
          Your order qualifies for EMI with valid credit cards (not available on
          purchase of Gold, Jewelry, Gift cards and Amazon pay balance top up).
          Learn more
        </span>
      </div>
    </div>
  );
};

export default Right;
