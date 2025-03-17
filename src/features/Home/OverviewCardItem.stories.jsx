import { CategoryRounded } from '@mui/icons-material';
import OverviewCardItem from './OverviewCardItem';

export default {
  title: 'Home/OverviewCardItem',
  component: OverviewCardItem,
  tags: ['autodocs'],
};

const Template = (args) => <OverviewCardItem {...args} />;

export const OverviewCardItemDefault = Template.bind({});
export const OverviewCardItemTooltipTitle = Template.bind({});

OverviewCardItemDefault.args = {
  dataLabel: 12,
  icon: <CategoryRounded />,
  label: 'assigned categories',
  color: 'Test',
};

OverviewCardItemTooltipTitle.args = {
  tooltipTitle: 'Assigned categories tooltip title',
  dataLabel: 2,
  icon: <CategoryRounded />,
  label: 'assigned categories',
  color: 'Red',
};
