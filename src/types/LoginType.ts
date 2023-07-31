export type Auth = UsernameDataType & {
  password: string;
};

export type SingInData = Auth & NicknameDataType;

export type NicknameDataType = {
  nickname: string;
};

export type UsernameDataType = {
  username: string;
};

export type RequestData<T> = {
  postId?: number;
  commentId?: number;
  payload?: T;
};

export type LoginData = {
  nickname: string;
  userImage: string;
  introduce: string | null;
};

export type CheckUserData = {
  username?: string;
  nickname?: string;
};

export type SignInErrorData = {
  email?: string;
  nickname?: string;
  password?: string;
};
