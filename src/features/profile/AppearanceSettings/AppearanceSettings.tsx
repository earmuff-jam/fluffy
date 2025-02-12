import * as React from "react";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { DarkModeRounded, GridViewRounded } from "@mui/icons-material";

import dayjs from "dayjs";
import CustomSnackbar from "@utils/Snackbar";
import { SnackbarContent } from "@utils/types";
import { UserDemographicsType } from "@features/profile/types";

interface IAppearanceSettingsProps {
  loading: Boolean;
  profileDetails: UserDemographicsType;
}

const AppearanceSettings: React.FunctionComponent<IAppearanceSettingsProps> = ({
  loading,
  profileDetails = {
    id: "",
    username: "",
    full_name: "",
    email_address: "",
    phone_number: "",
    about_me: "",
    online_status: false,
    is_dark_theme: false,
    is_inventory_layout: false,
    created_at: "",
    updated_at: "",
  },
}) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [isInventoryLayout, setIsInventoryLayout] = React.useState(false); // false is list view
  const [snackbarContent, setSnackbarContent] = React.useState<SnackbarContent>(
    {
      open: false,
      message: null,
      severity: "success",
    }
  );

  const handleSubmit = () => {
    const draftData = {
      ...profileDetails,
      appearance: isDarkTheme,
      grid_view: isInventoryLayout,
      updated_at: dayjs().toISOString(),
    };
    // dispatch(profileActions.updateProfileDetails({ draftData }));
    setSnackbarContent({
      open: true,
      message: "Successfully updated profile details.",
      severity: "success",
    });
  };

  React.useEffect(() => {
    if (!loading) {
      setIsDarkTheme(profileDetails.is_dark_theme ?? false);
      setIsInventoryLayout(profileDetails.is_inventory_layout ?? false);
    }
  }, [loading]);

  if (loading) {
    return <Skeleton height="10rem" />;
  }
  return (
    <>
      <Box sx={{ pb: 2 }}>
        <Typography variant="h4" color="text.secondary" gutterBottom>
          Appearance Settings
        </Typography>
        <Typography variant="caption" gutterBottom>
          Change the look and feel of the application.
        </Typography>
        <Divider />
      </Box>
      <Stack spacing={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isDarkTheme}
              onChange={() => setIsDarkTheme(!isDarkTheme)}
              color="primary"
            />
          }
          label={
            <Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <DarkModeRounded
                  color={isDarkTheme ? "primary" : "secondary"}
                />
                <Typography variant="caption">Enable dark mode</Typography>
              </Stack>
              <Typography variant="caption" gutterBottom>
                Switch to dark mode.
              </Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isInventoryLayout}
              onChange={() => setIsInventoryLayout(!isInventoryLayout)}
              color="primary"
            />
          }
          label={
            <Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <GridViewRounded color="primary" />
                <Typography variant="caption">
                  Enable grid mode for assets
                </Typography>
              </Stack>
              <Typography variant="caption" gutterBottom>
                Switch between list view and grid view for viewing assets.
              </Typography>
            </Stack>
          }
        />
      </Stack>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
      <CustomSnackbar
        open={snackbarContent.open}
        message={snackbarContent.message}
        severity={snackbarContent.severity}
        handleClose={() =>
          setSnackbarContent({
            open: false,
            severity: "success",
            message: null,
          })
        }
      />
    </>
  );
};

export default AppearanceSettings;
