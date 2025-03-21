import { useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  Paper,
  Typography,
  Button,
  Divider,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';

import Footer from '@features/LandingPage/Footer';
import { PricingPlans } from '@features/LandingPage/constants';

const Pricing = () => {
  const theme = useTheme();
  const smallFormFactor = useMediaQuery(theme.breakpoints.down('sm'));

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
    <Stack spacing={6} sx={{ p: 3 }} id="pricing-details">
      {/* Header Section */}
      <Stack alignItems="center">
        <Stack spacing={2} alignItems="center" sx={{ maxWidth: 'md' }}>
          <Typography variant={smallFormFactor ? 'h3' : 'h2'} component="h1" fontWeight="bold" textAlign="center">
            Choose the Right Plan for Your Needs
          </Typography>

          <Typography variant="h6" component="p" sx={{ opacity: 0.8 }} textAlign="center">
            Transparent pricing with no hidden fees. Scale your asset management as your portfolio grows.
          </Typography>

          <Paper
            elevation={0}
            sx={{
              py: 1.5,
              px: 3,
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 5,
            }}
          >
            <Typography variant="body2">
              All plans include a <strong>14-day free trial</strong> with no credit card required
            </Typography>
          </Paper>
        </Stack>
      </Stack>

      {/* Billing Toggle Section */}
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          value="monthly"
          onClick={handleBillingChange}
          variant={billingCycle === 'monthly' ? 'contained' : 'outlined'}
          size="small"
        >
          Monthly
        </Button>
        <Button
          value="sixMonth"
          onClick={handleBillingChange}
          variant={billingCycle === 'sixMonth' ? 'contained' : 'outlined'}
          size="small"
        >
          6 Months
        </Button>
        <Button
          value="yearly"
          onClick={handleBillingChange}
          variant={billingCycle === 'yearly' ? 'contained' : 'outlined'}
          size="small"
        >
          Yearly
        </Button>
      </Stack>

      {/* Pricing Cards */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        justifyContent="center"
        alignItems="stretch"
        sx={{ width: '100%' }}
      >
        {PricingPlans.map((plan, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' },
              display: 'flex',
            }}
          >
            <Card
              elevation={plan.popular ? 8 : 2}
              sx={{
                width: '100%',
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

              {/* Card Content as Stack */}
              <Stack sx={{ height: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={3}>
                    <Typography variant="h5" component="div" align="center" fontWeight="bold">
                      {plan.title}
                    </Typography>

                    <Stack alignItems="center" spacing={1}>
                      <Stack direction="row" alignItems="baseline" justifyContent="center">
                        <Typography variant="h3" component="span" fontWeight="bold">
                          ${getPrice(plan)}
                        </Typography>
                        <Typography variant="subtitle1" component="span" sx={{ ml: 1 }}>
                          {getBillingText()}
                        </Typography>
                      </Stack>

                      {getSavingsText(plan) && <Chip label={getSavingsText(plan)} color="success" size="small" />}
                    </Stack>

                    <Divider />

                    <Stack spacing={2}>
                      {plan.features.map((feature, featureIndex) => (
                        <Stack direction="row" alignItems="center" key={featureIndex}>
                          <CheckIcon sx={{ mr: 1, color: plan.color }} />
                          <Typography variant="body2">{feature}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </CardContent>

                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled
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
              </Stack>
            </Card>
          </Box>
        ))}
      </Stack>
      <Footer />
    </Stack>
  );
};

export default Pricing;
