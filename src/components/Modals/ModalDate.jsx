import React,{ useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import CSVDownloadButton from "../../components/Export/CSVDownloadButton";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ModalDate({open,handleClose,data}) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const getDate = (data,startDate,endDate)=> {
    const bookingsDate = data.filter(
      item => {
        const bookingDate = new Date(item.waktuPesan);
        return (
          bookingDate >= startDate &&
          bookingDate <= endDate
        );
      }
    );
    return bookingsDate
  }
  // const isWithinTimeRange = (data, startDate, endDate) => {
  //   return data.filter(item => {
  //     const waktuPesan = new Date(item.waktuPesan);
  //     return waktuPesan >= startDate && waktuPesan <= endDate;
  //   });
  // };
  
  
  // const onExportHandler = async()=> {
  //   // const startDate = new Date("2023-11-13"); 
  //   // const endDate = new Date("2023-11-14"); 
  //   const isWithinRange = getDate(data,state[0].startDate, state[0].endDate);
  // }
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
            <p style={{marginBottom: "20px"}}>Masukan rentang waktu</p>
            <DateRange
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                rangeColors={['red', '#000', '#000', '#000']}
            />
            {/* <button onClick={onExportHandler}></button> */}
            <div className="csvDownload-container">
              <CSVDownloadButton
                data={getDate(data,state[0].startDate, state[0].endDate)}
                title={'export csv'}
                fileName={'exportcsv'}
              />
            </div>
        </Box>
      </Modal>
    </div>
  );
}