import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export const ProductCard = ({ name, email, phone, region, shipping_rates, fleet_size, bio}) => {
    return (
      <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 20 }}>
          <Typography gutterBottom variant="h5" component="h2">
            
          </Typography>
          <Typography>
            This is a media card. You can use this section to describe the
            content.
          </Typography>
        </CardContent>
      </Card>
    );
}