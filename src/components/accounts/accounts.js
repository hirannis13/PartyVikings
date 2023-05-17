import { Button, Typography } from "@mui/material";
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
      >
        <Button
          variant="outlined"
          color="info"
          onClick={() => {
            navigate("/signUp");
          }}
        >
          Create new account
        </Button>
      </div>
      <UserList />
    </>
  );
}

export default Accounts;
