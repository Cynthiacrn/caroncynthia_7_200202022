import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../actions/user.actions";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const login = { email, password };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(login);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      credentials: "include",
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/user/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(getUser(result.user_id));
        navigate("/profil");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <form action="" onSubmit={handleLogin} id="login-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <input type="submit" id="submit-btn" value="Se connecter" />
    </form>
  );
};

export default LoginForm;
