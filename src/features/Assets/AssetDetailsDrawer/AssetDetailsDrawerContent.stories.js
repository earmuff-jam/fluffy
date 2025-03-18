import QrCodeGen from "../../../utils/QrCodeGen";
import AssetDetailsDrawerContent from "./AssetDetailsDrawerContent";
import { ASSETS_LIST_DRAWER_HEADERS } from "../constants";

export default {
  title: 'AssetDetailsDrawer/AssetDetailsDrawerContent',
  component: AssetDetailsDrawerContent,
  tags: ['autodocs'],
};

const Template = (args) => <AssetDetailsDrawerContent {...args} />;

export const AssetDetailsDrawerContentDefault = Template.bind({});

AssetDetailsDrawerContentDefault.args = {
  selectedRow: {
    name: 'test name',
    description: 'test description',
    price: '12.00',
    barcode: '123123123123',
    sku: 'ABCD32232',
    quantity: 1,
    location: 'Small Kitchen Cabinet',
    is_returnable: true,
    return_location: 'Walmart',
    max_weight: '12',
    min_weight: '1',
    max_height: '',
    min_height: '',
    bought_at: 'Amazon',
    qr_code: <QrCodeGen value={'test name'} />,
  },
  columns: Object.values(ASSETS_LIST_DRAWER_HEADERS),
};
