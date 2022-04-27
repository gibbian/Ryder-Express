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



const theme = createTheme();

export const SignUp = (props) => {
  const [isShipper, setIsShipper] = useState(false);
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
    if (isShipper) {
      if (region == '') {
        alert("Please choose a region");
        return false;
      }
      if (parseInt(data.get('shipping-rate')) <= 0 || isNaN(parseInt(data.get('shipping-rate')))) {
        alert("Please enter a valid shipping rate");
        return false;
      }
      if (parseInt(data.get('fleet-size')) <= 0 || isNaN(parseInt(data.get('fleet-size')))) {
        alert("Please enter a valid fleet size");
        return false;
      }
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (validateFormInfo(data)) {
      if (isShipper) {
        apiCall.shipperRegister(data.get('name'), data.get('email'), data.get('phone'), data.get('region'), parseInt(data.get('shipping-rate')), parseInt(data.get('fleet-size')), data.get('username'), data.get('password'));
        navigate('/SignIn');
      }
      else {
        apiCall.buyerRegister(data.get('name'), data.get('email'), data.get('phone'), data.get('username'), data.get('password'));
        navigate('/SignIn');
      }
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name / Company Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="number"
                  id="phone-number"
                  autoComplete="phone number"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                    console.log(e.target.value.length)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={isShipper} color="primary" onChange={e => setIsShipper(e.target.checked)} />}
                  label="Are you a Shipper?"
                />
              </Grid>
            </Grid>
            {isShipper && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='region-select-label'>Region</InputLabel>
                    <Select
                      required
                      labelId='region-select-label'
                      id="region"
                      value={region}
                      label="Region"
                      onChange={handelRegion}
                    >
                      <MenuItem value={'Northwest'}>Northwest</MenuItem>
                      <MenuItem value={'West'}>West</MenuItem>
                      <MenuItem value={'Southwest'}>Southwest</MenuItem>
                      <MenuItem value={'Midwest'}>Midwest</MenuItem>
                      <MenuItem value={'Southeast'}>Southeast</MenuItem>
                      <MenuItem value={'Mid Atlantic'}>Mid Atlantic</MenuItem>
                      <MenuItem value={'Northeast'}>Northeast</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="shipping-rate"
                    label="Shipping Rate (Dollars per day)"
                    type="number"
                    id="shipping-rate"
                    autoComplete="shipping rate"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="fleet-size"
                    label="Fleet Size"
                    type="number"
                    id="fleet-size"
                    autoComplete="fleet size"
                  />
                </Grid>
              </Grid>
            )}


            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Link href="/SignIn" variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}