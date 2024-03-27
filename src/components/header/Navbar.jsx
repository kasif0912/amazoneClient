import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import LeftHeader from "./LeftHeader";
import { NavLink } from "react-router-dom";
import { Logincontext } from "../context/ContextProvider";
import { api } from "../../redux/apiConfig";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { account, setAccount } = useContext(Logincontext);
  const { products } = useSelector((state) => state.products.products);
  console.log(account);

  // for logout and my account section poppup menu
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // state to manage open and close value for drawer in mobile view
  const [dropen, setdropen] = useState(false);
  const [text, settext] = useState("");
  // console.log(text);
  const [liopen, setLiopen] = useState(true);

  const storedToken = localStorage.getItem("jwt");

  // api call
  const getValidUser = async () => {
    try {
      const res = await api.get("/getuser");
      const data = res.data;
      console.log(data);
      if (res.status !== 200) {
        console.log("can't find user");
      }
      setAccount(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  // logout
  const logout = () => {
    // Clear token from local storage
    localStorage.removeItem("jwt");
    console.log("logout successfully");
    // Clear account context
    setAccount(null);
  };

  // for open and close left drawer in mobile
  const handleopen = () => {
    setdropen(true);
  };
  const handleclose = () => {
    setdropen(false);
  };

  const gettext = (searchItems) => {
    settext(searchItems);
    setLiopen(false);
  };
  useEffect(() => {
    getValidUser();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          <Drawer open={dropen} onClose={handleclose}>
            <LeftHeader logClose={handleclose} LogoutUser={logout} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbar">
            <input
              placeholder="Search your products"
              type="text"
              name=""
              id=""
              onChange={(e) => gettext(e.target.value)}
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {/* searach filter */}
            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <NavLink
                        to={`/getproductsone/${product.id}`}
                        onClick={() => setLiopen(true)}
                      >
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            {account ? (
              <NavLink to="/" onClick={logout}>
                Sign Out
              </NavLink>
            ) : (
              <NavLink to="/login">Sign In</NavLink>
            )}
          </div>
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}
            <p>Cart</p>
          </div>
          {account ? (
            <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar
              className="avtar"
              // id="basic-button"
              // aria-controls={open ? "basic-menu" : undefined}
              // aria-haspopup="true"
              // aria-expanded={open ? "true" : undefined}
              // onClick={handleClick}
            ></Avatar>
          )}

          {/* for profile popup menu include logout and my account */}

          {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {account ? (
              <MenuItem onClick={handleClose}>
                <LogoutIcon style={{ fontSize: "16", marginRight: "3" }} />
                Logout
              </MenuItem>
            ) : (
              ""
            )}
          </Menu> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
