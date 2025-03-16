import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserDemographics from './UserDemographics';

export default {
  title: 'Profile/UserDemographics',
  component: UserDemographics,
  tags: ['autodocs'],
};

const queryClient = new QueryClient();

const Template = (args) => (
  <QueryClientProvider client={queryClient}>
    <UserDemographics {...args} />
  </QueryClientProvider>
);

export const UserDemographicsDefault = Template.bind({});
export const UserDemographicsLongName = Template.bind({});

UserDemographicsDefault.args = {
  data: {
    id: '96cf5b68-fcda-422c-8d61-8f638e2803a5',
    username: 'xxKittenxx',
    firstName: 'Mary',
    lastName: 'Cross',
    emailAddress: 'mary_doe@gmail.com',
    phoneNumber: '1234567890',
    aboutMe: '',
    isOnline: false,
    appearance: false,
    createdAt: '0001-01-01T00:00:00Z',
    updatedAt: '2024-11-24T01:24:30.874189Z',
  },
  handleEditMode: () => {},
};

UserDemographicsLongName.args = {
  data: {
    id: '96cf5b68-fcda-422c-8d61-8f638e2803a5',
    username: 'This is a really long user name screening test. ',
    firstName: 'Mary',
    lastName: 'Cross',
    emailAddress: 'mary_doe@gmail.com',
    phoneNumber: '1234567890',
    aboutMe: '',
    isOnline: false,
    appearance: false,
    createdAt: '0001-01-01T00:00:00Z',
    updatedAt: '2024-11-24T01:24:30.874189Z',
  },
  handleEditMode: () => {},
};
