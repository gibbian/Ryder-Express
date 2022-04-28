import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { ProductProfile } from "./ProductProfile";
import { useEffect, useState } from "react";
import { Rating } from './Rating';

export const ReviewCard = ({review}) => {

  const [rating, setRating] = useState('0');

  const [ratingOptions] = useState([
    '1', '2', '3', '4', '5'
  ]);

  review.shipper_rating = setRating;

  review.shipper_rating = rating;

    return (
      <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 30 }}>
          <Typography variant="h5" component="h2">
            Rating:
          </Typography>
          <Typography>
            {review.text}
          </Typography>
            <Rating value={setRating}/>
        </CardContent>
      </Card>
    );
}