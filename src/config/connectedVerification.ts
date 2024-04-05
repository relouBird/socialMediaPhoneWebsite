let isAuthenticated: boolean = false;
import { ROUTES } from "./route";

export const logValid = (verify : boolean = false) => {
  let boolWindow : boolean = typeof window !== "undefined"
  if(!verify){
    if (boolWindow) {
      window.localStorage.setItem(
        "token",
        Math.round(Math.random() * 1000).toString()
      );
    }
  }else{
    if(boolWindow){
      window.localStorage.setItem("token","1")
    }
  }
};

export const connectedVerification = () => {
  if (typeof window !== "undefined") {
    let w = window.localStorage;
    if (
      w.getItem("token") === null &&
      window.location.pathname !== ROUTES.login &&
      window.location.pathname !== ROUTES.register
    ) {
      window.location.assign(ROUTES.login);
    } else if (
      w.getItem("token") === "1"
    ) {
      window.location.assign(ROUTES.verification)
    }
  }
};
