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
import { useState } from "react";
import { apiCalls } from '../common/apiCalls';
import { InputLabel } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

//destination, productname, productdescription, daterecieved, productpicture{url}

const theme = createTheme();

export const Checkout = (props) => {
  const [region, setRegion] = useState('');
  const apiCall = new apiCalls();
  const navigate = useNavigate();

  const handelRegion = (event) => {
    setRegion(event.target.value);
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
    if (validateFormInfo(data)) {
        apiCall.buyerRegister(data.get('name'), data.get('email'), data.get('phone'), data.get('username'), data.get('password'));
        navigate('/SignIn');
    }
  };

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
                  autoComplete="given-name"
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
                  id="destination"
                  label="Destination"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="origin-region"
                  label="Origin Region"
                  id="origin-region"
                  autoComplete="Origin Region"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                    console.log(e.target.value.length)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Destination Region"
                  name="destination-region"
                  required
                  fullWidth
                  id="destination-region"
                  label="Destination Region"
                  autoFocus

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Product Description"
                  id="product-description"
                  autoComplete="Product Description"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="photo"
                  label="Product Photo (URL)"
                  type="url"
                  id="product-photo"
                  autoComplete="Product Photo"
                />
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}