import { redirect } from "react-router";
import { getCookie } from "./cookie";

export const loader = () => {
  const token = getCookie();

  if (!token) {
    return redirect("/login");
  }

  return null;
};

export const outLoader = () => {
  const token = getCookie();

  if (token) {
    return redirect("/");
  }

  return null;
};
