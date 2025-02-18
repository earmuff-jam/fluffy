import * as React from 'react';
import RowHeader from '@utils/RowHeader';
import { AssetType } from '@features/assets/types';
import ItemDetailsCard from '@features/selected/ItemDetailsCard';

interface IItemDetailsHeaderProps {
  categoryMode?: boolean;
  favBtnDataTour: string;
  imageBtnDataTour: string;
  shareBtnDataTour: string;
  label: string;
  caption: string;
  item: AssetType;
  image: string;
}

const ItemDetailsHeader: React.FunctionComponent<IItemDetailsHeaderProps> = ({
  categoryMode = false,
  favBtnDataTour,
  imageBtnDataTour,
  shareBtnDataTour,
  label,
  caption,
  item,
  image,
}) => {
  return (
    <>
      <RowHeader title={label} caption={caption} />
      <ItemDetailsCard
        selectedItem={item}
        selectedImage={image}
        categoryMode={categoryMode}
        favBtnDataTour={favBtnDataTour}
        imageBtnDataTour={imageBtnDataTour}
        shareBtnDataTour={shareBtnDataTour}
      />
    </>
  );
};

export default ItemDetailsHeader;
