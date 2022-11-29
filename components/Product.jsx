import React from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price }, isForSlider }) => {
  return (
    <div className={isForSlider ? "my-card-product-slider" : "my-card-product"}>
      <div className="product-card">
        <img
          src={urlFor(image && image[0])}
          className="product-image"
          alt={`product-${name}`}
        />
        <p className="product-name">{name.toUpperCase()}</p>
        <p className="product-price">${price}</p>
        <button type="button" className="btn-product">
          <Link href={`/product/${slug.current}`}>
            <FaShoppingCart />
            <span>AGREGAR</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Product;