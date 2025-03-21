import {
  MapRounded,
  ReceiptLongRounded,
  AccountBalanceWalletRounded,
  AnalyticsRounded,
  DevicesRounded,
  SecurityRounded,
  SpeedRounded,
} from '@mui/icons-material';

export const FAQData = [
  {
    id: 1,
    category: 'General',
    question: 'What is asset management?',
    answer:
      "Asset management is the systematic process of developing, operating, maintaining, and selling assets in a cost-effective manner. Our platform helps you track, manage, and optimize your organization's assets throughout their lifecycle.",
  },
  {
    id: 2,
    category: 'General',
    question: 'How do I get started with the platform?',
    answer:
      'To get started, log in to your account, navigate to the Dashboard, and use the "Add New Asset" button to begin tracking your first asset. You can also import assets in bulk using our Excel template.',
  },
  {
    id: 3,
    category: 'Account',
    question: 'How do I reset my password?',
    answer:
      'To reset your password, click on the "Forgot Password" link on the login page. You will receive an email with instructions to create a new password. If you don\'t receive the email, please check your spam folder or contact support.',
  },
  // {
  //   id: 4,
  //   category: 'Assets',
  //   question: 'How do I track depreciation for my assets?',
  //   answer: 'Our platform supports multiple depreciation methods including straight-line, declining balance, and sum-of-the-years-digits. Set up depreciation rules in Settings > Accounting, then apply them to assets individually or in bulk.'
  // },
  {
    id: 4,
    category: 'Assets',
    question: 'Can I export asset reports?',
    answer:
      'Yes, you can export comprehensive asset reports in Excel, and CSV. Go to Reports > Apply filters and click "Export".',
  },
  {
    id: 5,
    category: 'Maintenance',
    question: 'How do I schedule maintenance for my assets?',
    answer:
      'You can create maintenance plans and associate assets to it. Set the frequency, assign responsible personnel, and add reminders to ensure timely maintenance.',
  },
  {
    id: 6,
    category: 'Maintenance',
    question: 'Can I set up maintenance alerts?',
    answer:
      'Yes, you can configure automated alerts for upcoming and overdue maintenance. Navigate to Settings > Notifications to customize your alert preferences for email services.',
  },
  // {
  //   id: 7,
  //   category: 'Billing',
  //   question: 'How do I update my billing information?',
  //   answer: 'To update your billing information, go to Settings > Billing & Subscription. You can update your payment method, view invoices, and manage your subscription plan from this page.'
  // },
  // {
  //   id: 7,
  //   category: 'Billing',
  //   question: 'Can I upgrade or downgrade my plan?',
  //   answer: 'Yes, you can change your subscription plan at any time. Go to Settings > Billing & Subscription and select "Change Plan". Changes will take effect at the start of your next billing cycle.'
  // }
];

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
    { label: 'Privacy policy', color: 'inherit', link: '/privacy' },
    { label: 'Terms and Conditions', color: 'inherit', link: '/terms' },
  ],
};
