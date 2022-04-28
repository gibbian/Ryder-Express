import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export const ProductCard = ({ card }) => {

  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 20 }}>
        <Typography gutterBottom variant="h5" component="h2">
          <div className=''>
            {card.name}
          </div>
        </Typography>
        <Typography>
          {card.email}
        </Typography>
        <Typography>
          {card.phone}
        </Typography>
        <Typography>
          {card.region}
        </Typography>
        <Typography>
          {card.bio}
        </Typography>
      </CardContent>
    </Card>
  );
}