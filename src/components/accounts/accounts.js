import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../utils/UserList";

function Accounts() {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "90%",
          marginBottom: "5vh",
        }}
      ></div>
      <UserList />
    </>
  );
}

export default Accounts;
