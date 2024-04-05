import { ROUTES } from "./route";

let link: string;

export const loader = (links: string) => {
  link = links;
};

export const linkLoader = () => {
  if (typeof window !== "undefined") {
    let t = setInterval(() => {
      window.location.assign(link);
      clearInterval(t);
    }, 1500);
  }
};
