import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="sucess-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Gracias por su compra.</h2>
        <p className="email-msg">
          Le hemos mandando un mensaje a su correo electrónico.
        </p>
        <p className="description">
          Si tiene alguna duda, puede mandarnos un mensaje a
          <a className="email" href="mailto:shoppe_shop@support.com">
            shoppe_shop@support.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continuar Comprando
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
