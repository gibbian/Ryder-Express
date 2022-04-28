import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}


//"id":1,"name":"Temple Runners","email":"templerunners@gmail.com",
//"phone":"917-769-3243","region":"Northeast","shipping_rates":300,"fleet_size":10,
//"num_deliveries":55,"is_verified":1


export const CompanyDetails = ({ companyDetails }) => {

  return (
    <React.Fragment>
      <Title>Company</Title>
      <Typography component="p" variant="h4">
        {companyDetails.name}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Contact Email:{companyDetails.email}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Contact Phone: {companyDetails.phone}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Region:{companyDetails.region}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Shipping Rate: $ {companyDetails.shipping_rates}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Fleet Size: {companyDetails.fleet_size}
      </Typography>
      <div id="comment_box">
        <Link color="primary" href="#" onClick={preventDefault}>
          View Details
        </Link>
      </div>
    </React.Fragment>
  );
}