import React from "react";
import Head from "../Helper/Head";
import useFetch from "../../Hooks/useFetch";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";
import { STATS_GET } from "../../api";
const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();
      const { response } = await request(url, options);
      console.log(response);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head
          title="Estatísticas"
          description="Home do site dogs, com o feed de fotos."
        />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  else return null;
};

export default UserStats;
