import React, { useState, useEffect } from "react";
import { BsPersonFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import Loader from "../../components/Loader";
import { AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import Router from "next/router";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState(false);
  const [msgErr, setMsgErr] = useState(false);

  useEffect(() => {
    const setUser = async (url) => {
      if (phoneNumber === "" || password === "") {
        return false;
      }
      setIsLoading(true);
      console.log("Renderizando Loader:" + isLoading);
      try {
        const res = await fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
            password: password,
          }),
        });

        console.log(res.ok, res.status);

        if (!res.ok) {
          throw new Error("Error al recibir información de la API");
        }

        const { token } = await res.json();
        setIsLoading(false);
        setPassword("");
        setPhoneNumber("");
        setMsgSuccess(true);
        Router.push("/");

        console.log(token);
      } catch (err) {
        setIsLoading(false);

        setMsgErr(true);
        console.log(err);
      }
    };

    setUser("http://192.168.1.108:5000/api/v1/auth/login");
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

  const closeAlert = () => {
    setMsgErr(false);
  };

  const closeAlertSuccess = () => {
    setMsgSuccess(false);
  };

  return (
    <div className="container-login">
      <div className="div-header-login">
        <h2>Inicio de sesión</h2>
        <Image
          src="/login_img.svg"
          alt="me"
          className="img-login"
          width="120"
          height="120"
        />
      </div>
      <div className="div-main-login">
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
        <div className="background-login">
          <form className="div-login" onSubmit={handleSubmitForm}>
            <div className="logo-login">
              <BsPersonFill />
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

            <button type="submit" className="button-login">
              INICIAR
            </button>

            <p className="link-register">
              ¿Aún no tienes cuenta?{" "}
              <Link href="/user/register">Crear cuenta</Link>
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
                <h4>Número de teléfono o contraseña no encontrados.</h4>
                <button onClick={closeAlert}>Cerrar</button>
              </div>
            </div>
          )}

          {msgSuccess && (
            <div className="div-bg-success">
              <div className="success-msg">
                <AiOutlineCheckCircle />
                <h4>Bienvenido.</h4>
                <button onClick={closeAlertSuccess}>Cerrar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
