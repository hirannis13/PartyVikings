import React from "react";
import { useEffect, useState } from "react";

import { Card, Grid, CardContent, Typography, Divider } from "@mui/material";

function BlogFull() {
  const [data, setData] = useState([]);
  const urls = [
    "https://partyvikings.dorikeczko.com/wp-json/wp/v2/photography?_embed&v=9999",
    "https://partyvikings.dorikeczko.com/wp-json/wp/v2/communication?_embed&v=9999",
    "https://partyvikings.dorikeczko.com/wp-json/wp/v2/graphic?_embed&v=9999",
  ];

  useEffect(() => {
    fetch(urls)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!Array.isArray(data) || data.length <= 0) {
    return null;
  }

  return (
    <div>
      {data.map((urls, index) => (
        <>
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
              ></img>
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
        </>
      ))}
    </div>
  );
}

export default BlogFull;
