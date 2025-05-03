import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";
import MinhasFotos from "../../Assets/feed.svg?react";
import Estatisticas from "../../Assets/estatisticas.svg?react";
import AdicionarFoto from "../../Assets/adicionar.svg?react";
import Sair from "../../Assets/sair.svg?react";
import styles from "./UserHeaderNav.module.css";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);

  return (
    <nav className={styles.nav}>
      <NavLink to="/conta">
        <MinhasFotos /> Minhas Fotos
      </NavLink>
      <NavLink to="/conta/estatisticas">
        <Estatisticas /> Estatisticas
      </NavLink>
      <NavLink to="/conta/postar">
        <AdicionarFoto /> Adicionar Foto
      </NavLink>
      <button onClick={userLogout}>
        <Sair />
      </button>
    </nav>
  );
};

export default UserHeaderNav;
