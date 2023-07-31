import React from "react";
import { useGetCheckUsernameQuery } from "../redux/modules/LoginAPI";

export default function main() {
  const { data: UsernameData } = useGetCheckUsernameQuery(
    { username: "text" },
    {
      skip: true,
    }
  );
  return <div>{UsernameData?.data}</div>;
}
