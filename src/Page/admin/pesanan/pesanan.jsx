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
function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
}
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24,4,3,3),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
const Pesanan = () => {
    const [data,setDatas] = useState('')
    const reqDataApi = async()=> {
        try{
            const req = await axiosJwt.get('/tiket');
            const data = req.data.filter((item)=>item.isVerified!==true)
            setDatas(data)
            console.log(req)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=> {
        reqDataApi()
    },[])
    const handleUpdateIsverified = async(id,item)=> {
        // e.preventDefault();
        if(window.confirm('Validasi?')){
            const dateNow = new Date();
            const waktuPesan = format(dateNow,'yyyy-dd-MM')
            const newDate = {...item,isVerified: true,waktuPesan: waktuPesan}
            try{
                const req = await axiosJwt.put(`/tiket/${id}`,newDate)
                console.log(req)
                console.log(newDate)
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
    return (
    <Appshell>
        <div className="pesanan-container__header">
            pesanan
        </div>
        <div className="table-container__pesanan">
            <TableContainer component={Paper} sx={{boxShadow: 'none'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>No whatsapp</TableCell>
                            <TableCell>Tanggal lahir</TableCell>
                            <TableCell>Kode Tempat</TableCell>
                            <TableCell>tanggal booking</TableCell>
                            <TableCell>Waktu booking</TableCell>
                            <TableCell>Validasi</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length ? data.map((row,index) => (
                            <TableRow>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.noWa}</TableCell>
                                <TableCell>{row.tanggalLahir}</TableCell>
                                <TableCell>
                                    {
                                        row.kdTempat && row.kdTempat.map((item)=>{
                                            return item+' '
                                        })
                                    }
                                </TableCell>
                                <TableCell>
                                    {parseISODateTime(row.waktuBooking).tanggal}
                                </TableCell>
                                <TableCell>
                                    {parseISODateTime(row.waktuBooking).waktu}
                                </TableCell>
                                <TableCell>{!row.isVerified ? 'belum': 'sudah'}</TableCell>
                                <TableCell>
                                    <button 
                                        onClick={()=>{   
                                            handleUpdateIsverified(row._id,{...row,isVerified: true});
                                            reqDataApi();
                                        }}
                                    >validasi</button>
                                </TableCell>
                            </TableRow>
                        )):(<>tidak ada</>)
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </Appshell>
    )
};
export default Pesanan;