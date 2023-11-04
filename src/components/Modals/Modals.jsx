import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import ReactWhatsapp from "react-whatsapp";
const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "87vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "8px",
  overflowY: "auto",
};

const Modals = ({ open, handleClose }) => {
  const [value, setValue] = useState({
    nama: "",
    email: "",
    noWa: "",
    alamat: "",
    tanggal: new Date(),
    kdTempat: [],
  });
  const onHandleOnSubmit = (e) => {
    // e.preventDefault();
    // const nomorWhatsApp = '6283825702000';
    const nomorWhatsApp = "6285695036046";
    const kodeTempat = value.kdTempat.map((item) => {
      return item;
    });
    const pesan = `hallo selamat siang admin saya ${value.nama} dengan email ${value.email} alamat ${value.alamat} nomer wa ${value.noWa} izin konfirmasi dengan kode pemesanan ${kodeTempat} jadwal: ${value.jadwal}`;
    window.open(
      `https://api.whatsapp.com/send?phone=${nomorWhatsApp}&text=${encodeURIComponent(
        pesan
      )}`,
      "_blank"
    );
    window.location.reload();
    // console.log(value)
  };
  const onHandleOnKdtempat = (x) => {
    setValue({ ...value, kdTempat: [...value.kdTempat, x] });
  };
  const dataTempat = [
    { kdTempat: ["kd1", "kd2", "kd3", "kd4", "kd5"] },
    { kdTempat: ["kd6", "kd7", "kd8", "kd9", "kd10"] },
    { kdTempat: ["kd11", "kd12", "kd13", "kd14", "kd15"] },
    { kdTempat: ["kd16", "kd17", "kd318", "kd19", "kd20"] },
    { kdTempat: ["kd21", "kd22", "kd23", "kd24", "kd25"] },
    { kdTempat: ["kd26", "kd27", "kd28", "kd29", "kd230"] },
    { kdTempat: ["kd31", "kd32", "kd33", "kd34", "kd35"] },
    { kdTempat: ["kd36", "kd37", "kd38", "kd39", "kd40"] },
  ];
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseOutlinedIcon
            sx={{
              position: "absolute",
              top: "0",
              right: "0px",
              fontSize: "30px",
            }}
            onClick={handleClose}
          />
          <h1>inputan</h1>
          <form onSubmit={onHandleOnSubmit}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                id="nama"
                label="nama"
                type="text"
                value={value.nama}
                onChange={(e) => setValue({ ...value, nama: e.target.value })}
              />
              <TextField
                id="email"
                label="email"
                type="email"
                sx={{ marginTop: "10px" }}
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
              />
              <TextField
                id="noWa"
                label="No hp"
                type="number"
                sx={{ marginTop: "10px" }}
                value={value.noWa}
                onChange={(e) => setValue({ ...value, noWa: e.target.value })}
              />
              <TextField
                id="alamat"
                label="alamat"
                type="text"
                sx={{ marginTop: "10px" }}
                value={value.alamat}
                onChange={(e) => setValue({ ...value, alamat: e.target.value })}
              />
            </FormControl>
            <table style={{ margin: "20px 0" }}>
              {/* 8 baris 5 kolom */}
              <tbody>
                {dataTempat &&
                  dataTempat.map((item, index) => (
                    <tr key={index}>
                      {item &&
                        item.kdTempat.map((kd, index) => (
                          <td key={index}>
                            <div
                              style={{
                                cursor: "pointer",
                                backgroundColor: "red",
                                padding: "4px",
                              }}
                              onClick={() => onHandleOnKdtempat(kd, index)}
                            >
                              {kd}
                            </div>
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
            <label htmlFor="jadwal">Pilih jadwal</label>
            <select
              name="jadwal"
              id=""
              style={{ width: "100%", marginBottom: "20px", padding: "10px" }}
              onChange={(e) => setValue({ ...value, jadwal: e.target.value })}
            >
              <option value="jam 08.00, hari : selasa">
                jam 08.00, hari : selasa
              </option>
              <option value="jam 08.00, hari : selasa">
                jam 08.00, hari : selasa
              </option>
              <option value="jam 08.00, hari : selasa">
                jam 08.00, hari : selasa
              </option>
            </select>
            <button type="submit" style={{ width: "100%" }}>
              submit
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default Modals;
