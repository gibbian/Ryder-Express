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
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { apiCalls } from '../common/apiCalls';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import { ReviewCard } from "./ReviewCard";

const theme = createTheme();

export const BasicMenu = ({ userName }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  

  const navigate = useNavigate();
  const apiCalls = new apiCalls();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    console.log("logout");
    sessionStorage.clear();
    navigate('/');

  }
  const handleProfile = () => {
    console.log("logout");
    sessionStorage.clear();
    navigate('/');
  }

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
        <MenuItem onClick={handleClose}>Home</MenuItem>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export const ProductProfile = (props) => {

  const apiCall = new apiCalls();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = useState('');
  const [id, setId] = useState(0);


  useEffect(() => {
    const shipperID = sessionStorage.getItem("companyID");
    apiCall.getReviews(shipperID).then(res => {
      setReviews(res.data.data);
    })
  }, []);


  const open = Boolean(anchorEl);

  const handleNameClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNameClose = () => {
    setAnchorEl(null);
  };
  const handleHome = () => {
    console.log("closing");
    setAnchorEl(null);
    navigate('/home');
  };
  const handleLogout = () => {
    console.log("logout");
    sessionStorage.clear();
    navigate('/');
  }
  const handleProfile = () => {
    console.log("logout");
    sessionStorage.clear();
    navigate('/');
  }
  const handleSubmitReivew = () => {
    console.log("reviewSubmit");
    sessionStorage.clear();
    navigate('/');
  }
  const handleMakeOrder = () => {
    console.log("makeOrder");
    navigate('/Checkout');
  }

  function getStatus(prop) {
    if (prop.is_delivered) {
      return 'Delivered'
    }
    if (prop.is_return) {
      return 'Returned'
    }
    if (prop.left_warehouse) {
      return 'Left Warehouse'
    }
    if (!prop.left_warehouse) {
      return 'Pending'
    }
    return 'In Transit'
  }

  function getDeliveryDate(prop) {
    const date = new Date(prop.date_received);
    return date.getMonth().toString() + '/' + date.getDate().toString();
  }

  const [values, setValues] = useState([])

  // useEffect(() => {
  //   axios.get(`http://localhost:8000/shipper`).then(
  //     res => {
  //       const values = res.data.data;
  //       console.log(values);
  //       setValues(values);
  //     })
  // }, []);

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
                User
                {name}
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
              <MenuItem onClick={handleHome}>Home Page</MenuItem>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Typography>
        </Box>
      </AppBar>
      <Box sx={{ width: '200%' }}>
        <Grid container direction="row" justifyContent="space-evenly" alignContent="baseline" sx={{ width: '100%' }}>
          <Grid container alignContent="center"  sx={{ width: '200%' }} xs={12}>
            <Grid mt={10} mx={50}>
              <Card sx={{ width: '200%' }}>
                <CardContent align="center" >
                  <Grid container direction="column" justifyContent="space-between" mr={10} >
                    <Grid mb={2} bl={10} br={10}>
                      <Typography variant="h4" component="h2">
                        Temple Runners
                        {values.name}
                      </Typography>
                    </Grid>
                    <Grid mb={2}>
                      <Grid container direction="row" justifyContent="space-evenly">
                        <Grid direction="column">
                          <Typography variant="h6" component="h2">
                            <u>Shipping Rate</u>
                          </Typography>
                          <Typography variant="h6" component="h2">
                            {'$300'}
                            {/* {'$' + props.shipping_rate} */}
                          </Typography>
                        </Grid>

                        <Grid direction="column">
                          <Typography variant="h6" component="h2">
                            <u>Fleet Size</u>
                          </Typography>
                          <Typography variant="h6" component="h2">
                            10 Trucks
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid mt={5}>
                      <Typography variant="h6" component="h2">
                        <u>Contact</u>
                      </Typography>
                      <Typography variant="h6" component="h2">
                        Email: templerunners@gmail.com
                        {/* {values.id.email} */}
                      </Typography>
                      <Typography variant="h6" component="h2">
                        Phone Number: 917-769-3243
                        {/* {values.id.phone_number} */}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Button variant="contained" sx={{ width: '200%' }} onClick={handleMakeOrder}>
                Start your order!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box m={5}>
        <Card sx={{ width: '100%' }}>
          <CardContent align="center" >
            <Typography component="h1" variant="h5">
              Submit a Review!
            </Typography>
            <Grid container component="form" onSubmit={handleSubmitReivew} direction="column">
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
            </Grid>
          </CardContent>
        </Card>
        {reviews.map((review) => (
          <Grid item key={review} xs={12} sm={8} md={6} align="center">
            <ReviewCard review={review}></ReviewCard>
            {console.log(review)}
          </Grid>
        ))}
      </Box>
      <CssBaseline />
    </ThemeProvider>
  );
}