import { Divider } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../signup_signin/signup.css";
import { api } from "../../redux/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });
  // console.log(udata);

  const adddata = (e) => {
    const { name, value } = e.target;
    // console.log(name,value);
    setUdata((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e, dispatch) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = udata;

    // Check if any field is empty
    if (!fname || !email || !mobile || !password || !cpassword) {
      toast.warn("Please fill in all fields.", {
        position: "top-center",
      });
      return;
    }
    if (password !== cpassword) {
      toast.warn("Passwords do not match.", {
        position: "top-center",
      });
      return;
    }
    try {
      const res = await api.post("/register", udata);
      const user = res.data;
      if (user.jwt) {
        localStorage.setItem("jwt", user.jwt);
      }
      console.log("user successfully registered", user);

      if (res.status === 201) {
        // Handle successful signup
        // console.log("signUp-Success", user.Createduser);
        toast.success(user.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        setUdata({
          fname: "",
          email: "",
          mobile: "",
          password: "",
          cpassword: "",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 420) {
        toast.error("this email is already present", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="signupimg" />
        </div>
        <div className="sign_form">
          <form onSubmit={handleSubmit}>
            <h1>Create account</h1>
            <div className="form_data">
              <label htmlFor="fname">Your name</label>
              <input
                type="text"
                onChange={adddata}
                value={udata.fname}
                name="fname"
                id="fname"
              />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={adddata}
                value={udata.email}
                name="email"
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="mobile">Mobile number</label>
              <input
                type="number"
                onChange={adddata}
                value={udata.mobile}
                name="mobile"
                id="mobile"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={adddata}
                value={udata.password}
                id="password"
                placeholder="At least 6 characters"
              />
            </div>
            <div className="form_data">
              <label htmlFor="passwordg">Password again</label>
              <input
                type="password"
                onChange={adddata}
                value={udata.cpassword}
                name="cpassword"
                id="passwordg"
              />
            </div>
            <button type="submit" className="signin_btn">
              Continue
            </button>

            <Divider />

            <div className="signin_info">
              <p>Already have an account?</p>
              <NavLink to="/login">Sign in</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Signup;
