import React, { useEffect, useState } from "react";
import Appshell from "../../../components/Appshell/appshell";
import "./user.css"
import MUIDataTable from "mui-datatables";
import ReactDOM from "react-dom";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import axiosJwt from "../../../api/interceptors";
import { createTheme, ThemeProvider} from '@mui/material/styles';
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});
const customTheme = createTheme({
  shadows: ["none"], // Mengganti box-shadow menjadi none
});
const Userkel = () => {

  const [data,setDatas] = useState([]);

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filterOptions: { fullWidth: true }
      }
    },
    {
      name: "noWa",
      label: "No whatsapp",
      options: {
        filterOptions: { fullWidth: true }
      }
    },
    {
      name: "waktuPesan",
      label: "Waktu pesan",
      options: {
        filterOptions: { fullWidth: true }
      }
    },
    {
      name: "kdTempat",
      label: "Kode tempat",
      options: {
        filterOptions: { fullWidth: true },
        customBodyRender: (value) => {
          return value.map((item)=>item+' ')
        }
      }
    },
    {
      name: "isVerified",
      label: "Status ",
      options: {
        filterOptions: { fullWidth: true },
        customBodyRender: (value, tableMeta, updateValue) => {
          return <button>{value ? "Lunas" : "Belum"}</button>;
        }
      }
    }
  ];
  useEffect(()=> {
    const getDataApi = async() => {
      try{
        const req = await axiosJwt.get('/tiket');
        console.log(req.data)
        setDatas(req.data || [])
      }catch(err){
        console.log(err)
        setDatas([])
      }
    }
    getDataApi()
  },[])
  const options = {
    downloadOptions: {
      filename: "coba.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true
      }
    },

    filterType: "dropdown",
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    }
  };
  const ge = []
  return (
  <Appshell>
      <div className="user-container__header">
            user
      </div>
      <div className="table-container__pesanan">
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={customTheme}>
          <MUIDataTable
            title={"dfdfdf"}
            data={data}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
      </div>
  </Appshell>
  )
};
export default Userkel;