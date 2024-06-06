import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import {useState} from "react"
import ReactWhatsapp from 'react-whatsapp';
import { useEffect } from 'react';
import './Modals.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import axiosJwt from '../../api/interceptors';
const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: '87vh',
  bgcolor: '#fff',
  boxShadow: 24,
  p: 2,
  borderRadius: '8px',
  overflowY: "auto"
};

const ModalEdit = ({open,handleClose,data})=> {
    const [value,setValue] = useState({
        name: "",
        noWa: "",
        tanggalBooking: "",
        tanggalLahir: "",
        kdTempat: [],
        sesiBooking: ""

    });
    const navigate = useNavigate()
    const [selectedBgIndex,setSelectedBgIndex] = useState('')
    useEffect(()=> {
      if(data && data.kdTempat) {
        setValue({...value,kdTempat: [selectedBgIndex]})
      }
    },[selectedBgIndex])
    useEffect(()=> {
      setValue({
        name: data.name,
        noWa: data.noWa,
        tanggalBooking: data.tanggalBooking,
        tanggalLahir: data.tanggalLahir,
        kdTempat: data.kdTempat,
        sesiBooking: data.sesiBooking
      })
      if(data && data.kdTempat) setSelectedBgIndex(data.kdTempat)
    },[data])
    const onHandleOnSubmit = (e)=> {
        e.preventDefault()
        handleClose(true)
        const confirmResultPromise = Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update!"
          });
          confirmResultPromise.then((result) => {
            if(result.isConfirmed) {
                const formData = {...value,kdTempat: value.kdTempat[0]};
                axiosJwt
                  .put(`/tiket/${data._id}`,formData)
                  .then((res) => {
                      if (res.status === 200) {
                        window.location.reload();
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
            }else{
                handleClose(true)
                return false
            }
          })
          return false
    }
    const onHandleOnKdtempat = (x)=> {
        setValue({...value,kdTempat: [selectedBgIndex]})
        if (selectedBgIndex.includes(x)) {
            setSelectedBgIndex(selectedBgIndex.filter(i => i !== x));
          } else {
            setSelectedBgIndex([...selectedBgIndex, x]);
        }
    }
    const dataTempat = [
        {kdTempat: ['kd1','kd2','kd3','kd4','kd5']},
        {kdTempat: ['kd6','kd7','kd8','kd9','kd10']},
        {kdTempat: ['kd11','kd12','kd13','kd14','kd15']},
        {kdTempat: ['kd16','kd17','kd318','kd19','kd20']},
        {kdTempat: ['kd21','kd22','kd23','kd24','kd25']},
        {kdTempat: ['kd26','kd27','kd28','kd29','kd230']},
        {kdTempat: ['kd31','kd32','kd33','kd34','kd35']},
        {kdTempat: ['kd36','kd37','kd38','kd39','kd40']},
    ]
    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <CloseOutlinedIcon sx={{position: "absolute",top: '0',right: "0px",fontSize: "30px"}} onClick={handleClose}/>
                <h1>Isi data</h1>
                <form onSubmit={onHandleOnSubmit}  >
                    <FormControl sx={{width: "100%"}} >
                        <TextField
                            id="nama"
                            label="nama"
                            type="text"
                            value={value.name}
                            onChange={(e)=>setValue({...value,name: e.target.value})}
                        />
                        <TextField
                            id="noWa"
                            label="No hp"
                            type="number"
                            sx={{marginTop: "10px"}}
                            value={value.noWa}
                            onChange={(e)=>setValue({...value,noWa: e.target.value})}
                        />
                        <TextField
                            id="tanggalLahir"
                            label="Tanggal lahir"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                              }}
                            sx={{marginTop: "10px"}}
                            value={value.tanggalLahir}
                            onChange={(e)=>setValue({...value,tanggalLahir: e.target.value})}
                        />
 
                    </FormControl>
                    <table style={{margin: "20px 0"}}>
                        {/* 8 baris 5 kolom */}
                        <tbody>
                            {dataTempat && dataTempat.map((item,index)=> (
                                <tr key={index}>
                                    {item && item.kdTempat.map((kd,indexx)=>(
                                        <td key={kd}>
                                            <div className="kdButton" style={{cursor: "pointer",backgroundColor: selectedBgIndex.includes(kd) ? "red" : "#ff5e00b0", padding: "4px"}} onClick={()=>onHandleOnKdtempat(kd)}>{kd}</div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody> 
                    </table>
                    <FormControl sx={{width: "100%"}} >
                        <TextField
                            id="date"
                            type="date"
                            label="Tanggal booking"
                            value={value.tanggalBooking}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            onChange={(e)=>setValue({...value,tanggalBooking: e.target.value})}
                        />
                    </FormControl>
                    <label htmlFor="jadwal">Pilih jawal sesi</label>
                    <select name="jadwal" value={value.sesiBooking} style={{width: "100%", marginBottom: "20px",padding: "10px"}} onChange={(e)=>setValue({...value,sesiBooking: e.target.value})}>
                        <option value="10:00:00">jam 10.00</option>
                        <option value="01:00:00">jam 01.00</option> 
                        <option value="16:00:00">jam 16.00</option> 
                    </select>
                    
                    <button className="submitButton" type="submit">submit</button>
                </form>
            </Box>
        </Modal>
        </div>
    );
}
export default ModalEdit