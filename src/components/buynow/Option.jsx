import React, { useContext } from "react";
import { api } from "../../redux/apiConfig";
import { Logincontext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Option = ({ deleteData, get }) => {
  const { account, setAccount } = useContext(Logincontext);

  const removeData = async () => {
    const res = await api.delete(`/remove/${deleteData}`);
    const data = res.data;
    console.log(data);
    if (res.status === 400 || !data) {
      console.log("Error: Unable to delete item.");
    } else {
      setAccount(data);
      console.log("Item deleted successfully");
      // toast.success("user.message", {
      //   position: "top-center",
      // });
      // alert("item removed from cart")
      console.log("product removed successfully");
      get();
    }
  };
  return (
    <div className="add_remove_select">
      <select name="" id="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={() => removeData(deleteData)}>
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia">Save Or Later</p>
      <span>|</span>
      <p className="forremovemedia">See More like this</p>
      <ToastContainer />
    </div>
  );
};

export default Option;
