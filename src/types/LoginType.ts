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

export enum ImageEnum {
  defalutImage = "dafault",
}

export type KanbanType = {
  name: string;
  content: string;
  KanbanT: KanbanEnum;
};

export enum KanbanEnum {
  noStart = "no Start",
  inProcess = "in Process",
  done = "done",
}

const Test: KanbanType = {
  name: "Hello",
  content: "World",
  KanbanT: KanbanEnum.noStart,
};
