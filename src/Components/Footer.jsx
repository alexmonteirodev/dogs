import React from "react";
import styles from "./Footer.module.css";
import Logo from "../Assets/dogs-footer.svg?react";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
