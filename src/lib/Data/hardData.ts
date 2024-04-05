interface loginHardDataProps {
  name: string;
  placeholder: string;
  isPassword: boolean;
}

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

export const resetPasswordHardData: loginHardDataProps[] = [
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
]

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
