import Admin from "./Page/admin";
import CreatePesanan from "./Page/admin/pesanan/createPesanan";
import Pesanan from "./Page/admin/pesanan/pesanan";
import PesananMember from "./Page/admin/pesanan/pesananMember";
import Userkel from "./Page/admin/rekapPesanan/rekapPesanan";
import UserAdmin from "./Page/admin/userAdmin/userAdmin";
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
    path: "/admin/pesanan1",
    element: <PesananMember />
  },
  {
    path: "/admin/createPesanan",
    element: <CreatePesanan />
  },
  {
    path: "/admin/rekapPesanan",
    element: <Userkel />
  },
  {
    path: "/admin/userAdmin",
    element: <UserAdmin />
  }
];
