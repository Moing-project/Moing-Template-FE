import React, { useState, useEffect } from "react";
import {
  useGetCheckNicknameQuery,
  useGetCheckUsernameQuery,
  useSignInMutation,
} from "../redux/modules/LoginAPI";
import { useNavigate } from "react-router-dom";

interface ChangeInterface {
  event: React.ChangeEvent<HTMLInputElement>;
  changeFnc: React.Dispatch<React.SetStateAction<string>>;
  changeCheckFnc?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignIn() {
  const navigate = useNavigate();
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

  const changeHandler = (payload: ChangeInterface) => {
    payload.changeFnc(payload.event.target.value);
    !!payload.changeCheckFnc && payload.changeCheckFnc(true);
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
          onChange={(e) =>
            changeHandler({
              event: e,
              changeFnc: setUsername,
              changeCheckFnc: setCheckUsername,
            })
          }
          onBlur={usernameOutFocus}
          value={username}
          autoFocus
        />
        <br />
        Password{" "}
        <input
          onChange={(e) =>
            changeHandler({
              event: e,
              changeFnc: setPassword,
            })
          }
          value={password}
        />
        <br />
        Nickname
        <input
          onChange={(e) =>
            changeHandler({
              event: e,
              changeFnc: setNickname,
              changeCheckFnc: setCheckNickname,
            })
          }
          onBlur={nicknameOutFocus}
          value={nickname}
        />
        <br />
        <button>버튼</button>
        <br />
        <button onClick={() => navigate("/")}>Home</button>
      </form>
    </>
  );
}
