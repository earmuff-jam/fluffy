import { Button, Container, Card, CardContent, TextField, Grid, Typography, Box } from '@mui/material';

export default function EmailSection() {
  return (
    <Box id="contacts-section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Card sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h3" component="h2" gutterBottom>
              Ready to Transform Your Asset Management?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
              Join thousands of companies that trust us for their asset management needs.
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
  );
}
