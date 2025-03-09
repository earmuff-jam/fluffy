import React from 'react';

import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Box,
  Toolbar,
  IconButton,
  Paper,
  useMediaQuery,
  CssBaseline,
  useTheme,
} from '@mui/material';

// Icons
import MapIcon from '@mui/icons-material/Map';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DevicesIcon from '@mui/icons-material/Devices';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import { BarChart } from '@mui/icons-material';

const AuthHeader = () => {
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
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button color="inherit">Features</Button>
            <Button color="inherit">Pricing</Button>
            <Button color="inherit">Resources</Button>
            <Button color="inherit">Contact</Button>
          </Box>
        )}
      </Toolbar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf3 100%)',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  mb: 3,
                }}
              >
                Smarter Asset Management for Modern You
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Streamline operations, reduce costs, and gain full visibility with our comprehensive asset management
                solution.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ py: 1.5, px: 4 }}
                >
                  Start Free Trial
                </Button>
                <Button variant="outlined" size="large" color="primary" sx={{ py: 1.5, px: 4 }}>
                  Schedule a Demo
                </Button>
              </Box>
              <Box sx={{ mt: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No credit card required • 14-day free trial • Cancel anytime
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                component="img"
                src="/fleetwise.png"
                alt="Fleet management dashboard"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 3,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" component="h2" gutterBottom>
              Comprehensive Asset Management
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Everything you need to manage your assets and equipment in one place
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: <MapIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
                title: 'Location based Tracking',
                description: 'Monitor your assets with advanced location and geofencing capabilities.',
              },
              {
                icon: <ReceiptLongIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
                title: 'Maintenance Management',
                description:
                  'Schedule maintenance, track repair history, and receive alerts for upcoming service needs.',
              },
              {
                icon: <AccountBalanceWalletIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
                title: 'Cost Management',
                description: 'Track maintenance expenses, and total cost of ownership for assets.',
              },
              {
                icon: <AnalyticsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
                title: 'Advanced Analytics',
                description: 'Gain actionable insights with comprehensive reporting and analytics tools.',
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" component="h2" gutterBottom sx={{ color: 'white' }}>
              Why Choose FleetWise
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto', color: 'white', opacity: 0.9 }}>
              Our platform provides tangible benefits that improve operations and reduce costs
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: <DevicesIcon sx={{ fontSize: 40 }} />,
                title: 'All-in-One Platform',
                description: 'Manage equipment and assets in a single unified interface.',
              },
              {
                icon: <SpeedIcon sx={{ fontSize: 40 }} />,
                title: 'Increased Efficiency',
                description: 'Optimize operations to reduce idle time and improve productivity by up to 30%.',
              },
              {
                icon: <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />,
                title: 'Cost Reduction',
                description: 'Lower maintenance costs through proactive management of assets.',
              },
              {
                icon: <SecurityIcon sx={{ fontSize: 40 }} />,
                title: 'Enhanced Security',
                description: 'Prevent unauthorized use and recover lost / hidden assets with location based tracking.',
              },
            ].map((benefit, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  sx={{
                    p: 4,
                    height: '100%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ p: 2, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', alignContent: 'center' }}>
                      {benefit.icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'white' }}>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'white', opacity: 0.9 }}>
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AuthHeader;
