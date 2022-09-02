import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";

import { authorizationState } from "@recoil/Atom";

const HomePage = () => {
  const auth = useRecoilValue(authorizationState);

  const { data, isLoading, isError, error } = useQuery<any, any>(["comments"], async () => {
    const { data } = await axios.get("http://localhost:3000/comments", {
      headers: { Authorization: `Bearer ${auth.access_token}` },
    });

    return data;
  });

  if (isLoading) return <p>loading ...</p>;
  if (isError) return <p>{error}</p>;

  return (
    <div>
      {data.map((item: any) => (
        <p>{item.body}</p>
      ))}
    </div>
  );
};

export default HomePage;