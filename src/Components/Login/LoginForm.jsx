import React from "react";
import { Link } from "react-router-dom";
import Input from "../forms/Input";
import Button from "../forms/Button";
import useForm from "../../Hooks/useForm";
import { TOKEN_POST, USER_GET } from "../../api";

const LoginForm = () => {
  const username = useForm(); //retorna value, setValue e onChange
  const password = useForm();

  //tenta login caso tenha um token já salvo
  React.useEffect((params) => {
    const tokenAtivo = window.localStorage.getItem("token");
    if (tokenAtivo) {
      getUser(tokenAtivo);
    }
  }, []);

  function getUser(token) {
    const { url, options } = USER_GET(token);

    fetch(url, options)
      .then((r) => r.json())
      .then((json) => {
        console.log(json);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (username.validate() && password.validate()) {
      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value,
      });

      fetch(url, options)
        .then((r) => r.json())
        .then((json) => {
          window.localStorage.setItem("token", json.token);
          console.log(json);
          getUser(json.token);
        });
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Enviar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
