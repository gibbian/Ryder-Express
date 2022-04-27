import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}


// id, name, detail, contactInfo, shippingRate, fleetSize
export default function CompanyDetails() {
  return (
    <React.Fragment>
      <Title>Company</Title>
      <Typography component="p" variant="h4">
        DHL
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Contact Info:999-999-9999
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Shipping Rate: $2.54
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Fleet Size: 20
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Detail
        </Link>
      </div>
    </React.Fragment>
  );
}