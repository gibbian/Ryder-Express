import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import longLogo from '../assets/images/long-RyderExpress.svg';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { handleChange } from "react";
import { apiCalls } from '../common/apiCalls';
import { InputLabel } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { async } from 'q';

//destination, productname, productdescription, daterecieved, productpicture{url}

const theme = createTheme();

export const Checkout = (props) => {
  const [availableDates, setavailableDates] = useState([]);
  const [date, setDate] = useState('');
  const [id, setId] = useState('0');
  const apiCall = new apiCalls();
  const navigate = useNavigate();

  async function getDetails() {
    const dates = await apiCall.getShipperAvailable(sessionStorage.getItem('companyID'));
    const currentUser = await apiCall.getCustomerByUsername(sessionStorage.getItem('username'));
    setavailableDates(dates.data.data);
    setId(currentUser.data.data[0].id);
  }

  useEffect(() => {
    getDetails();
  }, []);

  window.onload = getDetails;

  const handleDate = (event) => {
    setDate(event.target.value);
  }

  function validateFormInfo(data) {
    if (data.get('name').length <= 0) {
      alert("Please enter a name");
      return false;
    }
    if (data.get('email').length <= 0) {
      alert("Please enter an email");
      return false;
    }
    if (data.get('phone').length != 10) {
      alert("Please enter a valid phone number");
      return false;
    }
    if (data.get('username').length < 4) {
      alert("Please enter a username with at least 4 characters");
      return false;
    }
    if (data.get('password').length <= 0) {
      alert("Please enter a password");
      return false;
    }
    return true;
  }

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = (apiCall.getCustomerByUsername(sessionStorage.getItem('username'))).id;
    debugger;
    apiCall.makeDelivery(1, sessionStorage.getItem('companyID'), 0, data.get('origin'), data.get('address'), data.get('product-name'), data.get('date'));

    alert("Your order has been placed!");
    navigate('/Home');

  };

  function getDate(date) {
    return new Date(date).toLocaleDateString();
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onsubmit={handleSubmit}
        >
          <img src={longLogo} alt="Ryder Express" width="100%" />
          <Typography component="h1" variant="h5">
            Check Out
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="product-name"
                  name="Product Name"
                  required
                  fullWidth
                  id="product-name"
                  label="Product Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  type="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Product Description"
                  id="description"
                  autoComplete="description"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="photo"
                  label="Product Photo (URL)"
                  type="url"
                  id="photo"
                  autoComplete="photo"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="origin"
                  label="Origin Location"
                  type="origin"
                  id="location"
                  autoComplete="location"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='date-select-label'>Select Delivery Date</InputLabel>
                  <Select
                    required
                    labelId='date-select-label'
                    id="date"
                    value={date}
                    label="date"
                    onChange={handleDate}
                  >
                    {availableDates.map((date) => (
                      <MenuItem value={date.id}>{getDate(date.date)}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Check Out
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate('/Home')}
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}