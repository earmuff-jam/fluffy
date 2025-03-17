import UserStatus from './UserStatus';

export default {
  title: 'Profile/UserStatus',
  component: UserStatus,
  tags: ['autodocs'],
};

const Template = (args) => <UserStatus {...args} />;

export const UserStatusDefault = Template.bind({});
export const UserStatusLoading = Template.bind({});
export const UserStatusSmallScreen = Template.bind({});

UserStatusDefault.args = {
  smallFormFactor: false,
  isProfileStatsLoading: false,
  profileStats: {
    totalCategories: 1,
    totalMaintenancePlans: 2,
    totalAssets: 27,
  },
};

UserStatusLoading.args = {
  smallFormFactor: false,
  isProfileStatsLoading: true,
  profileStats: {
    totalCategories: 1,
    totalMaintenancePlans: 2,
    totalAssets: 27,
  },
};

UserStatusSmallScreen.args = {
  smallFormFactor: true,
  isProfileStatsLoading: false,
  profileStats: {
    totalCategories: 1,
    totalMaintenancePlans: 2,
    totalAssets: 27,
  },
};
