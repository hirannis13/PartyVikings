import React from "react";
import BlogFull from "./blogfull";
import BlogCard from "./blogcard";
import Carousel from "../utils/CategorySelectionCarousell";
import { useState, useEffect } from "react";

function Guidelines() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  const categories = [
    {
      type: "Search",
      pictureUrl:
        "https://images.unsplash.com/photo-1528821128474-27f963b062bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      type: "Photography",
      pictureUrl:
        "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      type: "Communication",
      pictureUrl:
        "https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      type: "Strategies",
      pictureUrl:
        "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      type: "Graphics",
      pictureUrl:
        "https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=728&q=80",
    },
    {
      type: "Brand's Visual Identity",
      pictureUrl:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80",
    },
  ];

  const urls = [
    "https://partyvikings.dorikeczko.com/wp-json/wp/v2/photography?_embed&v=9999",
    "https://partyvikings.dorikeczko.com/wp-json/wp/v2/communication?_embed&v=9999",
    "https://partyvikings.dorikeczko.com/wp-json/wp/v2/graphic?_embed&v=9999",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const jsonData = await Promise.all(
          responses.map((response) => response.json())
        );
        const combinedData = jsonData.reduce(
          (accumulator, currentData) => accumulator.concat(currentData),
          []
        );
        setData(combinedData);
        console.log(combinedData, "data of stuff");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/*<BlogFull />*/}
      <Carousel
        categories={categories}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <BlogCard data={data} />
    </div>
  );
}

export default Guidelines;
