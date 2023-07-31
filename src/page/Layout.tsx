import React from "react";
import { useGetCheckUsernameQuery } from "../redux/modules/LoginAPI";

export default function Layout() {
  const { data: UsernameData } = useGetCheckUsernameQuery(
    { username: "text" },
    {
      skip: true,
    }
  );
  return (
    <>
      <button>{UsernameData?.data}</button>
    </>
  );
}
