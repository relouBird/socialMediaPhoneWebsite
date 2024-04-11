import { type User } from "@firebase/auth";

export interface userDataProps {
  username: string;
  work: string;
  bio: string;
  Email: string;
  Password: string;
  id: string;
  faceUrl: string;
  coverUrl: string;
  SignupUpdate: string;
}

export type user = User;

export interface userDataForPostProps{
  username: string;
  faceUrl: string;
}
