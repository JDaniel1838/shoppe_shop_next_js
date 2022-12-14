import React from "react";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

/* const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Beset Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}; */

const Home = ({ products, bannerData }) => {
  return (
    <>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
      <div className="products-heading">
        <h2>Productos Más Vendidos</h2>
        <p>Encuentra lo que buscas.</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} isForSlider={false} />
        ))}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const query = "*[_type=='product']";
  const products = await client.fetch(query);

  const bannerQuery = "*[_type=='banner']";
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
