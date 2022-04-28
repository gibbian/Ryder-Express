import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export const ProductCard = ({ card }) => {

  const navigate = useNavigate();

  // const toProfile = () => {
  //   navigate("/userDashboard", { state: { id: 1} });
  // };

  // const Profile = () => {
  //   const location = useLocation();
  // }

  const toProfile = (user) => {
    console.log(user.id);
    sessionStorage.setItem('companyID', user.id);
    navigate('/ProductPage');
  };
    

    return (
      <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 30 }}>
          <Typography variant="h5" component="h2">
            {card.name}
          </Typography>
          <Typography>
            Email:{" "}
            {card.email}
          </Typography>
          <Typography>
            Phone Number:{" "}
            {card.phone}
          </Typography>
          <Typography>
            Region:{" "}
            {card.region}
          </Typography>
          <Typography>
            {card.bio}
          </Typography>
          <Button size="large" variant="contained" onClick={() => toProfile(card)}>
            Profile
          </Button>
        </CardContent>
      </Card>
    );
}