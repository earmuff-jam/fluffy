import ItemDetailsContent from './ItemDetailsContent';

export default {
  title: 'Common/ItemCard/ItemDetailsContent',
  component: ItemDetailsContent,
  tags: ['autodocs'],
};

const Template = (args) => <ItemDetailsContent {...args} />;

export const ItemDetailsContentDefault = Template.bind({});
export const ItemDetailsContentMultipleList = Template.bind({});
export const ItemDetailsContentEmpty = Template.bind({});

ItemDetailsContentDefault.args = {
  rowSelection: [],
  associatedItems: [
    {
      id: '6e9df958-cb4d-4d5f-a38c-c31544eaa115',
      name: 'Dog food',
      description: '6 pounds of food bought from tractor supply',
      price: '96.87',
      quantity: '1',
      storageLocationId: { id: '', location: 'Utility Closet' },
      createdBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      createdAt: '2024-12-04T00:16:28.764826Z',
      updatedBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      updatedAt: '2024-12-04T00:16:28.764826Z',
      collaborators: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
    },
  ],
  setRowSelection: () => {},
  handleOpenModal: () => {},
  removeAssociation: () => {},
};

ItemDetailsContentEmpty.args = {
  rowSelection: [],
  associatedItems: [],
  setRowSelection: () => {},
  handleOpenModal: () => {},
  removeAssociation: () => {},
};

ItemDetailsContentMultipleList.args = {
  rowSelection: [],
  associatedItems: [
    {
      id: '6e9df958-cb4d-4d5f-a38c-c31544eaa115',
      plan_id: 'd4d6ce04-1eb1-42fc-89ae-26abb6ac0c2b',
      item_id: 'ffb9a4f5-524c-4831-adce-b33ce204d1ba',
      name: 'Dog food',
      description: '6 pounds of food bought from tractor supply',
      price: '96.87',
      quantity: '1',
      storageLocationId: { id: '', location: 'Utility Closet' },
      createdBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      createdAt: '2024-12-04T00:16:28.764826Z',
      creator: 'IngestSvcUser',
      updatedBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      updatedAt: '2024-12-04T00:16:28.764826Z',
      updator: 'IngestSvcUser',
      collaborators: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
    },
    {
      id: '6e9df958-cb4d-4d5f-a38c-c31544eaa116',
      plan_id: 'd4d6ce04-1eb1-42fc-89ae-26abb6ac0c25',
      item_id: 'ffb9a4f5-524c-4831-adce-b33ce204d1bv',
      name: 'Cat food',
      description: '12 pounds bought from tractor supply',
      price: '24.000',
      quantity: '1',
      storageLocationId: { id: '', location: 'Utility Closet' },
      createdBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      createdAt: '2024-12-04T00:16:28.764826Z',
      creator: 'IngestSvcUser',
      updatedBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      updatedAt: '2024-12-04T00:16:28.764826Z',
      updator: 'IngestSvcUser',
      collaborators: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
    },
  ],
  setRowSelection: () => {},
  handleOpenModal: () => {},
  removeAssociation: () => {},
};
