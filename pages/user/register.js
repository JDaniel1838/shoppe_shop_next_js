import React, { useState, useEffect } from "react";
import { BsPersonFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import Loader from "../../components/Loader";
import { AiFillCloseCircle } from "react-icons/ai";
import Router from "next/router";
import { useStateContext } from "../../context/StateContext";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msgErr, setMsgErr] = useState(false);
  const { setDataUser } = useStateContext();

  useEffect(() => {
    const setUser = async () => {
      if (
        phoneNumber === "" ||
        password === "" ||
        name === "" ||
        lastName === "" ||
        address === ""
      ) {
        return false;
      }

      setIsLoading(true);

      console.log("Renderizando Loader:" + isLoading);
      setDataUser({
        phoneNumber,
        password,
        name,
        lastName,
        address,
      });

      Router.push("/user/validate_phone_number");

      /* try {
        const res = await fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
            names: name,
            lastName: lastName,
            address: address,
            password: password,
            repassword: password,
          }),
        });

        if (!res.ok) {
          throw new Error("Error al recibir información de la API");
        }

        const { token } = await res.json();
        setIsLoading(false);
        setPassword("");
        setPhoneNumber("");
        setName("");
        setPhoneNumber("");
        setAddress("");
        setMsgSuccess(true);
        Router.push("/user/validate_phone_number");
        console.log(token);
      } catch (err) {
        setIsLoading(false);
        setMsgErr(true);
        console.log(err);
      } */
    };

    setUser();
  }, [isSend]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(e);
    if (isSend) {
      setIsSend(false);
    } else {
      setIsSend(true);
    }
  };

  const handleChangePhone = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const closeAlert = () => {
    setMsgErr(false);
  };

  return (
    <div className="container-register">
      <div className="div-header-register">
        <h2>CREAR CUENTA</h2>
        <Image
          src="/register_img.svg"
          alt="me"
          className="img-register"
          width="120"
          height="120"
        />
      </div>
      <div className="div-main-register">
        <div style={{ height: "65px", overflow: "hidden" }}>
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            style={{ height: "100%", width: "100%" }}
          >
            <path
              d="M-0.18,112.01 C259.97,193.92 208.61,4.46 500.94,117.94 L500.00,150.00 L0.00,150.00 Z"
              style={{ stroke: "none", fill: "#FFD523" }}
            ></path>
          </svg>
        </div>
        <div className="background-register">
          <form className="div-register" onSubmit={handleSubmitForm}>
            <div className="logo-register">
              <BsPersonFill />
            </div>
            <div className="container-input">
              <input
                placeholder="Nombre(s)"
                name="name"
                value={name}
                onChange={handleChangeName}
                required
              />
            </div>

            <div className="container-input">
              <input
                placeholder="Apellidos"
                name="last-name"
                value={lastName}
                onChange={handleChangeLastName}
                required
              />
            </div>

            <div className="container-input">
              <input
                placeholder="Dirección"
                name="address"
                value={address}
                onChange={handleChangeAddress}
                required
              />
            </div>

            <div className="container-input">
              <input
                placeholder="Número de teléfono"
                type="tel"
                name="phone"
                value={phoneNumber}
                onChange={handleChangePhone}
                required
              />
            </div>

            <div className="container-input">
              <input
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handleChangePassword}
                required
              />
            </div>

            <button className="button-login">CREAR CUENTA</button>

            <p className="link-register">
              ¿Ya tienes cuenta? <Link href="/user/login">Inicia sesión</Link>
            </p>
          </form>

          {isLoading && (
            <div className="div-bg-alert">
              <Loader />
            </div>
          )}

          {msgErr && (
            <div className="div-bg-alert">
              <div className="err-msg">
                <AiFillCloseCircle />
                <h4>Ingrese los datos correctamente.</h4>
                <button onClick={closeAlert}>Cerrar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
