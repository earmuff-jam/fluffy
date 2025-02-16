import * as React from 'react';

import { AllInboxRounded, BookmarkRounded, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, useTheme } from '@mui/material';
import MenuActionBarTitle from '@features/layout/MenuActionBar/MenuActionBarTitle';
import { MENU_ACTION_BAR_DEFAULT_LIST, PINNED_DEFAULT_INSET_MENU_LIST } from '@features/layout/constants';
import { MenuActionBarListType } from '@features/layout/types';
import MenuActionBarListItem from '@features/layout/MenuActionBar/MenuActionBarListItem';
import { useLocation, useNavigate } from 'react-router-dom';


interface IMenuActionBarProps {
  openDrawer: boolean;
  handleDrawerClose: () => void;
  smScreenSizeAndHigher: boolean;
  lgScreenSizeAndHigher: boolean;
}


const MenuActionBar: React.FunctionComponent<IMenuActionBarProps> = ({
  openDrawer,
  handleDrawerClose,
  smScreenSizeAndHigher,
  lgScreenSizeAndHigher, }) => {

  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const favItems = [];
  const [openPinnedResources, setOpenPinnedResources] = React.useState<boolean>(true);

  // the timeout allows to close the drawer first before navigation occurs.
  // Without this, the drawer behaves weird.
  const handleMenuItemClick = (to: string) => {
    !lgScreenSizeAndHigher && handleDrawerClose();
    setTimeout(() => {
      navigate(to);
    }, 200);
  };

  const handlePinnedResourceClick = () => setOpenPinnedResources(!openPinnedResources);

  const formattedPinnedMenuItemList = favItems.map((v) => ({
    id: v.id,
    label: v.category_name || v.maintenance_plan_name,
    to: v.category_name ? `/category/${v.category_id}` : `/plan/${v.maintenance_plan_id}`,
    icon: <BookmarkRounded fontSize="small" color="warning" />,
  }));



  return (
    <Stack display="flex">
      <Drawer
        variant="persistent"
        open={openDrawer}
        onClose={handleDrawerClose}
        aria-modal="true"
        PaperProps={{
          sx: smScreenSizeAndHigher
            ? {
              width: 300,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
            }
            : { width: '100%' },
        }}
      >
        <MenuActionBarTitle theme={theme} handleDrawerClose={handleDrawerClose} />
        <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader" disablePadding>
          {MENU_ACTION_BAR_DEFAULT_LIST.map((item: MenuActionBarListType) => (
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
              {[...PINNED_DEFAULT_INSET_MENU_LIST, ...formattedPinnedMenuItemList].map((item) => (
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
};

export default MenuActionBar;
