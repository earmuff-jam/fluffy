import React from 'react';

import { Button, Box } from '@mui/material';

export default function NavigationBar() {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Button color="inherit" onClick={() => handleScroll('features-section')}>
        Features
      </Button>
      <Button color="inherit" onClick={() => handleScroll('pricing-details')}>
        Pricing
      </Button>
      <Button color="inherit" onClick={() => handleScroll('benefits-section')}>
        Resources
      </Button>
      <Button color="inherit" onClick={() => handleScroll('contacts-section')}>
        Contact
      </Button>
    </Box>
  );
}
