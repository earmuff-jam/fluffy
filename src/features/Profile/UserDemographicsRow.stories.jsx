import { Typography } from "@mui/material";
import UserDemographicsRow from "./UserDemographicsRow";

export default {
  title: 'Profile/UserDemographicsRow',
  component: UserDemographicsRow,
  tags: ['autodocs'],
};

const Template = (args) => <UserDemographicsRow {...args} />;

export const UserDemographicsRowDefault = Template.bind({});

UserDemographicsRowDefault.args = {
  children: (
    <>
      <Typography variant="subtitle2" color="text.secondary">
        Username
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        xxKittenxx
      </Typography>
    </>
  ),
};
