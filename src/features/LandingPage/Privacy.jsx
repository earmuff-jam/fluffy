import React from 'react';
import {
  Typography,
  Paper,
  Divider,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '@features/LandingPage/Footer';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const smallFormFactor = useMediaQuery(theme.breakpoints.down('sm'));
  const lastUpdated = 'March 15, 2025';

  const privacySections = [
    {
      title: 'Information We Collect',
      content: `We collect information you provide directly to us when you create an account, use our services, or communicate with us. This may include your name, email address, phone number, financial information, and transaction data.
      
      We also automatically collect certain information when you use our services, including log data, device information, location information, and cookies.`,
    },
    {
      title: 'How We Use Your Information',
      content: `We use your information to provide, maintain, and improve our services, process transactions, send communications, and protect our services.
      
      We may also use your information to personalize your experience, develop new services, and for marketing and analytical purposes.`,
    },
    {
      title: 'Information Sharing and Disclosure',
      content: `We may share your information with:
      
      • Service providers that perform services on our behalf
      • Financial institutions to facilitate transactions
      • Professional advisors such as lawyers and accountants
      • In response to legal process or to comply with laws
      • In connection with a merger, sale, or acquisition`,
    },
    {
      title: 'Data Security',
      content: `We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
      
      We use encryption protocols, secure databases, and regular security audits to maintain the safety of your data.`,
    },
    {
      title: 'Your Privacy Rights',
      content: `Depending on your location, you may have certain rights regarding your personal information, such as:
      
      • Access to your personal information
      • Correction of inaccurate information
      • Deletion of your personal information
      • Restriction of processing
      • Data portability
      • Objection to processing
      
      To exercise these rights, please contact us at privacy@assetmanagerapp.com.`,
    },
    {
      title: 'Cookies and Tracking Technologies',
      content: `We use cookies and similar tracking technologies to track activity on our services and to hold certain information.
      
      You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features may not function properly without cookies.`,
    },
    {
      title: "Children's Privacy",
      content: `Our services are not intended for individuals under the age of 18, and we do not knowingly collect personal information from children.
      
      If we learn we have collected personal information from a child under 18, we will delete that information as quickly as possible.`,
    },
    {
      title: 'International Data Transfers',
      content: `Your information may be transferred to, and maintained on, computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ.
      
      We ensure appropriate safeguards are in place to protect your information when transferred internationally.`,
    },
    {
      title: 'Changes to This Privacy Policy',
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
      
      You are advised to review this Privacy Policy periodically for any changes.`,
    },
    {
      title: 'Contact Us',
      content: `If you have any questions about this Privacy Policy, please contact us at:
      
      privacy@assetmanagerapp.com
      Asset Manager Inc.
      123 Finance Street
      New York, NY 10001`,
    },
  ];

  return (
    <Stack spacing={6} sx={{ p: 3 }} id="privacy-policy">
      {/* Header Section */}
      <Stack alignItems="center">
        <Stack spacing={2} alignItems="center" sx={{ maxWidth: 'md' }}>
          <Typography variant={smallFormFactor ? 'h3' : 'h2'} component="h1" fontWeight="bold" textAlign="center">
            Privacy Policy
          </Typography>

          <Typography variant="h6" component="p" sx={{ opacity: 0.8 }} textAlign="center">
            We're committed to protecting your privacy and personal data
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
              Last updated: <strong>{lastUpdated}</strong>
            </Typography>
          </Paper>
        </Stack>
      </Stack>

      {/* Introduction Section */}
      <Stack spacing={3} alignItems="center">
        <Stack spacing={2} sx={{ maxWidth: 'md', width: '100%' }}>
          <Typography variant="body1" paragraph>
            This Privacy Policy describes how Asset Manager ("we", "our", or "us") collects, uses, and discloses your
            information when you use our website, mobile application, and other online products and services
            (collectively, the "Services").
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using our Services, you agree to this Privacy Policy. If you do not agree with our policies
            and practices, please do not use our Services.
          </Typography>
        </Stack>
      </Stack>

      {/* Policy Content Sections */}
      <Stack spacing={2} alignItems="center">
        <Stack spacing={2} sx={{ maxWidth: 'md', width: '100%' }}>
          {privacySections.map((section, index) => (
            <Accordion key={index} defaultExpanded={index === 0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6" fontWeight="medium">
                  {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-line' }}>
                  {section.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Stack>

      {/* Contact and Actions Section */}
      <Stack spacing={4} alignItems="center">
        <Stack spacing={2} alignItems="center" sx={{ maxWidth: 'sm', width: '100%' }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Questions About Our Privacy Practices?
          </Typography>
          <Typography variant="body1" textAlign="center">
            If you have any questions or concerns about our privacy practices, please contact us.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => (window.location.href = 'mailto:earmuffjam@gmail.com')}
            >
              Email Privacy Team
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Footer />
    </Stack>
  );
};

export default Privacy;
