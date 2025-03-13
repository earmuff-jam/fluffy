import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';

import { MenuOutlined } from '@mui/icons-material';

import AppToolbarActionButtons from '@features/Layout/AppToolbarActionButtons';

export default function AppToolbar({ profileDetails, handleDrawerOpen }) {
  return (
    <AppBar elevation={0}>
      <Toolbar sx={{ backgroundColor: 'accentColor.default' }}>
        <IconButton size="medium" onClick={handleDrawerOpen}>
          <MenuOutlined fontSize="medium" />
        </IconButton>
        <Stack flexGrow={1} direction="row" alignItems="center">
          <Typography variant="h4" color="text.secondary" sx={{ cursor: 'pointer' }}>
            Fleetwise
          </Typography>
        </Stack>
        <AppToolbarActionButtons profileDetails={profileDetails} />
      </Toolbar>
    </AppBar>
  );
}
