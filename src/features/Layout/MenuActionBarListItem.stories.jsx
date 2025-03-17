import { CategoryRounded, MenuRounded } from "@mui/icons-material";
import MenuActionBarListItem from "./MenuActionBarListItem";

export default {
  title: 'Layout/MenuActionBarListItem',
  component: MenuActionBarListItem,
  tags: ['autodocs'],
};

const Template = (args) => <MenuActionBarListItem {...args} />;

export const MenuActionBarListItemDefault = Template.bind({});
export const MenuActionBarListItemSelectedView = Template.bind({});

MenuActionBarListItemDefault.args = {
  label: 'Menu Action Bar Item Row',
  icon: <MenuRounded />,
  isSelected: false,
  handleClick: () => {},
};

MenuActionBarListItemSelectedView.args = {
  label: 'Menu Action Bar Item Row',
  icon: <CategoryRounded />,
  isSelected: true,
  handleClick: () => {},
};
