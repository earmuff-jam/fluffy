import React from 'react';

import { Button, Container, Grid, Typography, Box, Divider, Stack } from '@mui/material';

import { BarChartRounded } from '@mui/icons-material';

function Footer() {
  const handleNavigate = (url) => {
    window.location.href = url;
  };

  return (
    <>
      <Box component="footer" sx={{ py: 6, backgroundColor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <BarChartRounded sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
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
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  Features
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  Pricing
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  Integrations
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  Updates
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Resources
              </Typography>
              <Stack spacing={1}>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  Documentation
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  Guides
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  Support
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Company
              </Typography>
              <Stack spacing={1}>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  About Us
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  Careers
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  Blog
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  Contact
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Legal
              </Typography>
              <Stack spacing={1}>
                <Button
                  color="inherit"
                  sx={{ justifyContent: 'flex-start', p: 0 }}
                  onClick={() => handleNavigate('https://github.com/earmuff-jam/fluffy?tab=coc-ov-file')}
                >
                  Privacy
                </Button>
                <Button
                  color="inherit"
                  sx={{ justifyContent: 'flex-start', p: 0 }}
                  onClick={() => handleNavigate('https://github.com/earmuff-jam/fluffy?tab=coc-ov-file')}
                >
                  Terms
                </Button>
                <Button
                  color="inherit"
                  sx={{ justifyContent: 'flex-start', p: 0 }}
                  onClick={() => handleNavigate('https://github.com/earmuff-jam/fluffy?tab=coc-ov-file')}
                >
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

export default Footer;
