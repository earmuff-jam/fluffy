import * as React from 'react';
import { Card, CardContent } from '@mui/material';

interface IOverviewCardWrapperProps {
    children: React.ReactElement;
}

const OverviewCardWrapper: React.FunctionComponent<IOverviewCardWrapperProps> = ({ children }) => {
    return (
        <Card sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default OverviewCardWrapper;
