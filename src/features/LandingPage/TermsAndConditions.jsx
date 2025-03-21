import {
  Typography,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Footer from '@features/LandingPage/Footer';

const TermsAndConditions = () => {
  const theme = useTheme();
  const smallFormFactor = useMediaQuery(theme.breakpoints.down('sm'));
  const lastUpdated = 'March 15, 2025';

  const termsSections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing or using the application and services, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
      
      These Terms constitute a legally binding agreement between you and Earmuffjam Inc. regarding your use of the application and services.`,
    },
    {
      title: 'Use License',
      content: `Subject to your compliance with these Terms, Earmuffjam LLC grants you a limited, non-exclusive, non-transferable, revocable license to access and use the application and services for your personal, non-commercial use.
      
      You may not:
      • Modify or copy the materials
      • Use the materials for any commercial purpose
      • Attempt to decompile or reverse engineer any software contained in the application
      • Remove any copyright or other proprietary notations from the materials
      • Transfer the materials to another person or "mirror" the materials on any other server
      
      This license shall automatically terminate if you violate any of these restrictions and may be terminated by Earmuffjam LLC at any time.`,
    },
    {
      title: 'Account Registration',
      content: `To use certain features of the application, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
      
      You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
      
      We reserve the right to disable any user account at any time in our sole discretion for any or no reason, including if we believe that you have violated these Terms and Conditions.`,
    },
    {
      title: 'User Content',
      content: `Our application may allow you to upload, submit, store, send, or receive content. You retain ownership of any intellectual property rights that you hold in that content.
      
      By uploading content to our application, you grant Earmuffjam LLC a worldwide, royalty-free, non-exclusive license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display, and distribute such content.
      
      You are solely responsible for the content you upload and the consequences of sharing it.`,
    },
    {
      title: 'Prohibited Uses',
      content: `You agree not to use the application or services:
      
      • In any way that violates any applicable federal, state, local, or international law or regulation
      • To exploit, harm, or attempt to exploit or harm minors in any way
      • To transmit any material that is defamatory, obscene, offensive, or otherwise objectionable
      • To impersonate or attempt to impersonate Earmuffjam LLC, an employee, another user, or any other person or entity
      • To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the service
      • To interfere with the proper working of the service
      • To attempt to gain unauthorized access to any part of the application`,
    },
    {
      title: 'Intellectual Property',
      content: `The application and its original content, features, and functionality are and will remain the exclusive property of Earmuffjam LLC and its licensors. The application is protected by copyright, trademark, and other laws of both the United States and foreign countries.
      
      Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Earmuffjam LLC`,
    },
    {
      title: 'Disclaimer of Warranties',
      content: `The application and all information, content, materials, products, and services included on or otherwise made available to you through the application are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied.
      
      Earmuffjam LLC disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
      
      Earmuffjam LLC does not warrant that the application will be uninterrupted or error-free, that defects will be corrected, or that the application or the server that makes it available are free of viruses or other harmful components.`,
    },
    {
      title: 'Limitation of Liability',
      content: `In no event shall Earmuffjam LLC, its officers, directors, employees, or agents, be liable to you for any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any:
      
      • Errors, mistakes, or inaccuracies of content
      • Personal injury or property damage of any nature whatsoever
      • Unauthorized access to or use of our secure servers and/or any personal information stored therein
      • Interruption or cessation of transmission to or from the application
      • Bugs, viruses, or the like which may be transmitted by third parties
      • Errors or omissions in any content or for any loss or damage of any kind incurred as a result of your use of any content
      
      Whether based on warranty, contract, tort, or any other legal theory, and whether or not we are advised of the possibility of such damages.`,
    },
    {
      title: 'Indemnification',
      content: `You agree to defend, indemnify, and hold harmless Earmuffjam LLC, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the application.`,
    },
    {
      title: 'Governing Law',
      content: `These Terms shall be governed and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.
      
      Any dispute arising from or relating to the subject matter of these Terms shall be finally settled by arbitration in New York, New York, using the English language in accordance with the Arbitration Rules and Procedures of the Judicial Arbitration and Mediation Services, Inc. (JAMS) then in effect, by one commercial arbitrator with substantial experience in resolving intellectual property and commercial contract disputes.`,
    },
    {
      title: 'Termination',
      content: `We may terminate or suspend your account and bar access to the application immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
      
      If you wish to terminate your account, you may simply discontinue using the application or contact us to delete your account.
      
      All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`,
    },
    {
      title: 'Changes to Terms',
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last Updated" date.
      
      Your continued use of the application after any such changes constitutes your acceptance of the new Terms. Please review these Terms periodically for changes.`,
    },
  ];

  return (
    <Stack spacing={6} sx={{ p: 3 }} id="terms-conditions">
      {/* Header Section */}
      <Stack alignItems="center">
        <Stack spacing={2} alignItems="center" sx={{ maxWidth: 'md' }}>
          <Typography variant={smallFormFactor ? 'h3' : 'h2'} component="h1" fontWeight="bold" textAlign="center">
            Terms and Conditions
          </Typography>

          <Typography variant="h6" component="p" sx={{ opacity: 0.8 }} textAlign="center">
            Please read these terms carefully before using our services
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
            Welcome to Asset Manager. The following Terms and Conditions govern your access to and use of the Asset
            Manager application, website, and services. By accessing or using our services, you agree to be bound by
            these Terms.
          </Typography>
          <Typography variant="body1" paragraph>
            If you do not agree to these Terms, please do not use our services. Your continued use of the application
            constitutes your acceptance of and agreement to be bound by these Terms and Conditions.
          </Typography>
        </Stack>
      </Stack>

      {/* Terms Content Sections */}
      <Stack spacing={2} alignItems="center">
        <Stack spacing={2} sx={{ maxWidth: 'md', width: '100%' }}>
          {termsSections.map((section, index) => (
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

      {/* Agreement Section */}
      <Stack spacing={4} alignItems="center">
        <Stack
          spacing={2}
          alignItems="center"
          sx={{ maxWidth: 'sm', width: '100%', py: 2, px: 3, bgcolor: 'background.paper', borderRadius: 2 }}
        >
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            By Using Our Services, You Confirm That:
          </Typography>
          <Typography variant="body1" paragraph textAlign="center">
            You have read, understood, and agree to be bound by these Terms and Conditions, and you are at least 18
            years of age.
          </Typography>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default TermsAndConditions;
