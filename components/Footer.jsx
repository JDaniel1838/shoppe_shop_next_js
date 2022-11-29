import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="container-links">
        <h3>NOSOTROS</h3>
        <p>¿Quienes somos?</p>
        <p>Ubicación</p>
        <p>Historia</p>
        <p>Formas de pago</p>
      </div>

      <div className="container-links">
        <h3>AYUDA</h3>
        <p>Preguntas frecuentes</p>
        <p>Contáctenos por teléfono</p>
        <p>Contáctenos por correo electrónico</p>
      </div>

      <div className="container-links">
        <h3>NUESTRAS POLÍTICAS</h3>
        <p>Políticas generales de la tienda</p>
        <p>Políticas de la tienda online.</p>
        <p>Políticas de privacidad.</p>
        <p>Avisos de privacidad.</p>
      </div>

      <div className="content-logo">
        <Image
          src="/shoppe_shop_icon_large.svg"
          alt="me"
          width="150"
          height="150"
        />
        <h3>SHOPPE SHOP</h3>
        <hr />
        <p>Copyright © 2022 por SHOPPE SHOP</p>
      </div>
    </div>
  );
};

export default Footer;
