import React, { useEffect, useState } from "react";
// import Appshell from "../../../components/Appshell/appshell";
// import "./rekapPesanan.css"
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import format from 'date-fns/format';
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
const Table = ({data}) => {
  const [datas,setDatas] = useState([]);
  const [tiketPending,setTiketPending] = useState([]);
  const columns = [
    {
      name: "name",
      label: "No",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "noWa",
      label: "No whatsapp",
    },
    {
      name: "kdTempat",
      label: "Kode tempat",
      options: {
        customBodyRender: (value) => {
          return value.map((item)=>item+' ')
        }
      }
    },
    {
      name: "sesiBooking",
      label: "Sesi booking",
    }
  ];
  const formattedDate = (inputDate)=>{
    return format(new Date(inputDate), 'dd,MMMM yyyy', { awareOfUnicodeTokens: true });
  }
//   useEffect(()=> {
//     // const getDataApi = async() => {
//     //   try{
//     //     const req = await data;
//     //     const formattedData = req.map((item) => ({
//     //       ...item,
//     //       waktuPesan: item.waktuPesan ? formattedDate(item.waktuPesan) : '',
//     //     }));
//     //     setDatas(formattedData || [])
//     //   }catch(err){
//     //     console.log(err)
//     //     setDatas([])
//     //   }
//     // }
//     // getDataApi()
//   },[])
  const options = {
    // downloadOptions: 'none',
    search: false,
    download: false,
    filter: false,
    viewColumns: false,
    print: false,
    selectableRowsHideCheckboxes: false,
    selectableRowsHeader: '',
    selectableRows: 'none',
  }
  return (
  <>
  {console.log(data)}
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={customTheme}>
          <MUIDataTable
            title=""
            data={data && data.map((item) => ({
                ...item,
                waktuPesan: item.waktuPesan ? formattedDate(item.waktuPesan) : '',
              })) || []}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
  </>
  )
};
export default Table;