import type { loginHardDataProps, navbarDataProps } from "$lib/types/hardDataType";
import { ROUTES } from "../../config/route";



export const loginHardData: loginHardDataProps[] = [
  {
    name: "Email",
    placeholder: "reloubird@gmail.com",
    isPassword: false,
  },
  {
    name: "Password",
    placeholder: "",
    isPassword: true,
  },
];



export const resetPasswordEmailHardData: loginHardDataProps[] = [
  {
    name: "Email",
    placeholder: "reloubird@gmail.com",
    isPassword: false,
  },
]

export const registerHardData: loginHardDataProps[] = [
  {
    name: "First name",
    placeholder: "murel",
    isPassword: false,
  },
  {
    name: "Last name",
    placeholder: "ulrich",
    isPassword: false,
  },
  {
    name: "Email",
    placeholder: "reloubird@gmail.com",
    isPassword: false,
  },
  {
    name: "Password",
    placeholder: "",
    isPassword: true,
  },
  {
    name: "Confirm password",
    placeholder: "",
    isPassword: true,
  },
];

let w : string = "";
if(typeof window !== "undefined"){
 w = window.location.pathname;
}

export const navbarData : navbarDataProps[] = [
  {
    name: "Home",
    link: ROUTES.home,
  },
  {
    name: "Users",
    link: ROUTES.friends,
  },
  {
    name: "Videos",
    link: ROUTES.videos,
  },
  {
    name: "Create",
    link: ROUTES.post_creation,
  },
  {
    name: "Profile",
    link: ROUTES.profile,
  },
]