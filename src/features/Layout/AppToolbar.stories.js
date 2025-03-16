import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppToolbar from './AppToolbar';

export default {
  title: 'Layout/AppToolbar',
  component: AppToolbar,
  tags: ['autodocs'],
};

const queryClient = new QueryClient();

const Template = (args) => (
  <QueryClientProvider client={queryClient}>
    <AppToolbar {...args} />
  </QueryClientProvider>
);

export const AppToolbarDefault = Template.bind({});
export const AppToolbarDefaultSmallFormFactor = Template.bind({});

AppToolbarDefault.args = {
  profileDetails: {
    id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
    username: 'IngestSvcUser',
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'john_doe47@gmail.com',
    phoneNumber: '1234567890',
    aboutMe:
      'I am an architect with a passion for creating functional and aesthetically pleasing spaces that inspire and serve their purpose. My approach to design is rooted in meticulous planning and a deep appreciation for organization.',
    isOnline: false,
    appearance: false,
    createdAt: '0001-01-01T00:00:00Z',
    updatedAt: '2024-11-29T13:19:16.723254Z',
  },
  handleDrawerOpen: () => {},
  smScreenSizeAndHigher: false,
};

AppToolbarDefaultSmallFormFactor.args = {
  profileDetails: {
    id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
    username: 'IngestSvcUser',
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'john_doe47@gmail.com',
    phoneNumber: '1234567890',
    aboutMe:
      'I am an architect with a passion for creating functional and aesthetically pleasing spaces that inspire and serve their purpose. My approach to design is rooted in meticulous planning and a deep appreciation for organization.',
    isOnline: false,
    appearance: false,
    createdAt: '0001-01-01T00:00:00Z',
    updatedAt: '2024-11-29T13:19:16.723254Z',
  },
  handleDrawerOpen: () => {},
  smScreenSizeAndHigher: true,
};
