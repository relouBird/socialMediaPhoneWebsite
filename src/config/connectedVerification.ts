let isAuthenticated: boolean = false;
import { ROUTES } from "./route";


export const logValid = (verify: boolean = false) => {
  let boolWindow: boolean = typeof window !== "undefined";
  if (!verify) {
    if (boolWindow) {
      window.localStorage.setItem(
        "token",
        Math.round(Math.random() * 1000).toString()
      );
    }
  } else {
    if (boolWindow) {
      window.localStorage.setItem("token", "1");
    }
  }
};


export const connectedVerification = () => {
  if (typeof window !== "undefined") {
    let pathname = window.location.pathname;
    let w = window.localStorage;
    if (
      w.getItem("token") === null &&
      window.location.pathname !== ROUTES.login &&
      window.location.pathname !== ROUTES.register
    ) {
      window.location.assign(ROUTES.login);
    } else if (w.getItem("token") === "1") {
      window.location.assign(ROUTES.verification);
    } else if (
      w.getItem("token") !== null &&
      (window.location.pathname === ROUTES.register ||
        window.location.pathname === ROUTES.verification || window.location.pathname === ROUTES.passwordReset || window.location.pathname === ROUTES.login)
    ) {
      window.location.assign(ROUTES.home)
    }
  }
};

export const deconnexion = () =>{
  if (typeof window !== "undefined") {
    window.localStorage.clear();
    window.location.assign(ROUTES.login);
  }
}


export const isConnected = () => {
  if (typeof window !== "undefined") {
    if(window.localStorage.getItem('token') !== null){
      return true;
    }
    return false;
  }
}


export const useNavBar = () =>{
  if(typeof window !== "undefined"){
    if(window.location.pathname.includes('/Auth')){
      return false;
    }
    return true
  }
}