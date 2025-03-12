import { Button, Container, Grid, Typography, Box, Divider, Stack } from '@mui/material';

import { BarChartRounded } from '@mui/icons-material';
import { FooterFields } from '@features/LandingPage/constants';

function Footer() {
  const handleNavigate = (url) => {
    window.location.href = url;
  };

  return (
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
              {FooterFields.product.map((item) => (
                <Button key={item.label} color={item.color} sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Resources
            </Typography>
            <Stack spacing={1}>
              {FooterFields.resources.map((item) => (
                <Button key={item.label} color={item.color} sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Company
            </Typography>
            <Stack spacing={1}>
              {FooterFields.company.map((item) => (
                <Button key={item.label} color={item.color} sx={{ justifyContent: 'flex-start', p: 0 }} disabled>
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Legal
            </Typography>
            <Stack spacing={1}>
              {FooterFields.legal.map((item) => (
                <Button
                  key={item.label}
                  color={item.color}
                  sx={{ justifyContent: 'flex-start', px: 1 }}
                  onClick={() => handleNavigate(item.link)}
                >
                  {item.label}
                </Button>
              ))}
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
  );
}

export default Footer;
