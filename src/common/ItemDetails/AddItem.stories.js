import { Provider } from 'react-redux';
import AddItem from './AddItem';
import store from 'src/rtkStore';

export default {
  title: 'Common/ItemCard/AddItem',
  component: AddItem,
  tags: ['autodocs'],
};

const Template = (args) => (
  <Provider store={store}>
    <AddItem {...args} />
  </Provider>
);

export const AddItemDefault = Template.bind({});

AddItemDefault.args = {
  selectedIDList: [],
  setSelectedIDList: () => {},
  itemsInMaintenancePlan: [],
};
