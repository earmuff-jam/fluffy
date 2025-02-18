import * as React from 'react';

import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';

interface IReportCardWrapperProps {
  title?: string;
  chipLabel?: string;
  value?: string;
  footerText?: string;
  footerSuffix?: string;
  dataTour?: string;
  children?: React.ReactNode;
}

const ReportCardWrapper: React.FunctionComponent<IReportCardWrapperProps> = ({
  title,
  chipLabel,
  value,
  footerText,
  footerSuffix,
  dataTour,
  children,
}) => {
  return (
    <Card
      data-tour={dataTour}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0.2rem',
        width: { xs: '100%', sm: '100%' },
      }}
    >
      <CardContent>
        <Stack direction="row">
          <Stack flexGrow={1} sx={{ minWidth: '12rem', minHeight: '6rem' }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" component="h3">
                {title}
              </Typography>
              {chipLabel && <Chip label={chipLabel} variant="outlined" sx={{ borderRadius: '0.3rem' }} />}
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              {value && (
                <Typography variant="h1" flexWrap="wrap" color="text.secondary">
                  {value}
                </Typography>
              )}
            </Stack>
            {children}
          </Stack>
        </Stack>
      </CardContent>

      {footerText && (
        <Stack direction="row" spacing={0.3} paddingLeft={1}>
          <Typography variant="caption" color="text.secondary">
            {footerText}
          </Typography>
          <Typography variant="caption" component={'span'} color="success.main">
            {footerSuffix}
          </Typography>
        </Stack>
      )}
    </Card>
  );
};

export default ReportCardWrapper;
