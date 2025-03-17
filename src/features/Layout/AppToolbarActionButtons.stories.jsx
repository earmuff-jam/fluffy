import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppToolbarActionButtons from './AppToolbarActionButtons';

export default {
  title: 'Layout/AppToolbarActionButtons',
  component: AppToolbarActionButtons,
  tags: ['autodocs'],
};

const queryClient = new QueryClient();

const Template = (args) => (
  <QueryClientProvider client={queryClient}>
    <AppToolbarActionButtons {...args} />
  </QueryClientProvider>
);

export const AppToolbarActionButtonsDefault = Template.bind({});
export const AppToolbarActionButtonsEmptyProfileDetails = Template.bind({});
export const AppToolbarActionButtonsSmallFormFactor = Template.bind({});

AppToolbarActionButtonsDefault.args = {
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
  smScreenSizeAndHigher: false,
};

AppToolbarActionButtonsSmallFormFactor.args = {
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
  smScreenSizeAndHigher: true,
};

AppToolbarActionButtonsEmptyProfileDetails.args = {
  profileDetails: {},
  smScreenSizeAndHigher: false,
};
