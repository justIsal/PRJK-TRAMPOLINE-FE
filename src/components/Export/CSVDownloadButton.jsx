import React from 'react';
import CSVDownloader from 'react-csv-downloader';
import { format } from 'date-fns';
const columns = [
    {
        id: 'name',
        displayName: 'Nama'
    }, 
    {
        id: 'waktuPesan',
        displayName: 'Waktu pesan'
    },
    {
        id: 'total',
        displayName: 'Total'
    }
];
const CSVDownloadButton = ({ data,fileName,title }) => {
    const datas = data.map((item,index)=>(
        {
            name: item.name,
            waktuPesan: format(new Date(item.waktuPesan), 'yyyy/MM/dd'),
            total: 35000
        }
    ))
    const total = datas.length * 35000;
    const dataWithTotal = [...datas, { name: 'Total', waktuPesan: '', total }];
    return (
        <CSVDownloader
            filename={fileName}
            separator=";"
            columns={columns}
            datas={dataWithTotal}
            // disabled="true"
            className="btn-export"
        >
        <button>{title}</button>
        </CSVDownloader>
    );
};

export default CSVDownloadButton;
