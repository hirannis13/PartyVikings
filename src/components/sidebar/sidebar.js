import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { logOut } from "../../service/authService";
import { useNavigate } from "react-router-dom";
import Image from "mui-image";
import Iconify from "../utils/Iconify";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const navigate = useNavigate();

  const logOutHandler = () => {
    logOut(navigate);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        height: "100%",
        backgroundColor: "#2a403e",
      }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{ margin: "3vh 0", height: "7%" }}>
        <Image
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
          fit="contain"
          height="100%"
        />
      </div>
      <List>
        <ListItem disablePadding>
          <ListItemButton href="/dashboard">
            <ListItemIcon>
              <Iconify
                icon={"tabler:dashboard"}
                style={{ color: "#c1c7c9", width: "30", height: "30" }}
              ></Iconify>
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} sx={{ color: "#c1c7c9" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/guidelines">
            <ListItemIcon>
              <Iconify
                icon={"mdi:book-open-page-variant-outline"}
                style={{ color: "#c1c7c9", width: "30", height: "30" }}
              ></Iconify>
            </ListItemIcon>
            <ListItemText primary={"Guidelines"} sx={{ color: "#c1c7c9" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/chat">
            <ListItemIcon>
              <Iconify
                icon={"tabler:message"}
                style={{ color: "#c1c7c9", width: "30", height: "30" }}
              ></Iconify>
            </ListItemIcon>
            <ListItemText primary={"Chat"} sx={{ color: "#c1c7c9" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/todo">
            <ListItemIcon>
              <Iconify
                icon={"material-symbols:format-list-bulleted-rounded"}
                style={{ color: "#c1c7c9", width: "30", height: "30" }}
              ></Iconify>
            </ListItemIcon>
            <ListItemText primary={"To do"} sx={{ color: "#c1c7c9" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/files">
            <ListItemIcon>
              <Iconify
                icon={"mingcute:folder-upload-line"}
                style={{ color: "#c1c7c9", width: "30", height: "30" }}
              ></Iconify>
            </ListItemIcon>
            <ListItemText primary={"Files"} sx={{ color: "#c1c7c9" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/accounts">
            <ListItemIcon>
              <Iconify
                icon={"ic:sharp-people"}
                style={{ color: "#c1c7c9", width: "30", height: "30" }}
              ></Iconify>
            </ListItemIcon>
            <ListItemText primary={"Accounts"} sx={{ color: "#c1c7c9" }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={logOutHandler}>
            <ListItemIcon>
              <Iconify
                icon="ic:round-power-settings-new"
                style={{ color: "#c1c7c9", width: "30", height: "30" }}
              ></Iconify>
            </ListItemIcon>
            <ListItemText primary={"Log Out"} sx={{ color: "#c1c7c9" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={"anchor"}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon
              sx={{
                width: "2vw",
                height: "2vw",
                color: "var(--green)",
                mixBlendMode: "difference",
              }}
            />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
