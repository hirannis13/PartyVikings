import React from "react";
import { Grid } from "@mui/material";
import "./dashboard.css";
import UserWelcome from "../userWelcome/userWelcome";
import TiktokComponent from "../socialcheck/tiktok";
import InstagramComponent from "../socialcheck/instagram";

function Dashboard() {
  return (
    <>
      <Grid
        contaiener
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <UserWelcome />
        <Grid
          container
          columnSpacing={"12vw"}
          rowSpacing={"5vh"}
          justifyContent={"center"}
          marginTop={"7vh "}
        >
          <Grid item>
            <TiktokComponent />
          </Grid>
          <Grid item>
            <InstagramComponent />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
