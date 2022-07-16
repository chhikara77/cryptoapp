import React from 'react'
import "../style.css"
import {useEffect,useState} from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const SavedData = () => {
  const [watchlist,setWatchlist] = useState([])
  const [coins,setCoins]=useState([])
  const getSavedData = async () => {
    const { data } = await axios.get("/");
    setWatchlist(data);
  };
  const fetchCoins = async () => {
    const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false");
    setCoins(data);
  };
  const deleteRow=(name)=>{
    console.log(name)
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    axios.delete("/",{data:{name},axiosConfig})
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res.data.acknowledged);
      if(res.data.acknowledged){
        getSavedData()
      setWatchlist(watchlist.filter(ele=>ele.name !== name))
      }
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });
  }

    useEffect(() => {
      getSavedData();
      fetchCoins();
  }, []);
  return (
    <div>
<Container maxWidth="lg">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                {watchlist
                  .map((row) => {
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
                            style={{ marginBottom: 10 }}
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
            
                          {row.current_price}
                        </TableCell>
                        <TableCell
                          align="left"
                        >
                          <Button sx={{width:"100px"}} variant="contained" onClick={()=>deleteRow(row.name)}>delete</Button>
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
      <Typography sx={{textAlign:"center",padding:"10px",backgroundColor:"#e6e9fe"}}><Button to={"/"} component={Link} style={{width:"100px"}} variant='contained'>BACK</Button></Typography>
    </TableContainer>
    </Container>
    </div>
  )
}

export default SavedData