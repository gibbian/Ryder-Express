import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";


export const ReviewCard = ({ card }) => {

  
    return (
      <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 30 }}>
          <Typography variant="h5" component="h2">
            {card.name}
          </Typography>
          <Typography>
            Name:{" "} {card.email}
          </Typography>
          <Typography>
            Phone Number:{" "} {card.rating}
          </Typography>
          <Typography>
            Region:{" "} {card.review}
          </Typography>
        </CardContent>
      </Card>
    );
}