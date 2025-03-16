import ReportsFilterMenu from './ReportsFilterMenu';
import { FILTER_OPTIONS } from '@features/Reports/constants';

export default {
  title: 'Reports/ReportsFilterMenu',
  component: ReportsFilterMenu,
  tags: ['autodocs'],
};

const Template = (args) => <ReportsFilterMenu {...args} />;

export const ReportsFilterMenuDefault = Template.bind({});
export const ReportsFilterMenuExcludeOverdueAssets = Template.bind({});

ReportsFilterMenuDefault.args = {
  applyFilter: () => {},
  sinceValue: FILTER_OPTIONS.find((item) => item.label === 'ytd').value,
  setSinceValue: () => {},
  includeOverdue: true,
  setIncludeOverdue: () => {},
};

ReportsFilterMenuExcludeOverdueAssets.args = {
  applyFilter: () => {},
  sinceValue: FILTER_OPTIONS.find((item) => item.label === 'ytd').value,
  setSinceValue: () => {},
  includeOverdue: false,
  setIncludeOverdue: () => {},
};
