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
      <Button onClick={() => handleScroll('features-section')}>
        Features
      </Button>
      <Button onClick={() => handleScroll('pricing-details')}>
        Pricing
      </Button>
      <Button onClick={() => handleScroll('benefits-section')}>
        Resources
      </Button>
      <Button onClick={() => handleScroll('contacts-section')}>
        Contact
      </Button>
    </Box>
  );
}
