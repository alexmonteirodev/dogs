// esse componente serve para dar acesso global do usuário na Aplicação
import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        setError(null);
        setLoading(true);
        const { url, options } = TOKEN_VALIDATE_POST(token);
        fetch(url, options)
          .then((r) => {
            if (!r.ok) {
              throw new Error("Token inválido");
            } else {
              getUser(token);
            }
          })
          .catch((err) => {
            userLogout();
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, []);

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

    setError(null);
    setLoading(true);
    fetch(url, options)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Erro: Usuário inálido.`);
        } else {
          return r.json();
        }
      })
      .then(({ token }) => {
        window.localStorage.setItem("token", token);
        getUser(token);
        navigate("/conta");
      })
      .catch((err) => {
        setError(err.message);
        setLogin(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function userLogout(params) {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem("token");
  }

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
