import React from "react";
import { Link } from "react-router-dom";
import Input from "../forms/Input";
import Button from "../forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";

const LoginForm = () => {
  const username = useForm(); //retorna value, setValue e onChange
  const password = useForm();

  const { userLogin } = React.useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
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
