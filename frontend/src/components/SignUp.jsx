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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { handleChange } from "react";
import { useState } from "react";
import { apiCalls } from '../common/apiCalls';



const theme = createTheme();

export const SignUp = () => {
  const [isShipper, setIsShipper] = useState(false);
  const apiCall = new apiCalls();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(isShipper){
      console.log(typeof(data.get('shipping-rate')));
      //apiCall.shipperRegister(data.get('name'), data.get('email'), data.get('phone'), data.get('region'), parseInt(data.get('shipping-rate')), parseInt(data.get('fleet-size')), data.get('username'), data.get('password'));
    }
    else{
      apiCall.buyerRegister(data.get('name'), data.get('email'), data.get('phone'), data.get('username'), data.get('password'));
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
                  <TextField
                    required
                    fullWidth
                    name="region"
                    label="Region"
                    type="region"
                    id="region"
                    autoComplete="region"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="shippng-rate"
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