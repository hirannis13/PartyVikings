import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Card, CardContent, IconButton, Input } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const CarouselContainer = styled("div")`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: center;
`;

const CardStyled = styled(Card)(({ active, pictureurl, issearchcard }) => ({
  flex: "0 0 17%",
  maxWidth: "17%",
  margin: "0 8px",
  height: active ? "20vh" : "15vh",
  backgroundColor: active ? "#3f51b5" : "#eee",
  color: active ? "#f11" : "inherit",
  backgroundImage: `url(${pictureurl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  ...(issearchcard && {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  }),
}));

const Carousel = ({ categories, searchValue, setSearchValue }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const visibleCards = [activeIndex - 1, activeIndex, activeIndex + 1].map(
    (index) => categories[(index + categories.length) % categories.length]
  );

  return (
    <CarouselContainer>
      <IconButton onClick={handlePrev}>
        <ArrowBack />
      </IconButton>
      {visibleCards.map((category, index) => (
        <CardStyled
          key={index}
          active={index === 1 ? true : undefined}
          pictureurl={category.pictureUrl}
          issearchcard={category.type === "Search" ? true : undefined}
          onClick={() =>
            handleCardClick((activeIndex - 1 + index) % categories.length)
          }
        >
          <CardContent>
            <h3>{category.type}</h3>
          </CardContent>
          {category.type === "Search" && (
            <Input
              type="search"
              placeholder="Search..."
              style={{ marginBottom: "16px" }}
              value={searchValue}
              onChange={handleInputChange}
            />
          )}
        </CardStyled>
      ))}
      <IconButton onClick={handleNext}>
        <ArrowForward />
      </IconButton>
    </CarouselContainer>
  );
};

export default Carousel;
