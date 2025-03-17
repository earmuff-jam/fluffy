import RecentActivity from './RecentActivity';

export default {
  title: 'RecentActivities/RecentActivity',
  component: RecentActivity,
  tags: ['autodocs'],
};

const Template = (args) => <RecentActivity {...args} />;

export const RecentActivityDefault = Template.bind({});

RecentActivityDefault.args = {
  activity: {
    id: 'ea057b1f-358b-4fb9-821e-4dfc2f214307',
    name: 'Basic Equipment Checkup',
    status: 'Completed',
    createdAt: '2024-11-29T13:19:17.441061Z',
    createdBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
    updatedAt: '2024-11-29T13:19:17.441061Z',
    updatedBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
    collaborators: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
  },
};
