import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = ({ user, page, setInfinite, setModalPhoto }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6;
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url, options);
      console.log("request:", json);
      if (response && response.ok && json.length < 3) {
        setInfinite(false);
      }
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);
  // obs: se o json.legth for < 3 significa que não tem mais foto pra puxar, pq só mostra 3 fotos por pagina, logo, chegou na última pagina
  console.log(data);
  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data && data.length === 0)
    return <p className="noPhotos">Você ainda não possui nenhuma foto.</p>;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhotos;
