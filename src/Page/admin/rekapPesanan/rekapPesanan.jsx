import React, { useEffect, useState } from "react";
import Appshell from "../../../components/Appshell/appshell";
import "./rekapPesanan.css"
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import ReactDOM from "react-dom";
import axiosJwt from "../../../api/interceptors";
import format from 'date-fns/format';
import Swal from 'sweetalert2'
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});
const customTheme = createTheme({
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    'none',
  ], 
});
const RekapPesanan = () => {

  const [data,setDatas] = useState([]);
  const [tiketPending,setTiketPending] = useState([]);
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
          return value ? "Lunas" : "Belum";
        }
      }
    }
  ];
  const formattedDate = (inputDate)=>{
    return format(new Date(inputDate), 'dd,MMMM yyyy', { awareOfUnicodeTokens: true });
  }
  useEffect(()=> {
    const getDataApi = async() => {
      try{
        const req = await axiosJwt.get('/tiket');
        const formattedData = req.data.map((item) => ({
          ...item,
          waktuPesan: item.waktuPesan ? formattedDate(item.waktuPesan) : '',
        }));
        setDatas(formattedData || [])
        const pending = req.data.filter(item=>item.isVerified==false);
        setTiketPending(pending.length)
      }catch(err){
        console.log(err)
        setDatas([])
      }
    }
    getDataApi()
  },[])
  const handleDataDelete = (rowsDeleted,newTableData) => {
    const confirmResultPromise = Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!"
    });
    confirmResultPromise.then((result) => {
      if (result.isConfirmed) {
          const getData = rowsDeleted.data.map((row) => data[row.dataIndex]);
          axiosJwt
            .delete('/tiket', {
              data: getData
            })
            .then((res) => {
              if (res.status === 200) {
                window.location.reload();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }else {
          // rowsDeleted.lookup[0] = false;
          return false;
      }
    });
    return false;
  }
  const options = {
    downloadOptions: {
      filename: "coba.csv",
      separator: ";",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true
      }
    },

    filterType: "dropdown",
    // onTableChange: (action, state) => {
    //   console.dir(state);
    // }
    onRowsDelete: handleDataDelete,
  };
  return (
  <Appshell data={tiketPending}>
      <div className="user-container__header">
        <h3 className="head-title">Dashboard</h3>
      </div>
      <div className="table-container__pesanan">
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={customTheme}>
          <MUIDataTable
            title={"Rekap tiket"}
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
export default RekapPesanan;