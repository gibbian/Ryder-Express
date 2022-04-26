import { useEffect, useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { ProductCard } from "./ProductCard";

//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const theme = createTheme();

export const Home = () =>{

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
    
    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button variant="contained">Main call to action</Button>
                  <Button variant="outlined">Secondary action</Button>
                </Stack>
              </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {cards.map((card) => (
                    <Grid item key={card.id} xs={12} sm={8} md={12}>
                        <ProductCard card={card}></ProductCard>
                    </Grid>
                ))}
              </Grid>
            </Container>
          </main>
          {/* Footer */}
          <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Something here to give the footer a purpose!
            </Typography>
          </Box>
          {/* End footer */}
        </ThemeProvider>
      );
}