import * as React from 'react';
import {useEffect,useState} from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Button, Container } from '@mui/material';
import {Link} from "react-router-dom"

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CryptoList() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeBtns, setActiveBtns] = useState([])
 const categorybtnactive={
   backgroundColor:"#6D5BD0"
 }
 const categorybtn={
   backgroundColor:"primary"
 }

  const getSavedData = async () => {
    const { data } = await axios.get("/data");
    const watchdata=data.map((ele)=>{
       return ele.name
    })
    setActiveBtns([...activeBtns,...watchdata])
  };

  const fetchCoins = async () => {
    const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false");
    setCoins(data);
  };

  useEffect(() => {
    fetchCoins();
    getSavedData()
  }, []);
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  function senddata(data) {
    console.log(data)
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    axios.post('/', data, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      setActiveBtns([...activeBtns,data.name])
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }
  return (
    <Container maxWidth="lg">
      <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
    <TableContainer component={Paper}>
      <Table  sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor:"#e6e9fe"}}>
        <TableRow>
                  {["Coin", "Symbol", "Price", "Action", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                        minWidth: "120px"
                      }}
                      key={head}
                      align={"left"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
        </TableHead>
        <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row,index) => {
                    return (
                      <TableRow
    
                        key={row.name}
                      >
                        <TableCell
                        align="left"
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 10,
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="40"
                            style={{ marginBottom: 10,borderRadius:"50%",padding:"5px",backgroundColor:"#e6e9fe" }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="left">
            
                          {row.symbol.toUpperCase()}
                        </TableCell>
                        <TableCell align="left">
            
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="left"
                        >
                          <Button to={activeBtns.includes(row.name) ? "/view":"/"} component={Link} sx={activeBtns.includes(row.name) ? categorybtnactive : categorybtn} onClick={activeBtns.includes(row.name)?"":(e)=>senddata(row)} variant="contained">{activeBtns.includes(row.name) ? "View" : "Save"}</Button>
                        </TableCell>
                        <TableCell align="left">
                          {row.market_cap}
                          &nbsp;M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
      </Table>
    </TableContainer>
    <Stack spacing={2} sx={{padding:"12px",marginTop:"10px",backgroundColor:"#e6e9fe",borderRadius:"5px"}} flexDirection="row" justifyContent="center">
      <Pagination style={{justifyContent: "center",width:400,flexDirection:"row"}} count={(handleSearch().length / 10).toFixed(0)} page={page} onChange={(event,value)=>setPage(value)} color="primary" />
    </Stack>
    </Container>
  );
}

export default CryptoList