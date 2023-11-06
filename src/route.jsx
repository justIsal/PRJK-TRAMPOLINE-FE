import Admin from "./Page/admin";
import User from "./Page/user";

export const route = [
  {
    path: "/",
    element: <User />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
];
