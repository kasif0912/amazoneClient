import React from "react";

const Subtotal = ({ item }) => {
  // Calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    item.forEach((e) => {
      totalPrice += e.price.cost;
    });
    return totalPrice.toFixed(2); // Round to 2 decimal places
  };

  return (
    <div className="sub_item">
      <h3>
        Subtotal ({item.length} items):
        <strong style={{ fontWeight: "700", color: "#111" }}>
          {" "}
          ₹{calculateTotalPrice()}
        </strong>
      </h3>
    </div>
  );
};

export default Subtotal;
