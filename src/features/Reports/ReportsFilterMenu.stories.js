import dayjs from 'dayjs';

import ReportsFilterMenu from '@features/Reports/ReportsFilterMenu';

export default {
  title: 'Reports/ReportsFilterMenu',
  component: ReportsFilterMenu,
  tags: ['autodocs'],
};

const Template = (args) => <ReportsFilterMenu {...args} />;

export const ReportsFilterMenuDefault = Template.bind({});

ReportsFilterMenuDefault.args = {
  applyFilter: () => {},
  sinceValue: dayjs().toISOString(),
  setSinceValue: () => {},
  includeOverdue: true,
  setIncludeOverdue: () => {},
};
