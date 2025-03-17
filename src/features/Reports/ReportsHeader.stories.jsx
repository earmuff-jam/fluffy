import ReportsHeader from './ReportsHeader';

export default {
  title: 'Reports/ReportsHeader',
  component: ReportsHeader,
  tags: ['autodocs'],
};

const Template = (args) => <ReportsHeader {...args} />;

export const ReportHeaderDefault = Template.bind({});
export const ReportHeaderLoading = Template.bind({});

ReportHeaderDefault.args = {
  reports: [
    {
      id: '',
      selected_time_range: '2024-01-01T06:00:00Z',
      costCategoryItems: 0,
      createdAt: '0001-01-01T00:00:00Z',
      createdBy: { id: '', emailAddress: 'john_doe47@gmail.com' },
      updatedAt: '0001-01-01T00:00:00Z',
      updatedBy: { id: '', emailAddress: 'john_doe47@gmail.com' },
      collaborators: [],
    },
  ],
  totalAssetValuation: 297.96,
  loading: false,
  isSecondaryButtonLoading: false,
  selectedAsset: {},
  selectedMaintenancePlan: {},
  setDisplayModal: () => {},
  downloadReports: () => {},
};

ReportHeaderLoading.args = {
  reports: [],
  totalAssetValuation: 297.96,
  loading: true,
  isSecondaryButtonLoading: false,
  selectedAsset: {},
  selectedMaintenancePlan: {},
  setDisplayModal: () => {},
  downloadReports: () => {},
};
