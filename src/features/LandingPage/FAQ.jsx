import { useState } from 'react';

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Container,
  Divider,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { SearchRounded, ExpandMoreRounded, HelpOutlineRounded } from '@mui/icons-material';

import { FAQData } from '@features/LandingPage/constants';

import { useFilteredFaqs } from '@features/LandingPage/hooks';

const getCategories = (faqs) => ['All', ...new Set(faqs.map((faq) => faq.category))];

// FAQ Component
const FAQComponent = () => {
  const theme = useTheme();
  const smallFormFactor = useMediaQuery(theme.breakpoints.down('sm'));

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = getCategories(FAQData);
  const filteredFaqs = useFilteredFaqs(FAQData, searchQuery, selectedCategory);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setExpandedPanel(null); // Close all panels when search changes
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setExpandedPanel(null); // Close all panels when category changes
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <HelpOutlineRounded sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Frequently Asked Questions
          </Typography>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              color={selectedCategory === category ? 'primary' : 'default'}
              onClick={() => handleCategoryChange(category)}
              sx={{ mb: 1 }}
            />
          ))}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expandedPanel === faq.id}
              onChange={handleAccordionChange(faq.id)}
              sx={{
                mb: 2,
                '&:before': { display: 'none' },
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                '&.Mui-expanded': {
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreRounded />}
                aria-controls={`faq-${faq.id}-content`}
                id={`faq-${faq.id}-header`}
                sx={{
                  backgroundColor: theme.palette.background.default,
                  '&.Mui-expanded': {
                    minHeight: 64,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: smallFormFactor ? 'column' : 'row',
                    alignItems: smallFormFactor ? 'flex-start' : 'center',
                    width: '100%',
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'medium', flexGrow: 1 }}>
                    {faq.question}
                  </Typography>
                  {!smallFormFactor && (
                    <Chip
                      label={faq.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ ml: 2, minWidth: 80, textAlign: 'center' }}
                    />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 1, pb: 3, px: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No FAQs found matching your search criteria.
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default FAQComponent;
