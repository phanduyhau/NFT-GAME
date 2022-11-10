import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Product from "../../components/Product/Product";
import Catalog from "./Catalog/Catalog";
import Catory from "./Catory/Catory";
import Free from "./Free/Free";
import Intro from "./Intro/Intro";
import Popular from "./Popular/Popular";
import Typiccal from "./Typical/Typiccal";

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://json-server-augustus-game.herokuapp.com/products")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      <Intro data={data} />
      <Free />
      <Catory />
      <Catalog />
      <Popular />
      <Typiccal />
      {/* <Product /> */}
    </>
  );
}

export default Home;
