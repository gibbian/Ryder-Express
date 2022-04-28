import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function CompanyDetails() {
  return (
    <React.Fragment>
      <Title>Company</Title>
      <Typography component="p" variant="h4">
        Company Name
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Company Details
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Contact Email:
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Contact Phone Number:
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Shipping Rate: $
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Fleet Size: 
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Details
        </Link>
      </div>
    </React.Fragment>
  );
}