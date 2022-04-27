import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import longLogo from '../assets/images/long-RyderExpress.svg';
import axios from 'axios';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiCalls } from '../common/apiCalls';
import { useState } from "react";
import { Navigat, useNavigate } from 'react-router-dom';

const fetchBase = () => {
  axios.get(`http://localhost:8000/shipper`).then((res) => {
    alert(res);
  })
}

const theme = createTheme();

export const SignIn = (props) => {
  const [isShipper, setIsShipper] = useState(false);
  const apiCall = new apiCalls();
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isShipper) {
      apiCall.shipperLogin(data.get('username'), data.get('password')).then((res) => {
        if (res.status <= 201) {
          apiCall.getShipperToken().then((res) => {
            console.log("Result: ");
            console.log(res);
            sessionStorage.setItem('token', res.data.data[0].token);
          })
            .catch((err) => {
              console.log("Error: ");
              console.log(err);
            });
          navigate('/home');
        }
      }).catch((err2) => {
        alert("Username or password is incorrect");
      });
    }
    else {
      apiCall.customerLogin(data.get('username'), data.get('password')).then((res) => {
        if (res.status <= 201) {
          apiCall.getCustomerToken().then((res) => {
            console.log("Result: ");
            console.log(res);
            sessionStorage.setItem('token', res.data.data[0].token);
          })
            .catch((err) => {
              console.log("Error: ");
              console.log(err);
            });
          navigate('/home');
        }
      }).catch((err2) => {
        alert("Username or password is incorrect");
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={longLogo} alt="Ryder Express" width="100%" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={isShipper} color="primary" onChange={e => setIsShipper(e.target.checked)} />}
                label="Are you a Shipper?"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              //justifyContent="space-around"
            >
              Sign In
            </Button>
            <Grid>
              <Link href="/SignUp" variant="body2" >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}