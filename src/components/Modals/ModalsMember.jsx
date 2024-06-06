import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import {useState} from "react"
import ReactWhatsapp from 'react-whatsapp';
import { useEffect } from 'react';
import './Modals.css'

import axios from 'axios';
import { isDisabled } from '@testing-library/user-event/dist/utils';
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
  borderRadius: '5px',
  overflowY: "auto"
};

const ModalsMember = ({open,handleClose})=> {
    const [value,setValue] = useState({
        name: "",
        noWa: "",
        tanggalBooking: "",
        tanggalLahir: "",
        kdTempat: [],
        jenisKeanggotaan: '',
        tipePengguna: 'Reguler',
        kodeMember: '',
        sesiBooking:"10:00:00"

    });
    const [members, setMembers] = React.useState(false);

    const [selectedBgIndex,setSelectedBgIndex] = useState([])
    useEffect(()=> {
        setValue({...value,kdTempat: [selectedBgIndex]})
    },[selectedBgIndex])
    const onHandleOnSubmit = async(e)=> {
        e.preventDefault()
        // const nomorWhatsApp = '6285695036046';
        // const formData = {...value,kdTempat: value.kdTempat[0]};
        // console.log(formData);
        // console.log('oke')
        try{
            const nomorWhatsApp = '6283825702000';
            const kodeTempat = value.kdTempat.map((item)=> {
                return item
            })
            // const waktuBooking = value.tanggalBooking+'T'+value.waktuBooking;
            const formData = {...value,kdTempat: value.kdTempat[0]};
            console.log(formData);
            const response = await axios.post('http://localhost:5174/tiket',formData);

            if( response.status==201 ){
                const pesan = `hallo selamat siang admin saya ${value.name} dengan tanggal lahir ${value.tanggalLahir} nomer wa ${value.noWa} izin konfirmasi dengan kode pemesanan ${kodeTempat} tanggal: ${value.tanggalBooking} jam: ${value.sesiBooking} type pengguna ${value.tipePengguna} jenis anggota ${value.jenisKeanggotaan}`;
                window.open(`https://api.whatsapp.com/send?phone=${nomorWhatsApp}&text=${encodeURIComponent(pesan)}`, '_blank');
                setValue({
                    nama: "",
                    noWa: "",
                    tanggalBooking: "",
                    tanggalLahir: "",
                    kdTempat: [],
                    jenisKeanggotaan: '',
                    kodeMember: '',
                    sesiBooking:"",
                    tipePengguna: 'Reguler'
            
                })
                setSelectedBgIndex([])
                handleClose(true)
            }
        }catch(err){
            console.log(err)
        }
    }
    const onHandleOnKdtempat = (x)=> {
        setValue({...value,kdTempat: [selectedBgIndex],jenisKeanggotaan: '',tipePengguna: "Reguler",kodeMember:''})

        if (selectedBgIndex.includes(x)) {
            setSelectedBgIndex(selectedBgIndex.filter(i => i !== x));
          } else {
            setSelectedBgIndex([...selectedBgIndex, x]);
        }
    }
    // const onChangeIsMembers = ()=> {
    //     setValue({...value,kdTempat: []})
    //     setSelectedBgIndex([])
    // }
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
    const onClose = ()=> {
        setMembers(false)
        handleClose();
    }
    return (
        <div>
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <CloseOutlinedIcon sx={{position: "absolute",top: '0',right: "0px",fontSize: "30px"}} onClick={onClose}/>
                <h1>Members</h1>
                <form onSubmit={onHandleOnSubmit}  >
                    <FormControl sx={{width: "100%"}} >
                        <TextField
                            id="nama"
                            label="nama"
                            type="text"
                            value={value.name}
                            onChange={(e)=>setValue({...value,name: e.target.value})}
                            required
                        />
                        <TextField
                            id="noWa"
                            label="No hp"
                            type="number"
                            sx={{marginTop: "10px"}}
                            value={value.noWa}
                            onChange={(e)=>setValue({...value,noWa: e.target.value})}
                            required
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
                            // color="red"
                            required
                        />
 
                    </FormControl>
                    <FormControl>
                        <FormControlLabel control={<Checkbox onChange={(e)=> e.target.checked ? setMembers(true) : setMembers(false)} />} label="Is member?" />
                    </FormControl>
                    {
                        members ? (
                            <>
                            <FormControl sx={{width: "100%"}} >
                                <TextField
                                    id="kodeMember"
                                    label="kodeMember"
                                    type="text"
                                    value={value.kodeMember}
                                    onChange={(e)=>{
                                        setValue({...value,kodeMember: e.target.value,kdTempat: []});
                                        setSelectedBgIndex([]);
                                    }}
                                    required
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{margin: '10px 0'}}>
                                <InputLabel id="demo-simple-select-label">Pilih Members</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={value.jenisKeanggotaan}
                                    label="Members"
                                    onChange={(e)=>{
                                        setValue({...value,jenisKeanggotaan: e.target.value,kdTempat: []})
                                        setSelectedBgIndex([]);
                                    }}
                                    // disabled={members ? false : true}

                                >
                                    <MenuItem value='Gold'>Gold</MenuItem>
                                    <MenuItem value='Silver'>Silver</MenuItem>
                                    <MenuItem value='Platinum'>Platinum</MenuItem>
                                    <FormHelperText>Required</FormHelperText>
                                </Select>
                            </FormControl>
                            </>
                        ): (<></>)
                    }

                    {!members ? (
                        <table style={{margin: "10px 0",pointerEvents: members ? 'none' : 'auto'}} >
                        {/* 8 baris 5 kolom */}
                        <tbody>
                            {dataTempat && dataTempat.map((item,index)=> (
                                <tr key={index}>
                                    {item && item.kdTempat.map((kd,indexx)=>(
                                        <td key={kd}>
                                            <div className="kdButton" style={{cursor: "pointer",backgroundColor:members ? '#fff' : selectedBgIndex.includes(kd) ? "red" : "#ff5e00b0" , padding: "4px"}} onClick={()=> onHandleOnKdtempat(kd)}>{kd}</div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody> 
                    </table>
                    ) : (<></>)}


                    <FormControl sx={{width: "100%",margin: "10px 0"}} >
                        <TextField
                            id="date"
                            type="date"
                            label="Tanggal booking"
                            value={value.tanggalBooking}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            onChange={(e)=>setValue({...value,tanggalBooking: e.target.value})}
                            required
                        />
                    </FormControl>
                    {/* <label htmlFor="jadwal">Pilih jawal sesi</label>
                    <select name="jadwal" style={{width: "100%", marginBottom: "20px",padding: "10px"}} onChange={(e)=>setValue({...value,sesiBooking: e.target.value})}>
                        <MenuItem value="10:00:00">jam 10.00</MenuItem>
                        <MenuItem value="01:00:00">jam 01.00</MenuItem> 
                        <MenuItem value="16:00:00">jam 16.00</MenuItem> 
                    </select> */}
                    <FormControl fullWidth sx={{margin: '20px 0'}}>
                        <InputLabel id="demo-simple-select-label">Pilih jawal sesi*</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value.sesiBooking}
                            label="Members"
                            onChange={(e)=>setValue({...value,sesiBooking: e.target.value})}
                        >
                            <MenuItem value="10:00:00">jam 10.00</MenuItem>
                            <MenuItem value="01:00:00">jam 01.00</MenuItem> 
                            <MenuItem value="16:00:00">jam 16.00</MenuItem> 
                            <FormHelperText>Required</FormHelperText>
                        </Select>
                    </FormControl>
                    <button className="submitButton" type="submit" style={{marginBottom: "20px"}}>submit</button>
                </form>
            </Box>
        </Modal>
        </div>
    );
}
export default ModalsMember