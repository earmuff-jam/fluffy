import { BLANK_ASSET_DETAILS_FORM } from "@features/Assets/constants";
import SelectedAssetMoreInformation from "./SelectedAssetMoreInformation";
import dayjs from "dayjs";

export default {
  title: 'SelectedAsset/SelectedAssetMoreInformation',
  component: SelectedAssetMoreInformation,
  tags: ['autodocs'],
};

const Template = (args) => <SelectedAssetMoreInformation {...args} />;

export const SelectedAssetMoreInformationDefault = Template.bind({});
export const SelectedAssetMoreInformationBookmarkSelected = Template.bind({});
export const SelectedAssetMoreInformationReturnableSelected = Template.bind({});
export const SelectedAssetMoreInformationReturnableSelectedWithReturnNotes = Template.bind({});

SelectedAssetMoreInformationDefault.args = {
  formFields: BLANK_ASSET_DETAILS_FORM,
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
  openReturnNote: false,
  setOpenReturnNote: () => {},
  handleCheckbox: () => {},
  handleInputChange: () => {},
};

SelectedAssetMoreInformationBookmarkSelected.args = {
  formFields: BLANK_ASSET_DETAILS_FORM,
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
  openReturnNote: false,
  setOpenReturnNote: () => {},
  handleCheckbox: () => {},
  handleInputChange: () => {},
};

SelectedAssetMoreInformationReturnableSelected.args = {
  formFields: BLANK_ASSET_DETAILS_FORM,
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
  openReturnNote: false,
  setOpenReturnNote: () => {},
  handleCheckbox: () => {},
  handleInputChange: () => {},
};

SelectedAssetMoreInformationReturnableSelectedWithReturnNotes.args = {
  formFields: BLANK_ASSET_DETAILS_FORM,
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
  openReturnNote: true,
  setOpenReturnNote: () => {},
  handleCheckbox: () => {},
  handleInputChange: () => {},
};
