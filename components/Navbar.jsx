import React from "react";
import Link from "next/link";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import Image from "next/image";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <Image src="/shoppe_shop_icon.svg" alt="me" width="42" height="42" />
        </Link>
      </p>

      <div className="nav-container-buttons">
        <button type="button" className="cart-user">
          <Link href="/user/login">
            <FaUserAlt />
          </Link>
        </button>

        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <FaShoppingCart />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
