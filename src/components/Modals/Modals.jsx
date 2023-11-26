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

import axios from 'axios';
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

const Modals = ({open,handleClose})=> {
    const [value,setValue] = useState({
        name: "",
        noWa: "",
        tanggalBooking: "",
        tanggalLahir: "",
        kdTempat: [],
        sesiBooking:"10:00:00"

    });
    const [selectedBgIndex,setSelectedBgIndex] = useState([])
    useEffect(()=> {
        setValue({...value,kdTempat: [selectedBgIndex]})
    },[selectedBgIndex])
    const onHandleOnSubmit = async(e)=> {
        e.preventDefault()
        // const nomorWhatsApp = '6285695036046';
        try{
            const nomorWhatsApp = '6283825702000';
            const kodeTempat = value.kdTempat.map((item)=> {
                return item
            })
            // const waktuBooking = value.tanggalBooking+'T'+value.waktuBooking;
            const formData = {...value,kdTempat: value.kdTempat[0]};
            const response = await axios.post('https://prjkcekapi-production.up.railway.app/api/v1/tiket',formData);

            if( response.status==201 ){
                const pesan = `hallo selamat siang admin saya ${value.nama} dengan tanggal lahir ${value.tanggalLahir} nomer wa ${value.noWa} izin konfirmasi dengan kode pemesanan ${kodeTempat} tanggal: ${value.tanggalBooking} jam: ${value.sesiBooking}`;
                window.open(`https://api.whatsapp.com/send?phone=${nomorWhatsApp}&text=${encodeURIComponent(pesan)}`, '_blank');
                setValue({
                    nama: "",
                    noWa: "",
                    tanggalBooking: "",
                    tanggalLahir: "",
                    kdTempat: [],
                    waktuBooking:''
            
                })
                setSelectedBgIndex([])
                handleClose(true)
            }
        }catch(err){
            console.log(err)
        }
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
                    <select name="jadwal" style={{width: "100%", marginBottom: "20px",padding: "10px"}} onChange={(e)=>setValue({...value,sesiBooking: e.target.value})}>
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
export default Modals