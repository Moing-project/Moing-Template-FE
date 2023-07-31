import React, { useState, useEffect } from "react";
import {
  useGetCheckNicknameQuery,
  useGetCheckUsernameQuery,
  useSignInMutation,
} from "../redux/modules/LoginAPI";

export default function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [checkNickname, setCheckNickname] = useState<boolean>(true);
  const [checkUsername, setCheckUsername] = useState<boolean>(true);

  const { data: NicknameData } = useGetCheckNicknameQuery(
    { nickname: nickname },
    {
      skip: checkNickname,
    }
  );
  const { data: UsernameData } = useGetCheckUsernameQuery(
    { username: username },
    {
      skip: checkUsername,
    }
  );
  const [signIn, { isLoading }] = useSignInMutation();

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setCheckUsername(true);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const changeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    setCheckNickname(true);
  };

  const onLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoading) {
      const res = await signIn({
        username: username,
        password: password,
        nickname: nickname,
      });
      console.log(res);
    }
  };

  const usernameOutFocus = async () => {
    setCheckUsername(false);
  };

  const nicknameOutFocus = async () => {
    setCheckNickname(false);
  };

  useEffect(() => {
    console.log(NicknameData?.msg);
    console.log(UsernameData?.msg);
  }, [NicknameData, UsernameData]);

  return (
    <>
      <form onSubmit={onLoginSubmit}>
        Username{" "}
        <input
          onChange={changeUsername}
          onBlur={usernameOutFocus}
          value={username}
          autoFocus
        />
        <br />
        Password <input onChange={changePassword} value={password} />
        <br />
        Nickname
        <input
          onChange={changeNickname}
          onBlur={nicknameOutFocus}
          value={nickname}
        />
        <br />
        <button>버튼</button>
      </form>
    </>
  );
}
