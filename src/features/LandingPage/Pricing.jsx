import { useState } from 'react';

import { Box, Card, CardContent, Typography, Button, Grid, Divider, Stack, Chip } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import { PricingPlans } from '@features/LandingPage/constants';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleBillingChange = (event) => {
    setBillingCycle(event.target.value);
  };

  const getPrice = (plan) => {
    switch (billingCycle) {
      case 'monthly':
        return plan.monthly;
      case 'sixMonth':
        return plan.sixMonth;
      case 'yearly':
        return plan.yearly;
      default:
        return plan.monthly;
    }
  };

  const getBillingText = () => {
    switch (billingCycle) {
      case 'monthly':
        return '/month';
      case 'sixMonth':
        return '/month, billed semi-annually';
      case 'yearly':
        return '/month, billed annually';
      default:
        return '/month';
    }
  };

  const getSavingsText = (plan) => {
    if (billingCycle === 'sixMonth') {
      const savings = (((plan.monthly - plan.sixMonth) / plan.monthly) * 100).toFixed(0);
      return `Save ${savings}%`;
    }
    if (billingCycle === 'yearly') {
      const savings = (((plan.monthly - plan.yearly) / plan.monthly) * 100).toFixed(0);
      return `Save ${savings}%`;
    }
    return null;
  };

  return (
    <Box sx={{ margin: '0 auto', p: 3 }} id="pricing-details">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 6,
        }}
      >
        <Button
          value="monthly"
          onClick={handleBillingChange}
          variant={billingCycle === 'monthly' ? 'contained' : 'outlined'}
          size="small"
          sx={{ mx: 1 }}
        >
          Monthly
        </Button>
        <Button
          value="sixMonth"
          onClick={handleBillingChange}
          variant={billingCycle === 'sixMonth' ? 'contained' : 'outlined'}
          size="small"
          sx={{ mx: 1 }}
        >
          6 Months
        </Button>
        <Button
          value="yearly"
          onClick={handleBillingChange}
          variant={billingCycle === 'yearly' ? 'contained' : 'outlined'}
          size="small"
          sx={{ mx: 1 }}
        >
          Yearly
        </Button>
      </Box>

      {/* Pricing Cards */}
      <Grid container spacing={3} justifyContent="center">
        {PricingPlans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={plan.popular ? 8 : 2}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: plan.popular ? 2 : 0,
                borderColor: 'primary.main',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              {plan.popular && (
                <Chip
                  label="Most Popular"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 24,
                    fontWeight: 'bold',
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom align="center" fontWeight="bold">
                  {plan.title}
                </Typography>

                <Box sx={{ my: 3, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
                    <Typography variant="h3" component="span" fontWeight="bold">
                      ${getPrice(plan)}
                    </Typography>
                    <Typography variant="subtitle1" component="span" sx={{ ml: 1 }}>
                      {getBillingText()}
                    </Typography>
                  </Box>

                  {getSavingsText(plan) && (
                    <Chip label={getSavingsText(plan)} color="success" size="small" sx={{ mt: 1 }} />
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                  {plan.features.map((feature, featureIndex) => (
                    <Box key={featureIndex} sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckIcon sx={{ mr: 1, color: plan.color }} />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>

              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    bgcolor: plan.color,
                    '&:hover': {
                      bgcolor: plan.color,
                      filter: 'brightness(0.9)',
                    },
                  }}
                >
                  {plan.buttonText}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Pricing;
