import {type User } from "@firebase/auth";

export interface userDataProps {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    uid: string;
    ProfilePicture: string;
    Description: string;
    SignupUpdate: string;
  }


  export type user = User