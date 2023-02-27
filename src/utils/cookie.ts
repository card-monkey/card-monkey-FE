import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
const { VITE_URL } = import.meta.env;

const cookies = new Cookies();

export const setCookie = (token: string) => {
  return cookies.set("token", token, {
    path: "/",
    maxAge: 3600,
  });
};

export const getCookie = () => {
  const token = cookies.get("token");
  return token;
};

export const removeCookie = () => {
  return cookies.set("token", "", {
    path: "/",
    maxAge: -1,
  });
};

// export const authCheck = (pathname: string, navigate: any) => {
//   const token = getCookie();
//   axios
//     .get(VITE_URL + `/info/apply`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((result) => {
//       if (pathname === "/login" || pathname === "/signup") {
//         navigate(`/`);
//       }
//     })
//     .catch((error) => {
//       removeCookie();
//       if (pathname === `/signup`) {
//         return;
//       }
//       navigate(`/login`);
//     });
// };
