import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Paper, Stack, useMediaQuery } from "@mui/material";

import type {
  ProfileStatsType,
  UserDemographicsType,
} from "@features/profile/types";

import SimpleModal from "@utils/SimpleModal";
import UserStatus from "@features/profile/UserStatus/UserStatus";
import ProfileForm from "@features/profile/ProfileForm/ProfileForm";
import UserDetails from "@features/profile/UserDetails/UserDetails";
import UserDemographics from "@features/profile/UserDemographics/UserDemographics";
import AppearanceSettings from "@features/profile/AppearanceSettings/AppearanceSettings";

const Profile: React.FunctionComponent = () => {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const profileDetails: UserDemographicsType = {
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
  };
  const profileStats: ProfileStatsType = {
    totalAssets: 0,
    totalCategories: 0,
    totalMaintenancePlans: 0,
  };
  const loading = false;

  const [editMode, setEditMode] = React.useState(false);

  return (
    <Stack spacing={2} data-tour="profile-0">
      <Stack direction={onlySmallScreen ? "column" : "row"} spacing={1}>
        <UserDemographics
          data={profileDetails}
          handleEditMode={() => setEditMode(!editMode)}
        />
        <UserDetails data={profileDetails} />
      </Stack>
      <Paper sx={{ padding: "1rem" }} data-tour="profile-5">
        <UserStatus
          profileStats={profileStats}
          onlySmallScreen={onlySmallScreen}
        />
      </Paper>
      <Paper sx={{ padding: "1rem" }} data-tour="profile-6">
        <AppearanceSettings loading={loading} profileDetails={profileDetails} />
      </Paper>
      {editMode && (
        <SimpleModal
          handleClose={() => setEditMode(false)}
          maxSize={"xs"}
          title="Edit profile details"
          subtitle="Edit general details about yourself so others can notice you."
        >
          <ProfileForm />
        </SimpleModal>
      )}
    </Stack>
  );
};

export default Profile;
