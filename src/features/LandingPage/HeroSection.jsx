import { useNavigate } from 'react-router-dom';

import { Button, Container, Grid, Typography, Box } from '@mui/material';

import { ArrowForwardIosRounded } from '@mui/icons-material';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
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
                endIcon={<ArrowForwardIosRounded />}
                sx={{ py: 1.5, px: 4 }}
                onClick={() => navigate('/external')}
              >
                Login / Start trial
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
  );
}
