import React from "react";
import UserHeaderNav from "./UserHeaderNav";
import styles from "./UserHeader.module.css";
import { useLocation } from "react-router-dom";

const UserHeader = () => {
  const [title, setTitle] = React.useState("");

  const location = useLocation();

  React.useEffect(() => {
    // if (location.pathname === "/conta") setTitle("Minha conta");
    // if (location.pathname === "/conta/estatisticas") setTitle("Estatísticas");
    // if (location.pathname === "/conta/postar") setTitle("Postar");

    switch (location.pathname) {
      case "/conta":
        setTitle("Minha conta");
        break;
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
      case "/conta/postar":
        setTitle("Postar");
        break;
      default:
        setTitle("Minha Conta");
        break;
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
