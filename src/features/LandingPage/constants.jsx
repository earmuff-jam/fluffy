import {
  MapRounded,
  ReceiptLongRounded,
  AccountBalanceWalletRounded,
  AnalyticsRounded,
  DevicesRounded,
  SecurityRounded,
  SpeedRounded,
} from '@mui/icons-material';

export const PricingPlans = [
  {
    title: 'Basic',
    monthly: 12.99,
    sixMonth: 10.99,
    yearly: 8.99,
    features: ['Basic feature 1', 'Basic feature 2', 'Email support'],
    buttonText: 'Get Started',
    color: 'primary.light',
  },
  {
    title: 'Pro',
    monthly: 19.99,
    sixMonth: 17.99,
    yearly: 15.99,
    features: ['All Basic features', 'Pro feature 1', 'Pro feature 2', 'Priority support'],
    buttonText: 'Get Pro',
    color: 'primary.main',
    popular: true,
  },
];

export const BenefitsFields = [
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
];

export const FeatureFields = [
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
];

export const FooterFields = {
  product: [
    { label: 'Features', color: 'inherit' },
    { label: 'Pricing', color: 'inherit' },
    { label: 'Integrations', color: 'inherit' },
    { label: 'Updates', color: 'inherit' },
  ],
  resources: [
    { label: 'Documentation', color: 'inherit' },
    { label: 'Guides', color: 'inherit' },
    { label: 'Support', color: 'inherit' },
  ],
  company: [
    { label: 'About Us', color: 'inherit' },
    { label: 'Careers', color: 'inherit' },
    { label: 'Blog', color: 'inherit' },
    { label: 'Contact', color: 'inherit' },
  ],
  legal: [
    { label: 'Privacy', color: 'inherit', link: 'https://github.com/earmuff-jam/fluffy?tab=coc-ov-file' },
    { label: 'Terms', color: 'inherit', link: 'https://github.com/earmuff-jam/fluffy?tab=coc-ov-file' },
    { label: 'Security', color: 'inherit', link: 'https://github.com/earmuff-jam/fluffy?tab=coc-ov-file' },
  ],
};
