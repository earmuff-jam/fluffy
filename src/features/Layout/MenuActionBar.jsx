import { useState } from 'react';

import { useTheme } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  AllInboxRounded,
  BookmarkRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

import {
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import { useFetchFavouriteItems } from '@services/favouriteItemsApi';

import MenuActionBarListItem from '@features/Layout/MenuActionBarListItem';
import { NAVIGATION_MENU_LIST, PINNED_DEFAULT_INSET_MENU_LIST } from '@features/Layout/constants';

export default function MenuActionBar({
  openDrawer,
  createdByUserId,
  handleDrawerClose,
  greaterThanSmallFormFactor,
  greaterThanLargeFormFactor,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: favItems = [] } = useFetchFavouriteItems(createdByUserId);

  const [openPinnedResources, setOpenPinnedResources] = useState(true);

  // the timeout allows to close the drawer first before navigation occurs.
  // Without this, the drawer behaves weird.
  const handleMenuItemClick = (to) => {
    !greaterThanLargeFormFactor && handleDrawerClose();
    setTimeout(() => {
      navigate(to);
    }, 200);
  };

  const handlePinnedResourceClick = () => setOpenPinnedResources(!openPinnedResources);

  const formattedPinnedMenuItemList = favItems.map((item) => ({
    id: item.id,
    label: item?.categoryId?.name || item?.maintenancePlanId?.name,
    to: item?.categoryId ? `/category/${item.categoryId?.id}` : `/plan/${item.maintenancePlanId?.id}`,
    icon: <BookmarkRounded fontSize="small" color="warning" />,
  }));

  return (
    <Stack display="flex">
      <Drawer
        variant="persistent"
        open={openDrawer}
        onClose={handleDrawerClose}
        aria-modal="true"
        PaperProps={
          greaterThanSmallFormFactor
            ? {
                sx: {
                  width: 300,
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
                },
              }
            : {
                sx: {
                  width: '100%',
                },
              }
        }
      >
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem',
            backgroundColor: 'accentColor.default',
          }}
        >
          <Typography variant="h4">Fleetwise</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightRounded /> : <ChevronLeftRounded />}
          </IconButton>
        </Stack>
        <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader" disablePadding>
          {NAVIGATION_MENU_LIST.map((item) => (
            <MenuActionBarListItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              isSelected={pathname === item.to}
              handleClick={() => handleMenuItemClick(item.to)}
            />
          ))}

          <ListItemButton onClick={handlePinnedResourceClick}>
            <ListItemIcon>
              <AllInboxRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Pinned Resources" />
            {openPinnedResources ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </ListItemButton>

          <Collapse in={openPinnedResources} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {PINNED_DEFAULT_INSET_MENU_LIST.concat(formattedPinnedMenuItemList).map((item) => (
                <MenuActionBarListItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  rowReverse
                  isSelected={pathname === item.to}
                  handleClick={() => handleMenuItemClick(item.to)}
                />
              ))}
            </List>
          </Collapse>
        </List>
      </Drawer>
    </Stack>
  );
}
