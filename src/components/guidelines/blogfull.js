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
  CardMedia,
} from "@mui/material";
import { useEffect } from "react";
import styled from "@emotion/styled";

const RenderedContent = styled("div")`
  margin: 10vh 10vw 0 10vw;
`;

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
          <Grid
            sx={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0",
                width: "80vw",
                height: "40vh",
                boxShadow: 4,
                borderRadius: "1vw",
              }}
            >
              <CardMedia
                sx={{
                  height: "100%",
                  transformOrigin: "center",
                  transform: "scale(1)",
                }}
                component="img"
                image={urls.acf?.mainimg.url}
                title={urls.acf?.title}
              ></CardMedia>
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
                    width: "30vw",
                  }}
                >
                  <Typography sx={{ marginRight: "1vw" }} variant="h5">
                    {urls.acf?.date}
                  </Typography>
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
                  <Typography
                    sx={{ marginRight: "auto", marginLeft: "1vw" }}
                    variant="h5"
                  >
                    {urls.acf?.readtime}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
            <RenderedContent
              dangerouslySetInnerHTML={{
                __html: `${urls.content.rendered}`,
              }}
            ></RenderedContent>
          </Grid>
        </Fragment>
      ))}
    </div>
  );
}

export default BlogFull;
