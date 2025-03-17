import { ADD_CATEGORY_FORM_FIELDS } from "@features/Categories/constants";
import AddFormHeader from "./AddFormHeader";
import { ADD_MAINTENANCE_PLAN_FORM_FIELDS } from "@features/MaintenancePlan/constants";

export default {
  title: 'FormComponents/AddFormHeader',
  component: AddFormHeader,
  tags: ['autodocs'],
};

const Template = (args) => <AddFormHeader {...args} />;

export const AddFormHeaderDefault = Template.bind({});
export const AddFormHeaderMaintenancePlan = Template.bind({});

AddFormHeaderDefault.args = {
  formFields: ADD_CATEGORY_FORM_FIELDS,
  handleInputChange: () => {},
  setLocation: () => {},
};

AddFormHeaderMaintenancePlan.args = {
  formFields: ADD_MAINTENANCE_PLAN_FORM_FIELDS,
  handleInputChange: () => {},
  setLocation: () => {},
};
