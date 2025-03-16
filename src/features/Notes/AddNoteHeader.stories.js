import { Stack } from "@mui/material";
import AddNoteHeader from "./AddNoteHeader";

export default {
  title: 'Note/AddNoteHeader',
  component: AddNoteHeader,
  tags: ['autodocs'],
};

const Template = (args) => (
  <Stack>
    <AddNoteHeader {...args} />
  </Stack>
);

export const AddNoteDefault = Template.bind({});

AddNoteDefault.args = {
  formFields: {
    title: {
      label: 'Title',
      placeholder: 'Short note title',
      value: '',
      name: 'title',
      size: 'small',
      errorMsg: '',
      required: true,
      fullWidth: true,
      validators: [],
      type: 'text',
      variant: 'outlined',
    },
    description: {
      label: 'Description',
      placeholder: 'Note description in less than 500 characters',
      value: '',
      name: 'description',
      size: 'small',
      errorMsg: '',
      required: false,
      validators: [],
      type: 'text',
      multiline: true,
      rows: 4,
      variant: 'outlined',
      fullWidth: true,
    },
  },
  handleInput: () => {},
  setLocation: () => {},
};
