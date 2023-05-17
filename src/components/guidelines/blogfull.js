import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Iconify from "../utils/Iconify";
import {
  IconButton,
  Card,
  Grid,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { useEffect } from "react";

function BlogFull(data) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when navigation occurs
    window.scrollTo(0, 0);
  }, [location]);

  if (Object.values(data).length <= 0) {
    return null;
  }

  return (
    <div>
      <IconButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <Iconify
          icon={"material-symbols:arrow-back-rounded"}
          width={24}
          height={24}
        />
      </IconButton>
      {Object.values(data).map((urls, index) => (
        <Fragment key={index}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0",
              width: "80vw",
              height: "40vh",
              boxShadow: 4,
              borderRadius: "1vw",
            }}
          >
            <CardContent
              sx={{
                width: "40%",
                paddingLeft: "5%",
                paddingRight: "3%",
              }}
            >
              <img
                src={urls.acf?.mainimg.url}
                height={"350vh"}
                alt={urls.acf?.title}
              />
            </CardContent>
            <CardContent
              sx={{
                width: "40%",
                paddingRight: "5%",
                paddingLeft: "3%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "left",
              }}
            >
              <Typography variant="h6">{urls.acf?.category}</Typography>
              <Typography variant="h3" sx={{ margin: "2vh 0 6vh 0" }}>
                {urls.acf?.title}
              </Typography>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "40%",
                }}
              >
                <Typography variant="h5">{urls.acf?.date}</Typography>
                <Divider
                  orientation="vertical"
                  role="presentation"
                  flexItem
                  sx={{
                    borderRightWidth: "2px",
                    borderColor: "#48494B",
                    borderRadius: "5px",
                  }}
                ></Divider>
                <Typography variant="h5">{urls.acf?.readtime}</Typography>
              </Grid>
            </CardContent>
          </Card>
          <div
            dangerouslySetInnerHTML={{
              __html: `${urls.content.rendered}`,
            }}
          ></div>
        </Fragment>
      ))}
    </div>
  );
}

export default BlogFull;
