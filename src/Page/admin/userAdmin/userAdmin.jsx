import Appshell from "../../../components/Appshell/appshell";
import TableCell from '@mui/material/TableCell';
import "./userAdmin.css"
import { useEffect,useState  } from "react";
import axiosJwt from "../../../api/interceptors";
import format from 'date-fns/format';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ModalEdit from "../../../components/Modals/ModalEdit";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
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
  
const UserAdmin = () => {
    const [data,setDatas] = useState([])
    // const [data,setDatas] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedData, setSelectedData] = useState(null); 
    const reqDataApi = async()=> {
        try{
            const req = await axiosJwt.get('/admin');
            setDatas(req.data || [])
        }catch(err){
            console.log(err)
            setDatas([])
        }
    }
    useEffect(()=> {
        reqDataApi()
    },[])
    const handleUpdateIsverified = async(id,item)=> {
        // e.preventDefault();
        if(window.confirm('Validasi?')){
            const dateNow = new Date();
            const waktuPesan = format(dateNow,'yyyy-MM-dd')
            const newDate = {...item,isVerified: true,waktuPesan: waktuPesan}
            try{
                const req = await axiosJwt.put(`/tiket/${id}`,newDate)
            }catch(err){
                console.log(err)
            }
        }
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
          name: "email",
          label: "email",
          options: {
            filterOptions: { fullWidth: true }
          }
        },
        {
          name: "password",
          label: "password",
          options: {
            filterOptions: { fullWidth: true }
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
                    </div>
                )
            }
          }
        }
      ];
      const formattedDate = (inputDate)=>{
        return format(new Date(inputDate), 'dd,MMMM yyyy', { awareOfUnicodeTokens: true });
      }
      const handleDataDelete = async(rowsDeleted,newTableData) => {
        const confirm = window.confirm('Are you sure you want to delete?')
        if(confirm){
          // console.log(rowsDeleted)
          const getData = rowsDeleted.data.map(row=>data[row.dataIndex])
          console.log(getData)
          try{
            const res = await axiosJwt.delete('/admin',{
              data: getData
            });
            if(res.status==200){
              window.location.reload()
            }
          }catch(err){
            console.log(err)
          }
        }
    
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
        onRowsDelete: handleDataDelete,
        print: false,
        download: false
      };
    return (
    <Appshell data={data.length}>
        <div className="pesanan-container__header">
            <h3 className="head-title">Admin</h3>
        </div>
        <div className="table-container__pesanan">
            <CacheProvider value={muiCache}>
                <ThemeProvider theme={customTheme}>
                <MUIDataTable
                    title={"Admin manage"}
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
export default UserAdmin;
