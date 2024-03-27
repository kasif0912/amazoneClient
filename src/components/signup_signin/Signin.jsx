import React, { useContext, useState } from "react";
import "../signup_signin/signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../redux/apiConfig";
import { Logincontext } from "../context/ContextProvider";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { account, setAccount } = useContext(Logincontext);
  const navigate = useNavigate();

  // console.log(formData);
  const adddata = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData(() => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    // Check if any field is empty
    if (!email || !password) {
      toast.warn("Please fill in all fields.", {
        position: "top-center",
      });
      return;
    }
    try {
      const res = await api.post("/login", formData);
      const user = res.data;
      if (user.jwt) {
        localStorage.setItem("jwt", user.jwt);
      }
      // Check the response status
      if (res.status === 200) {
        // Handle successful login
        console.log("Logged in user:", user);
        toast.success(user.message, {
          position: "top-center",
        });
        setAccount(user.user);
        setFormData({
          email: "",
          password: "",
        });
        // navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("User not found with this email", {
          position: "top-center",
        });
        // Handle error - show error message to the user
      } else if (error.response && error.response.status === 401) {
        toast.error("Invalid Password", {
          position: "top-center",
        });
      } else {
        console.log("Can't login right now. Try later");
      }
    }
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     const data = new FormData(e.currentTarget);

  //     const userData = {
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     };
  // console.log(user);
  //   };
  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="signupimg" />
        </div>
        <div className="sign_form">
          {/* form container */}
          <form onSubmit={handleSubmit}>
            <h1>Sign-In</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={adddata}
                value={formData.email}
                name="email"
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={adddata}
                value={formData.password}
                placeholder="At least 6 characters"
              />
            </div>
            <button type="submit" className="signin_btn">
              Continue
            </button>
          </form>
          <ToastContainer />
        </div>
        <div className="create_accountinfo">
          <p>New to Amazon?</p>
          <Divider />
          {/* button for navigate to signup page */}
          <button>
            <NavLink to="/signup">Create your Amazon Account</NavLink>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Signin;
