import React from 'react';

import { Card, CardContent, Container, Grid, Typography, Box } from '@mui/material';

import { MapRounded, ReceiptLongRounded, AccountBalanceWalletRounded, AnalyticsRounded } from '@mui/icons-material';

export default function FeaturesSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }} id="features-section">
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
              icon: <MapRounded sx={{ fontSize: 40, color: 'primary.main' }} />,
              title: 'Location based Tracking',
              description: 'Monitor your assets with advanced location and geofencing capabilities.',
            },
            {
              icon: <ReceiptLongRounded sx={{ fontSize: 40, color: 'primary.main' }} />,
              title: 'Maintenance Management',
              description: 'Schedule maintenance, track repair history, and receive alerts for upcoming service needs.',
            },
            {
              icon: <AccountBalanceWalletRounded sx={{ fontSize: 40, color: 'primary.main' }} />,
              title: 'Cost Management',
              description: 'Track maintenance expenses, and total cost of ownership for assets.',
            },
            {
              icon: <AnalyticsRounded sx={{ fontSize: 40, color: 'primary.main' }} />,
              title: 'Advanced Analytics',
              description: 'Gain actionable insights with comprehensive reporting and analytics tools.',
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
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
  );
}
