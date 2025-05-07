import React from "react";
import styles from "./UserStatsGraphs.module.css";

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    // console.log(data.map(({ acessos }) => acessos).reduce((a, b) => a + b));
    setTotal(data.map(({ acessos }) => acessos).reduce((a, b) => a + b, 0));
  }, [data]);

  return (
    <section className={`animeLeft ${styles.graph}`}>
      <div className={styles.total}>
        <p>Acessos: {total}</p>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
