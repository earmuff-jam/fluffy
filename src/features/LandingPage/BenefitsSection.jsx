import React from 'react';

import { Container, Grid, Typography, Box, Paper } from '@mui/material';

import { AccountBalanceWalletRounded, DevicesRounded, SecurityRounded, SpeedRounded } from '@mui/icons-material';

export default function BenefitsSection() {
  return (
    <Box id="benefits-section" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'primary.main', color: 'white' }}>
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
              icon: <DevicesRounded sx={{ fontSize: 40 }} />,
              title: 'All-in-One Platform',
              description: 'Manage equipment and assets in a single unified interface.',
            },
            {
              icon: <SpeedRounded sx={{ fontSize: 40 }} />,
              title: 'Increased Efficiency',
              description: 'Optimize operations to reduce idle time and improve productivity by up to 30%.',
            },
            {
              icon: <AccountBalanceWalletRounded sx={{ fontSize: 40 }} />,
              title: 'Cost Reduction',
              description: 'Lower maintenance costs through proactive management of assets.',
            },
            {
              icon: <SecurityRounded sx={{ fontSize: 40 }} />,
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
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      alignContent: 'center',
                    }}
                  >
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
  );
}
