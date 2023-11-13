import Admin from "./Page/admin";
import Pesanan from "./Page/admin/pesanan/pesanan";
import Userkel from "./Page/admin/user/user";
import Login from "./Page/login/login";
import User from "./Page/user";

export const route = [
  {
    path: "/",
    element: <User />,
  },
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/admin/home",
    element: <Admin />,
  },
  {
    path: "/admin/pesanan",
    element: <Pesanan />
  },
  {
    path: "/admin/user",
    element: <Userkel />
  }
];
