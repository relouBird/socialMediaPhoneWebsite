let isAuthenticated: boolean = false;

export const logValid = () =>{
    if (typeof window !== "undefined") {
        window.localStorage.setItem('token',Math.round(Math.random()*1000).toString())
    }
    
}

export const connectedVerification = () => {
  if (typeof window !== "undefined") {
    let w = window.localStorage
    if (
      w.getItem('token') === null &&
      window.location.pathname !== "/Auth/Login" &&
      window.location.pathname !== "/Auth/Register"
    ) {
      window.location.assign("/Auth/Login");
    }
  }
};
