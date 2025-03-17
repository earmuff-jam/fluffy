import ReportContent from './ReportContent';
import dayjs from 'dayjs';

export default {
  title: 'Reports/ReportsContent',
  component: ReportContent,
  tags: ['autodocs'],
};

const Template = (args) => <ReportContent {...args} />;

export const ReportContentDefault = Template.bind({});

ReportContentDefault.args = {
  sinceValue: dayjs().toISOString(),
  assets: [
    {
      id: 'ffb9a4f5-524c-4831-adce-b33ce204d1ba',
      name: 'Dog lease',
      description: 'Dog lease built to last',
      color: 'red',
      price: '24.99',
      barcode: 'barcode#1123928',
      sku: 'sku#123456734',
      quantity: 1,
      location: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', location: 'Utility Closet' },
      isReturnable: false,
      returnLocation: 'amazon return',
      maximumWeight: '12',
      minimumWeight: '4',
      maximumHeight: '20',
      minimumHeight: '12',
      imageURL: '',
      createdAt: '2024-11-29T13:19:16.761097Z',
      createdBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      updatedAt: '2024-11-29T13:19:16.761097Z',
      updatedBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      boughtAt: 'Walmart',
      collaborators: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
    },
    {
      id: 'ffb9a4f5-524c-4831-adce-b33ce204d1ba',
      name: 'Tick and flea medicine',
      description: 'Tick and flea medicine weekly supply',
      color: 'blue',
      price: '12.29',
      barcode: 'barcode#1123928',
      sku: 'sku#123456734',
      quantity: 3,
      location: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', location: 'Utility Closet' },
      isReturnable: false,
      returnLocation: 'amazon return',
      maximumWeight: '12',
      minimumWeight: '4',
      maximumHeight: '20',
      minimumHeight: '12',
      imageURL: '',
      createdAt: '2024-11-29T13:19:16.761097Z',
      createdBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      updatedAt: '2024-11-29T13:19:16.761097Z',
      updatedBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      boughtAt: 'Walmart',
      collaborators: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
    },
  ],
};
