import { useEffect,useState } from "react";
import Appshell from "../../components/Appshell/appshell";
import CardHome from "../../components/Card/cardHome";
import './styles.css'
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { refreshToken } from "../../api/refreshToken";
import { jwtDecode } from 'jwt-decode';
import { useSelector } from "react-redux";
import axiosJwt from "../../api/interceptors";
import { store } from "../../redux/store";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import ModalDate from "../../components/Modals/ModalDate";
import { startOfWeek, endOfWeek,startOfMonth, endOfMonth, format } from 'date-fns';
import CSVDownloadButton from "../../components/Export/CSVDownloadButton";



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);






const Admin = () => {
  // const cardContent = [
  //   {
  //     icon:<LocalAtmOutlinedIcon sx={{fontSize: "60px"}}/>,
  //     number:4000,
  //     text:"client"
  //   },
  //   {
  //     icon:<LocalAtmOutlinedIcon sx={{fontSize: "60px"}}/>,
  //     number:4000,
  //     text:"client"
  //   },
  //   {
  //     icon:<LocalAtmOutlinedIcon sx={{fontSize: "60px"}}/>,
  //     number:4000,
  //     text:"client"
  //   },
  //   {
  //     icon:<LocalAtmOutlinedIcon sx={{fontSize: "60px"}}/>,
  //     number:4000,
  //     text:"client"
  //   },
  // ]
  const accessToken = useSelector(state => state.token.accessToken);
  const id = useSelector(state => state.token.id);
  const [tiketSucces,setTiketSucces] = useState('')
  const [tiketPending,setTiketPending] = useState('')
  const [value,setValue] = useState('')
  const [inMonth,setInMonth] = useState([])
  const [inWeek,setInWeek] = useState([])
  const [inToday,setInToday] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [chartData, setChartData] = useState({});
  const navigate = useNavigate();
  const [exportValue,setExportValue] = useState('')
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd')
  const startDate = startOfWeek(today, { weekStartsOn: 0 });
  const endDate = endOfWeek(today, { weekStartsOn: 0 });
  const startOfMonthDate = startOfMonth(today);
  const endOfMonthDate = endOfMonth(today);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Laporan penjualan tiket tanggal ${format(startDate, 'yyyy-MM-dd')} - ${format(endDate, 'yyyy-MM-dd')}`,
      },
    },
  };
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Tiket',
  //       // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       // data: [12, 19, 3, 5, 2, 3, 9],
  //       backgroundColor: 'red',
  //     }
  //   ],
  // };
  useEffect(()=> {
    const requestApi = async()=>{
      try{
        const req = await axiosJwt.get('/tiket',{
          headers: { 
            Authorization: `Bearer ${accessToken}`
          }
        });

        setValue(req.data)
        const isVerifiedSucces= req.data.filter(item=>item.isVerified == true)
        const isVerifiedPending = req.data.filter(item=>item.isVerified == false)
        setTiketSucces(isVerifiedSucces.length)
        setTiketPending(isVerifiedPending.length)

        const labels = ['minggu','senin','selasa','rabu','kamis','jumat','sabtu'];
        const bookingsPerDayInWeek = []

        const bookingsForDay = req.data.filter(item=>item.waktuPesan === formattedToday);

        for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
          const date = new Date(today.getFullYear(), today.getMonth(), i);
          // labels.push(format(date, 'yyyy-MM-dd'));
          const bookingsOnDate = req.data.filter(item => item.waktuPesan === format(date, 'yyyy-MM-dd'));
          bookingsPerDayInWeek.push(bookingsOnDate.length)
        }
        const bookingsForThisWeek = req.data.filter(
          item => {
            const bookingDate = new Date(item.waktuPesan)
            return (
              bookingDate >= startDate && bookingDate <= endDate
            )
          }
        )

        const bookingsForThisMonth = req.data.filter(
          item => {
            const bookingDate = new Date(item.waktuPesan);
            return (
              bookingDate >= startOfMonthDate &&
              bookingDate <= endOfMonthDate
            );
          }
        );

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Bookings',
              // data: bookingsPerDay,
              data: bookingsPerDayInWeek,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0,0 , 0.1)',
              borderWidth: 1,
            },
          ],
        });

        setInMonth(bookingsForThisMonth)
        setInWeek(bookingsForThisWeek)
        setInToday(bookingsForDay)

      }catch(err){
        console.log(err)
      }
    }

    requestApi()
  },[])
  useEffect(()=> {
    setExportValue(inToday)
  },[inToday])
  const getValueExport = (item)=> {
    if(item==0) return setExportValue(inToday);
    if(item==1) return setExportValue(inWeek);
    if(item==2) return setExportValue(inMonth);
    return setExportValue(inToday)
  }
  return (
    <Appshell data={tiketPending}>
      <div className="card-home">
        <div className="card-home__left">
          <h3 className="card-home__left-desc">
            hari ini : <span>{inToday.length} tiket</span> | <span>Rp.{inToday.length * 35000}</span> 
            
          </h3>
          <h3 className="card-home__left-desc">Minggu ini : <span>{inWeek.length} tiket</span> | <span>Rp.{inWeek.length * 35000}</span> </h3>
          <h3 className="card-home__left-desc">Bulan ini : <span>{inMonth.length} tiket</span> | <span>Rp.{inMonth.length * 35000}</span> </h3>
        </div>
        <div className="card-home__center">

        </div>
        <div className="card-home__right">
          <CardHome
            key={0}
            icon={<LocalAtmOutlinedIcon sx={{fontSize: "60px"}}/>} 
            number={tiketSucces && tiketSucces}
            text={"Tiket selesai"}
            background={"red"}
            to="/admin/rekapPesanan"
            />
          <CardHome
            key={1}
            icon={<LocalAtmOutlinedIcon sx={{fontSize: "60px"}}/>} 
            number={tiketPending}
            text={"Tiket antrian"} 
            background={"yellowgreen"}
            to="/admin/pesanan"
          />
        </div>
      </div>
      <div className="export__container">
        <h2>Laporan Penjualan</h2>
        <div className="export__flex">
          <button className="btn-createReport" onClick={()=>handleOpen()}>Create Report <CalendarMonthIcon /></button>
          <ModalDate 
              open={open}
              handleClose={handleClose}
              data={value || []}
          /> 
          <select className="select-export" defaultValue="0" onChange={(e)=>getValueExport(e.target.value)}>
            <option value="0">{formattedToday}</option>
            <option value="1">In week</option>
            <option value="2">In month</option>
          </select>
          <CSVDownloadButton
            data={exportValue || []}
            title={'Export'}
            fileName={'report'}

          />
        </div>
      </div>
      <div className="line-cart__container">
      {chartData.labels && chartData.labels.length > 0 ? (
        <Bar options={options} data={chartData} />
      ) : (
        <p>Loading or no data available</p>
      )}
      </div>
    </Appshell>
  )
};
export default Admin;