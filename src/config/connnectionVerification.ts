export const connectionVerification = (type: string, value: string) : [boolean,string] => {
  if (type === "First name") {
    if(value === ""){
        return [false, "*is empty"]
    } else {
        let t = /^[a-zA-Z]{2,30}$/.test(value)
        return [t,t ? "": "*do not contains special character"];
    }
  }
  if (type === "Last name") {
    if(value === ""){
        return [false, "*is empty"]
    } else {
        let t = /^[a-zA-Z]{2,30}$/.test(value)
        return [t,t ? "": "*do not contains special character"];
    }
  }
  if (type === "Email") {
    let t = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
    return [t, t ? "" : "*your email is not valid."];
  }
  if (type === "Password") {
    if(value.length < 5){
        return [false, "*your password is too short."]
    } else if (value.length > 20){
        return [false, "*your password is too long."]
    } else if (value.toUpperCase() === value ){
        return [false , "*must contains small letters"]
    } else if (value.toLowerCase() === value ){
        return [false , "*must contains capital letters"]
    } else {
        let t = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
        return [t,t ? "": "*retry other password"];
    }
  }
 
  return [false ,"*some things is wrong..."];
};
