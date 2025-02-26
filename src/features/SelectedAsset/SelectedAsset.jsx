import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import RowHeader from '@common/RowHeader';
import SimpleModal from '@common/SimpleModal';
import relativeTime from 'dayjs/plugin/relativeTime';
import ImagePicker from '@common/ImagePicker/ImagePicker';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { BLANK_INVENTORY_FORM } from '@features/Assets/constants';
import { inventoryActions } from '@features/Assets/inventorySlice';
import { AddPhotoAlternateRounded, CheckRounded } from '@mui/icons-material';
import SelectedAssetFormFields from '@features/SelectedAsset/SelectedAssetFormFields';
import SelectedAssetWeightDimension from '@features/SelectedAsset/SelectedAssetWeightDimension';
import SelectedAssetMoreInformation from '@features/SelectedAsset/SelectedAssetMoreInformation';
import { useStorageLocationById, useStorageLocations } from '@services/storageLocationApi';
import { useAssetById, useUpdateAsset } from '@services/assets';

dayjs.extend(relativeTime);

export default function SelectedAsset() {
  const { id } = useParams();

  const selectedImage = '';
  const { data: asset, isLoading: loading } = useAssetById(id);
  const { data: assetStorageLocation, isLoading: isSelectedStorageLocationLoading } = useStorageLocationById(
    asset?.storageLocationIdRef
  );
  const { data: storageLocations, isLoading: storageLocationsLoading } = useStorageLocations();

  const { mutate: updateAsset } = useUpdateAsset();

  const [editImgMode, setEditImgMode] = useState(false);
  const [openReturnNote, setOpenReturnNote] = useState(false);
  const [formFieldChange, setFormFieldChange] = useState(false);

  const [color, setColor] = useState('#f7f7f7');
  const [returnDateTime, setReturnDateTime] = useState(null);
  const [storageLocation, setStorageLocation] = useState({});
  const [formData, setFormData] = useState({ ...BLANK_INVENTORY_FORM });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    const updatedFormData = { ...formData };
    let errorMsg = '';

    for (const validator of updatedFormData[id].validators) {
      if (validator.validate(value)) {
        errorMsg = validator.message;
        break;
      }
    }

    updatedFormData[id] = {
      ...updatedFormData[id],
      value,
      errorMsg,
    };
    setFormFieldChange(true);
    setFormData(updatedFormData);
  };

  const handleColorChange = (newValue) => {
    setFormFieldChange(true);
    setColor(newValue);
  };

  const handleCheckbox = (name, value) => {
    // close the return note subsection if the parent is disabled
    if (name === 'is_returnable' && openReturnNote) {
      setOpenReturnNote(false);
    }

    setFormFieldChange(true);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name], value },
    }));
  };

  const isFormDisabled = () => {
    const containsErr = Object.values(formData).reduce((acc, el) => {
      if (el?.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formData).filter((v) => v?.isRequired);
    const isRequiredFieldsEmpty = requiredFormFields
      .filter((el) => el.type === 'text')
      .some((el) => el.value.trim() === '');

    return containsErr || isRequiredFieldsEmpty || storageLocation === null || Object.keys(storageLocation).length <= 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormDisabled()) {
      enqueueSnackbar('Unable to update asset details.', {
        variant: 'error',
      });
      return;
    }

    const formattedData = Object.values(formData).reduce((acc, el) => {
      acc[el.id] = el.value;
      return acc;
    }, {});

    const storageLocationID =
      storageLocations.find((v) => v.location === storageLocation.location)?.id || storageLocation.location;

    const draftRequest = {
      id,
      name: formattedData.name,
      description: formattedData.description,
      barcode: formattedData.barcode,
      sku: formattedData.sku,
      boughtAt: formattedData.boughtAt,
      returnLocation: formattedData.returnLocation,
      maxWeight: formattedData.maxWeight,
      minWeight: formattedData.minWeight,
      maxHeight: formattedData.maxHeight,
      minHeight: formattedData.minHeight,
      price: formattedData.price,
      quantity: formattedData.quantity,
      isBookmarked: formattedData.isBookmarked,
      isReturnable: formattedData.isReturnable,
      returnDatetime: returnDateTime?.toISOString(),
      storageLocationIdRef: storageLocationID,
      color,
    };

    updateAsset(draftRequest);
    enqueueSnackbar('Successfully updated selected asset.', {
      variant: 'success',
    });
    setFormFieldChange(false);
  };

  const handleUpload = (id, imgFormData) => {
    dispatch(inventoryActions.uploadAndRefreshData({ id: id, selectedImage: imgFormData }));
    setEditImgMode(false);
  };

  useEffect(() => {
    if (assetStorageLocation) {
      setStorageLocation({ location: assetStorageLocation?.location });
    }
  }, [loading, isSelectedStorageLocationLoading]);

  useEffect(() => {
    if (!loading || !storageLocationsLoading) {
      const selectedAsset = { ...BLANK_INVENTORY_FORM };
      selectedAsset.name.value = asset?.name || '';
      selectedAsset.description.value = asset?.description || '';
      selectedAsset.barcode.value = asset?.barcode || '';
      selectedAsset.sku.value = asset?.sku || '';
      selectedAsset.boughtAt.value = asset?.boughtAt || '';
      selectedAsset.returnLocation.value = asset?.returnLocation || '';
      selectedAsset.maxWeight.value = asset?.maxWeight || '';
      selectedAsset.minWeight.value = asset?.minWeight || '';
      selectedAsset.maxHeight.value = asset?.maxHeight || '';
      selectedAsset.minHeight.value = asset?.minHeight || '';
      selectedAsset.price.value = asset?.price || '';
      selectedAsset.quantity.value = asset?.quantity || '';
      selectedAsset.isBookmarked.value = asset?.isBookmarked || false;
      selectedAsset.isReturnable.value = asset?.isReturnable || Boolean(asset?.returnLocation) || false;
      selectedAsset.createdBy.value = asset?.createdBy || '';
      selectedAsset.createdAt.value = asset?.createdAt || '';
      selectedAsset.updatedBy.value = asset?.updatedBy || '';
      selectedAsset.updatedAt.value = asset?.updatedAt || '';
      selectedAsset.sharable_groups.value = asset?.sharable_groups || [];
      selectedAsset.creator = asset?.creator || '';
      selectedAsset.updator = asset?.updator || '';

      if (asset?.returnDatetime) {
        setReturnDateTime(dayjs(asset.returnDatetime));
      }

      if (asset?.returnNotes) {
        setOpenReturnNote(true);
        selectedAsset.returnNotes.value = asset.returnNotes;
      }

      if (asset?.color) {
        setColor(asset.color);
      }
      setFormData(selectedAsset);
    }
  }, [loading, asset]);

  return (
    <>
      <RowHeader
        title="Viewing asset details"
        caption={`Editing ${formData.name.value}`}
        primaryStartIcon={<AddPhotoAlternateRounded />}
        primaryButtonTextLabel={'Add Image'}
        handleClickPrimaryButton={() => setEditImgMode(!editImgMode)}
      />
      <SelectedAssetFormFields
        formFields={formData}
        assetColor={color}
        handleColorChange={handleColorChange}
        selectedImage={selectedImage}
        handleInputChange={handleInputChange}
        options={storageLocations}
        storageLocation={storageLocation}
        setStorageLocation={setStorageLocation}
      />
      <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Typography variant="caption">More information</Typography>
      </Divider>
      <SelectedAssetMoreInformation
        formFields={formData}
        returnDateTime={returnDateTime}
        setReturnDateTime={setReturnDateTime}
        openReturnNote={openReturnNote}
        setOpenReturnNote={setOpenReturnNote}
        handleCheckbox={handleCheckbox}
        handleInputChange={handleInputChange}
      />

      <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Typography variant="caption">Weight and Dimension</Typography>
      </Divider>
      <SelectedAssetWeightDimension formFields={formData} handleInputChange={handleInputChange} />
      <Stack sx={{ margin: '1rem 0rem' }}>
        <Button
          startIcon={<CheckRounded fontSize="small" />}
          onClick={handleSubmit}
          disabled={formFieldChange ? isFormDisabled() : true}
          variant="outlined"
        >
          Submit
        </Button>
      </Stack>
      {editImgMode && (
        <SimpleModal
          title="Assign image"
          subtitle="Assign image to the selected item."
          handleClose={() => setEditImgMode(false)}
          maxSize="sm"
        >
          <ImagePicker id={id} name={formData.name.value} handleUpload={handleUpload} disableCancel />
        </SimpleModal>
      )}
    </>
  );
}
