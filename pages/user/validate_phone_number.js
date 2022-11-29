import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Router from "next/router";
import { useStateContext } from "../../context/StateContext";
import Loader from "../../components/Loader";

const validatePhoneNumber = () => {
  const { dataUser } = useStateContext();

  const [isSend, setIsSend] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const createUser = async (url) => {
      if (code === "") {
        return false;
      }

      if (code !== "020820") {
        toast.error("El código no es correcto, vuelve a intentar.");
        setCode("");
        return false;
      }

      setIsLoading(true);

      try {
        const res = await fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: dataUser.phoneNumber,
            names: dataUser.name,
            lastName: dataUser.lastName,
            address: dataUser.address,
            password: dataUser.password,
            repassword: dataUser.password,
          }),
        });

        if (!res.ok) {
          throw new Error("Error al recibir información de la API");
        }

        toast.success("Código de verificación correcto.");
        Router.push("/user/success");
      } catch (error) {
        setIsLoading(false);
        toast.error(
          "Ha ocurrido un error inesperando, por favor intentelo nuevamente"
        );
        Router.push("/user/register");
      }
    };
    createUser("http://192.168.1.108:5000/api/v1/auth/register");
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

  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="container-number">
      <h4>Ingresa el código que hemos enviado a</h4>
      <h5>+52 {dataUser.phoneNumber}</h5>

      <form onSubmit={handleSubmitForm}>
        <input
          value={code}
          onChange={handleChangeCode}
          required
          maxLength={6}
          minLength={6}
          type="tel"
        />
        <button>Continuar</button>
      </form>

      {isLoading && (
        <div className="message-loading">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default validatePhoneNumber;
