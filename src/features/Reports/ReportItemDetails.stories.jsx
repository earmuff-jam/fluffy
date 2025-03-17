import { Card } from '@mui/material';
import ReportItemDetails from './ReportItemDetails';

export default {
  title: 'Reports/ReportItemDetails',
  component: ReportItemDetails,
  tags: ['autodocs'],
};

const Template = (args) => (
  <Card sx={{ padding: 1 }}>
    <ReportItemDetails {...args} />
  </Card>
);

export const ReportItemDetailsDefault = Template.bind({});
export const ReportItemDetailsMaintenancePlan = Template.bind({});
export const ReportItemDetailsLoading = Template.bind({});

ReportItemDetailsDefault.args = {
  loading: false,
  avatarValue: 'DF',
  label: 'Dog lease',
  caption: 'Dog lease bought for dog walking',
};

ReportItemDetailsMaintenancePlan.args = {
  loading: false,
  avatarValue: 'WP',
  label: 'Weekly maintenance plan',
  caption: 'Weekly maintenance plan',
};

ReportItemDetailsLoading.args = {
  loading: true,
  avatarValue: 'DF',
  label: 'Tick and flea medicine',
  caption: 'Tick and flea medicine for six months',
};
