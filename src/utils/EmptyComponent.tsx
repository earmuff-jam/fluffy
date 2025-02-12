import { Stack, Typography } from '@mui/material';
import * as React from 'react';

interface IEmptyComponentProps {
    subtitle?: string;
    padding?: string;
}

const EmptyComponent: React.FunctionComponent<IEmptyComponentProps> = ({ subtitle = '', padding = '0rem 0rem' }) => {
    return (
        <Stack alignItems="center" sx={{ padding: padding }}>
            <Typography color="textSecondary">Sorry, no matching records found.</Typography>
            <Typography variant="caption" color="textSecondary">
                {subtitle}
            </Typography>
        </Stack>
    );
};

export default EmptyComponent;
