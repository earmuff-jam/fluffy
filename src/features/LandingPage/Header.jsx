import { BarChart, MenuRounded } from '@mui/icons-material';

import { Typography, Box, Toolbar, IconButton, useMediaQuery, CssBaseline, useTheme } from '@mui/material';

import HeroSection from '@features/LandingPage/HeroSection';
import NavigationBar from '@features/LandingPage/NavigationBar';
import FeaturesSection from '@features/LandingPage/FeaturesSection';
import BenefitsSection from '@features/LandingPage/BenefitsSection';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <CssBaseline />
      <Toolbar sx={{ py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <BarChart sx={{ color: 'primary.main', mr: 1, fontSize: 32 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
            FleetWise
          </Typography>
        </Box>

        {isMobile ? (
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuRounded />
          </IconButton>
        ) : (
          <NavigationBar />
        )}
      </Toolbar>

      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
    </>
  );
};

export default Header;
