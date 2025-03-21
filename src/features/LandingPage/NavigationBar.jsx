import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavigationBar() {
  const navigate = useNavigate();

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
      <Button onClick={() => navigate("pricing")}>
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
