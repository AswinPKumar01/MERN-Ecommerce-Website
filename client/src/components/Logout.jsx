import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/apiCalls";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout(dispatch);
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
