// esse componente serve para dar acesso global do usuário na Aplicação
import React from "react";
import { TOKEN_POST, USER_GET } from "./api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  function getUser(token) {
    const { url, options } = USER_GET(token);

    fetch(url, options)
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        setLogin(true);
        console.log(json);
      });
  }

  function userLogin(username, password) {
    const { url, options } = TOKEN_POST({ username, password });

    fetch(url, options)
      .then((r) => r.json())
      .then(({ token }) => {
        window.localStorage.setItem("token", token);
        getUser(token);
      });
  }

  return (
    <UserContext.Provider value={{ userLogin, data }}>
      {children}
    </UserContext.Provider>
  );
};
