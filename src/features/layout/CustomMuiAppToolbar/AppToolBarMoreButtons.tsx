import * as React from 'react';

import { ArrowDropDownCircleRounded, DarkModeOutlined, LightModeOutlined, LogoutRounded } from '@mui/icons-material';

import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Stack,
    Typography,
} from '@mui/material';

import { useLocation, useParams } from 'react-router-dom';
import { UserDemographicsType } from '@features/profile/types';
import { setTour } from '@utils/utility';

interface IAppToolbarMoreButtonsProps {
    profileDetails: UserDemographicsType,
}

const AppToolbarMoreButtons: React.FunctionComponent<IAppToolbarMoreButtonsProps> = ({ profileDetails }) => {
    const { id } = useParams();
    const location = useLocation();

    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    const handleSetTour = () => {
        setTour(id, location.pathname);
    }

    const handleLogout = () => {
        //   dispatch(authActions.getLogout());
        localStorage.clear();
        window.location.href = '/';
    };

    const handleAppearance = () => {
        const draftData = { ...profileDetails, appearance: !profileDetails.appearance || false };
        //   dispatch(profileActions.updateProfileDetails({ draftData }));
    };

    const DEFAULT_MENU_OPTIONS = [
        {
            id: 1,
            label: 'Log off',
            icon: <LogoutRounded color="primary" />,
            action: handleLogout,
        },
        {
            id: 2,
            label: 'Change appearance',
            icon: profileDetails?.appearance ? (
                <LightModeOutlined sx={{ color: 'text.secondary' }} fontSize="small" />
            ) : (
                <DarkModeOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
            ),
            action: handleAppearance,
        },
    ];

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (ev: MouseEvent | TouchEvent): void => {
        if (anchorRef.current && anchorRef.current.contains(ev.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="Button group with a nested menu"
                data-tour="overview-6"
            >
                <Button onClick={handleSetTour}>Help</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownCircleRounded />
                </Button>
            </ButtonGroup>
            <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {DEFAULT_MENU_OPTIONS.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            onClick={() => {
                                                option.action();
                                                handleToggle();
                                            }}
                                        >
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                {option.icon}
                                                <Typography variant="caption">{option.label}</Typography>
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default AppToolbarMoreButtons;
