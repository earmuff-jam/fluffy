import * as React from 'react';

import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { pluralizeWord } from '@utils/utility';


interface IOverviewCardItemProps {
    tooltipTitle?: string;
    count: number;
    icon: React.ReactNode;
    label: string;
    color: string;
    word?: string;
    handleClick?: () => void;
}

const OverviewCardItem: React.FunctionComponent<IOverviewCardItemProps> = ({ tooltipTitle, count, icon, label, color, word = 'asset', handleClick }) => {
    return (
        <Tooltip title={tooltipTitle}>
            <Stack textAlign="center" onClick={handleClick} sx={{ cursor: handleClick ? 'pointer' : 'inherit' }}>
                <Typography variant="h3" color={color}>
                    {count}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="center">
                    <IconButton disabled size="small">
                        {icon}
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">
                        {pluralizeWord(word, count)}
                    </Typography>
                </Stack>
                <Typography variant="subtitle2" color="text.secondary">
                    {label}
                </Typography>
            </Stack>
        </Tooltip>
    );
};

export default OverviewCardItem;
