import RecentActivityAccordionSummary from './RecentActivityAccordionSummary';

export default {
  title: 'RecentActivities/RecentActivityAccordionSummary',
  component: RecentActivityAccordionSummary,
  tags: ['autodocs'],
};

const Template = (args) => <RecentActivityAccordionSummary {...args} />;

export const RecentActivityAccordionSummaryDefault = Template.bind({});
export const RecentActivityAccordionSummaryCategory = Template.bind({});
export const RecentActivityAccordionSummaryAssetDefault = Template.bind({});

RecentActivityAccordionSummaryDefault.args = {
  title: 'Warranty Support Plan',
  label: 'Updated',
  prefix: 'Maintenance Plan Item',
};

RecentActivityAccordionSummaryCategory.args = {
  title: 'Groceries',
  label: 'Created',
  prefix: 'Category Item',
};

RecentActivityAccordionSummaryAssetDefault.args = {
  title: 'Sugar',
  label: 'Created',
  prefix: 'Asset Item',
};
