import * as React from 'react';

import { AccordionSummary, Chip, Stack, Typography } from '@mui/material';

import { ExpandMoreRounded } from '@mui/icons-material';

interface INoteAccordionSummaryProps {
    title: string,
    totalNotes: number,
    color: "primary" | "secondary" | "success" | "error" | "info" | "warning",
}

const NoteAccordionSummary: React.FunctionComponent<INoteAccordionSummaryProps> = ({ title, totalNotes, color }) => {
    return (
        <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1a-content" id="panel1a-header">
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                    {title}
                </Typography>
                <Chip label={totalNotes} size="small" color={color} />
            </Stack>
        </AccordionSummary>
    );
};

export default NoteAccordionSummary;
