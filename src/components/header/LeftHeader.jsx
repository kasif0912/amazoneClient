import React, { useContext } from "react";
import { Avatar, Divider } from "@mui/material";
import { Logincontext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
import "./rightheader.css";
import LogoutIcon from "@mui/icons-material/Logout";

const LeftHeader = ({ logClose, LogoutUser }) => {
  const { account, setAccount } = useContext(Logincontext);

  return (
    <>
      <div className="leftheader">
        <div className="left_nav">
          {account ? (
            <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar"></Avatar>
          )}
          {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
        </div>
        <div className="nav_btn" onClick={() => logClose()}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Shop By category</NavLink>

          <Divider style={{ width: "100%", marginLeft: "-20px" }} />

          <NavLink to="/">today's Deal</NavLink>
          {account ? (
            <NavLink to="/buynow">Your orders</NavLink>
          ) : (
            <NavLink to="/login">Your orders</NavLink>
          )}

          <Divider style={{ width: "100%", marginLeft: "-20px" }} />

          <div className="flag">
            <NavLink to="/">Settings</NavLink>
            <img
              src="india.png"
              alt="india flag"
              style={{ width: 35, marginLeft: 10 }}
            />
          </div>

          {account ? (
            <div className="flag">
              <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
              <h3
                onClick={() => LogoutUser()}
                style={{ cursor: "pointer", fontWeight: 500 }}
              >
                LogOut
              </h3>
            </div>
          ) : (
            <NavLink to="/login">SignIn</NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default LeftHeader;
