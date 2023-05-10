import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../utils/UserList";

function Accounts() {
  const navigate = useNavigate();

  return (
    <>
      <Typography>Accounts</Typography>
      <Button
        variant="outlined"
        color="info"
        onClick={() => {
          navigate("/signUp");
        }}
      >
        Create new account
      </Button>
      <UserList />
    </>
  );
}

export default Accounts;
