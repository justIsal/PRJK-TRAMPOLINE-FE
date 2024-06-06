import Appshell from "../../../components/Appshell/appshell";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./pesanan.css"
import { useEffect } from "react";
import axiosJwt from "../../../api/interceptors";
import { useState } from "react";
import format from 'date-fns/format';
import idLocale from 'date-fns/locale/id';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ModalEdit from "../../../components/Modals/ModalEdit";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
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

const Pesanan = () => {
    const [data,setDatas] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedData, setSelectedData] = useState(null); 
    const reqDataApi = async()=> {
        try{
            const req = await axiosJwt.get('/tiket');
            const data = req.data.filter((item)=>item.isVerified!==true && item.tipePengguna == 'Reguler')
            setDatas(data || [])
        }catch(err){
            console.log(err)
            setDatas([])
        }
    }
    useEffect(()=> {
        reqDataApi()
    },[])
    const handleUpdateIsverified = (id,item)=> {
        const confirmResult = Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, verifikasi!"
        });
        confirmResult.then(result => {
          if(result.isConfirmed){
              const dateNow = new Date();
              const waktuPesan = format(dateNow,'yyyy-MM-dd')
              const newDate = {...item,isVerified: true,waktuPesan: waktuPesan}
              axiosJwt
                .put(`/tiket/${id}`,newDate)
                .then((res) => {
                  if (res.status === 200) {
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
          }else{
            return false
          }
        })
        return false
    }
    function parseISODateTime(dateTimeString) {
        const dateObject = new Date(dateTimeString);
        const tanggal = dateObject.toISOString().split('T')[0];
        const waktu = dateObject.toLocaleTimeString();
        return { tanggal, waktu };
    }
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
          name: "tanggalLahir",
          label: "Tanggal Lahir",
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
          name: "tanggalBooking",
          label: "tanggal Booking",
          options: {
            filterOptions: { fullWidth: true }
          }
        },
        {
          name: "sesiBooking",
          label: "Sesi Booking",
          options: {
            filterOptions: { fullWidth: true },
          }
        },
        {
          name: "isVerified",
          label: "Validasi",
          options: {
            filterOptions: { fullWidth: true },
            customHeadRender: (columnMeta)=> (
                <TableCell key={columnMeta.name} style={{ textAlign: 'center' }}>
                {columnMeta.label}
              </TableCell>
            ),
            customBodyRender: (value, tableMeta, updateValue) => {
            //   return value ? "Lunas" : "Belum";
                return(
                    <div style={{display: "flex",gap: "10px",justifyContent: "center"}}>
                        <button 
                        className="btn-update"
                        onClick={()=>{
                            setSelectedData(data[tableMeta.rowIndex]);
                            handleOpen()
                        }}
                        ><EditNoteOutlinedIcon />Update</button>
                        <ModalEdit 
                            open={open}
                            handleClose={handleClose}
                            data={selectedData || []}
                        />
                        <button 
                            className="btn-validasi"
                            onClick={()=>{   
                                // console.log(value)
                                handleUpdateIsverified(data[tableMeta.rowIndex]._id,{...data[tableMeta.rowIndex],isVerified: true});
                                reqDataApi();
                            }}
                        > <DoneOutlinedIcon />validasi</button>
                    </div>
                )
            }
          }
        }
      ];
      const formattedDate = (inputDate)=>{
        return format(new Date(inputDate), 'dd,MMMM yyyy', { awareOfUnicodeTokens: true });
      }
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
              rowsDeleted.lookup[0] = false;
              return false;
            }
        });
      
        return false;
      }
      const options = {
        downloadOptions: {
          filename: "coba.csv",
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

        print: false,
        download: false,
        
      };
    return (
    <Appshell data={data.length}>
        <div className="pesanan-container__header">
            <h3 className="head-title">Tiket Pesanan</h3>
        </div>
        <div className="table-container__pesanan">
            <CacheProvider value={muiCache}>
                <ThemeProvider theme={customTheme}>
                <MUIDataTable
                    title={"Tiket reguler validate"}
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
export default Pesanan;
