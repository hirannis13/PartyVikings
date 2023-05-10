import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

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
    </>
  );
}

export default Accounts;
