import React, { useState } from "react";
import { usePostLoginMutation } from "../redux/modules/LoginAPI";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { isLoading }] = usePostLoginMutation();

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoading) {
      console.log(username, password);
      const res = await login({
        username: username,
        password: password,
      });
      console.log(res);
    }
  };

  return (
    <form onSubmit={onLoginSubmit}>
      Username <input onChange={changeUsername} value={username} />
      <br />
      Password <input onChange={changePassword} value={password} />
      <br />
      <button>버튼</button>
    </form>
  );
}
