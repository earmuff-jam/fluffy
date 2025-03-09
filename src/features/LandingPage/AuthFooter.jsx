import React from 'react';

import { Button, Container, Card, CardContent, TextField, Grid, Typography, Box, Divider, Stack } from '@mui/material';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

function AuthFooter() {
  return (
    <>
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Card sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h3" component="h2" gutterBottom>
                Ready to Transform Your Fleet Management?
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
                Join thousands of companies that trust FleetWise for their asset management needs.
              </Typography>

              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    placeholder="Enter your email address"
                    variant="outlined"
                    sx={{
                      mb: { xs: 2, md: 0 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        height: '56px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button fullWidth variant="contained" color="primary" size="large" sx={{ height: '56px' }}>
                    Get Started Free
                  </Button>
                </Grid>
              </Grid>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                No credit card required • 14-day free trial • Full access to all features
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Box component="footer" sx={{ py: 6, backgroundColor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <DirectionsCarIcon sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  FleetWise
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Intelligent asset management solutions that help businesses optimize their operations, reduce costs, and
                improve efficiency.
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Product
              </Typography>
              <Stack spacing={1}>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Features
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Pricing
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Integrations
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Updates
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Resources
              </Typography>
              <Stack spacing={1}>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Documentation
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Guides
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Support
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  API
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Company
              </Typography>
              <Stack spacing={1}>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  About Us
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Careers
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Blog
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Contact
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Legal
              </Typography>
              <Stack spacing={1}>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Privacy
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Terms
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>
                  Security
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">
              ©2024 FleetWise. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default AuthFooter;
