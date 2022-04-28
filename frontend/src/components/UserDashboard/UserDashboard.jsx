import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { apiCalls } from '../../common/apiCalls';
import { useEffect, useState } from "react";


const theme = createTheme();

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9), 
];




export const BasicMenu = ({ userName }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <text>
          {userName}
        </text>

      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export const UserDashboard = (props) => {
  
  const apiCall = new apiCalls(); 

  const [userName, setUserName] = useState('John Doe');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => { 
    apiCall.getDeliveries(1).then(res => {
      const orders = res.data.data
      setDeliveries(orders);
    }); 
  }, [])

  const open = Boolean(anchorEl);

  const handleNameClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNameClose = () => {
    setAnchorEl(null);
  };
  const handleTest = () => {
    apiCall.getReviews(1).then(res => {
      console.log(res);
    });    
  }

  function getStatus(prop){
    if(prop.is_delivered){
      return 'Delivered'
    }
    if(prop.is_return){
      return 'Returned'
    }
    if(prop.left_warehouse){
      return 'Left Warehouse'
    }
    if(!prop.left_warehouse){
      return 'Pending'
    }
    return 'In Transit'
  }

  function getDeliveryDate(prop){
    const date = new Date(prop.date_received);
    return date.getMonth().toString() + '/' + date.getDate().toString();
  }
  

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            Orders
          </Typography>
          <Typography>
            <Button
              color="inherit"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleNameClick}
            >
              <u>
                {userName}
              </u>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleNameClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem>Home Page</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </Typography>
        </Box>
      </AppBar>
        <CssBaseline />
        <Box sx={{ m:2 }}>
        <TableContainer component={Paper} >
          <Table  aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableCell align="right">Product Name</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Expected Delivery</TableCell>
                <TableCell align="right">Assigned Contact</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((order) => (
                <TableRow
                  key={order.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{order.product_name}</TableCell>
                  <TableCell align="right">{getStatus(order)}</TableCell>
                  <TableCell align="right">{getDeliveryDate(order)}</TableCell>
                  {/* <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={handleTest}>
          TEST
        </Button>
        </Box>
    </ThemeProvider>
  );
}