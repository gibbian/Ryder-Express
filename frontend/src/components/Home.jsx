import { useEffect, useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { ProductCard } from "./ProductCard";
import { Navbar } from "./Navbar/Navbar";
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { UserDashboard } from "./UserDashboard/UserDashboard";

const theme = createTheme();

export const Home = () => {

  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [shipping_rates, setShippingRates] = useState('');
  const [fleet_size, setFleetSize] = useState('');
  const [num_deliveries, setNumDeliveries] = useState('');
  const [is_verified, setIsVerified] = useState('');

  const [cards, setCards] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/shipper`).then(
          res => {
            const values = res.data.data;
            console.log(values);
            setCards(values);
        })
    }, []);

    const navigate = useNavigate();

    const [ userName, setUserName ] = useState('John Doe');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleNameClick = (event) => {
        setAnchorEl(event.currentTarget);
     };
    const handleNameClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <AppBar position="static">
                  <Box sx={{ display:'flex',justifyContent: 'space-between', m:2}}>
                      <IconButton
                          size="large"
                          edge="start"
                          color="inherit"
                          aria-label="menu"
                          sx={{ mr: 2 }}
                      >
                      </IconButton>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 2}}>
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
                              {userName}
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
                              {/* <MenuItem onClick={() => navigate("/UserDashboard") }>My account</MenuItem> */}
                              <MenuItem>Logout</MenuItem>
                          </Menu>
                      </Typography>
                  </Box>
              </AppBar>
          <main>
            {/* Hero unit */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                <img src="https://cdn.discordapp.com/attachments/966865962617946142/968233453508251708/RyderExpress_BIG.png"></img>
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                  Welcome to Ryder Express!
                </Typography>
              </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
              {/* End hero unit */}
              <Typography variant="h4" align="center" color="text.primary" paragraph>
                  Shipping Companies
                </Typography>
              <Grid container spacing={4}>
                {cards.map((card) => (
                  <Grid item key={card.id} xs={12} sm={8} md={6} align="center">
                    <ProductCard card={card}></ProductCard>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
          {/* Footer */}
          <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h5" align="center" gutterBottom>
              Contact Us
            </Typography>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              RyderExpress@gmail.com{'\n'}
            </Typography>
            <Typography 
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p">
                (123) 456-7890
            </Typography>
          </Box>
          {/* End footer */}
        <Navbar></Navbar>
        </ThemeProvider>
      );
}