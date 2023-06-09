import React, { useState, useEffect } from "react";
import "./DogRegister.css";
import MenuBar from "../MenuBar/MenuBar";
import axios from "axios";

function DogRegister(props) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    console.log("ID do usuário logado:", storedUserId);

    axios
      .get(`http://localhost:4000/users/${storedUserId}`)
      .then((response) => {
        console.log(response.data);
        setUserName(response.data.nome);
      })
      .catch((error) => {
        console.error("Erro ao obter o nome do usuário:", error);
      });
  }, []);

  const [values, setValues] = useState({
    breed: "",
    name: "",
    sex: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    console.log("Raça:", values.breed);
    console.log("Nome:", values.name);
    console.log("Sexo:", values.sex);

    const dogData = {
      breed: values.breed,
      name: values.name,
      sex: values.sex,
    };

    axios
      .post("http://localhost:4000/cachorros", {
        ...dogData,
        id_cliente: parseInt(userId),
      })
      .then((response) => {
        console.log(response.data);
        setIsRegistered(true);
        setValues({ breed: "", name: "", sex: "" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="register-body">
      <MenuBar />
      <div className="register-container">
        <h1 className="register-title">Cadastro de Cachorro</h1>
        <form>
          <label className="register-label">Raça:</label>
          <input
            type="text"
            name="breed"
            value={values.breed}
            onChange={handleInputChange}
            className="register-input"
          />

          <label className="register-label">Nome:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            className="register-input"
          />

          <label className="register-label">Sexo:</label>
          <select
            name="sex"
            value={values.sex}
            onChange={handleInputChange}
            className="register-input"
          >
            <option value="">Selecione</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>

          <div className="register-button-container">
            <button
              type="button"
              onClick={handleRegister}
              className="register-button"
            >
              Cadastrar
            </button>
          </div>
        </form>

        {isRegistered && (
          <div>Cachorro cadastrado com sucesso para {userName}!</div>
        )}
      </div>
    </div>
  );
}

export default DogRegister;
