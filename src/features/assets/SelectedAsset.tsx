import * as React from 'react';

import { useParams } from 'react-router-dom';

import { Button, Divider, Stack, Typography } from '@mui/material';
import { AddPhotoAlternateRounded, CheckRounded } from '@mui/icons-material';

import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import RowHeader from '@utils/RowHeader';
import SimpleModal from '@utils/SimpleModal';
import ImagePicker from '@utils/ImagePicker';
import { BLANK_INVENTORY_FORM } from '@features/assets/contants';
import { LocationType, SnackbarContent } from '@utils/types';
import CustomSnackbar from '@utils/Snackbar';
import { AssetDetailsFormFieldType, AssetType } from '@features/assets/types';
import SelectedAssetFormFields from '@features/assets/SelectedAssetFormFields';
import SelectedAssetMoreInformation from '@features/assets/SelectedAssetMoreInformation';
import SelectedAssetWeightDimension from '@features/assets/SelectedAssetWeightDimension';

dayjs.extend(relativeTime);

interface ISelectedAssetProps {}

const SelectedAsset: React.FunctionComponent<ISelectedAssetProps> = () => {
  const { id } = useParams();

  const loading = false;
  const storageLocationsLoading = false;
  const storageLocations = [];
  const inventory = {} as AssetType;
  const selectedImage = '';

  // const {
  //     loading: storageLocationsLoading,
  //     storageLocations,
  //     inventory,
  //     selectedImage,
  //     loading,
  // } = useSelector((state) => state.inventory);

  const [editImgMode, setEditImgMode] = React.useState<boolean>(false);
  const [openReturnNote, setOpenReturnNote] = React.useState<boolean>(false);
  const [formFieldChange, setFormFieldChange] = React.useState<boolean>(false);

  const [color, setColor] = React.useState<string>('#f7f7f7');
  const [returnDateTime, setReturnDateTime] = React.useState<Dayjs | null>(null);

  const [storageLocation, setStorageLocation] = React.useState<LocationType>();
  const [formData, setFormData] = React.useState<AssetDetailsFormFieldType>(BLANK_INVENTORY_FORM);

  const [snackbarContent, setSnackbarContent] = React.useState<SnackbarContent>({
    open: false,
    message: null,
    severity: 'success',
  });

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = ev.target;
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

  const handleColorChange = (newValue: string): void => {
    setFormFieldChange(true);
    setColor(newValue);
  };

  const handleCheckbox = (name: string, value: boolean): void => {
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

    const requiredFormFields = Object.values(formData).filter((v) => v?.required);
    const isRequiredFieldsEmpty = requiredFormFields
      .filter((el) => el.type === 'text')
      .some((el) => String(el.value).trim() === '');

    return containsErr || isRequiredFieldsEmpty || storageLocation === null || Object.keys(storageLocation).length <= 0;
  };

  const handleSubmit = (ev: React.MouseEvent<MouseEvent>) => {
    ev.preventDefault();

    if (isFormDisabled()) {
      setSnackbarContent({
        open: true,
        message: 'Unable to update inventory details.',
        severity: 'error',
      });
      return;
    }

    const formattedData = Object.values(formData).reduce((acc, el) => {
      if (el.type === 'number') {
        acc[el.name] = Number(el.value);
      } else if (el.value) {
        acc[el.name] = el.value;
      }
      return acc;
    }, {});

    const draftRequest = {
      id: id, // bring id from the params
      ...formattedData,
      return_datetime: returnDateTime !== null ? returnDateTime.toISOString() : null,
      //   location: storageLocation.location,
      color: color,
    };

    setFormFieldChange(false);
    // dispatch(inventoryActions.updateInventory(draftRequest));
    setSnackbarContent({
      open: true,
      message: 'Successfully updated selected asset.',
      severity: 'success',
    });
  };

  const handleUpload = (id: string, imgFormData: File): void => {
    // dispatch(inventoryActions.uploadAndRefreshData({ id: id, selectedImage: imgFormData }));
    setEditImgMode(false);
  };

  React.useEffect(() => {
    if (id.length > 0) {
      // dispatch(inventoryActions.getInvByID(id));
    }
  }, [id]);

  React.useEffect(() => {
    if (!loading && !selectedImage) {
      // dispatch(inventoryActions.getSelectedImage({ id }));
    }
  }, [loading]);

  React.useEffect(() => {
    if (!loading || !storageLocationsLoading) {
      const selectedAsset = { ...BLANK_INVENTORY_FORM };
      selectedAsset.name.value = inventory.name || '';
      selectedAsset.description.value = inventory.description || '';
      selectedAsset.barcode.value = inventory.barcode || '';
      selectedAsset.sku.value = inventory.sku || '';
      selectedAsset.boughtAt.value = inventory.boughtAt || '';
      selectedAsset.returnLocation.value = inventory.returnLocation || '';
      selectedAsset.maxWeight.value = inventory.maxWeight || '';
      selectedAsset.minWeight.value = inventory.minWeight || '';
      selectedAsset.maxHeight.value = inventory.maxHeight || '';
      selectedAsset.minHeight.value = inventory.minHeight || '';
      selectedAsset.price.value = inventory.price || '';
      selectedAsset.quantity.value = inventory.quantity || '';
      selectedAsset.isBookmarked.value = inventory.isBookmarked || false;
      selectedAsset.isReturnable.value = inventory.isReturnable || Boolean(inventory.returnLocation) || false;
      selectedAsset.location.value = inventory.location;
      selectedAsset.createdBy.value = inventory.createdBy || '';
      selectedAsset.createdAt.value = inventory.createdAt || '';
      selectedAsset.updatedBy.value = inventory.updatedBy || '';
      selectedAsset.updatedAt.value = inventory.updatedAt || '';
      selectedAsset.collaborators.value = inventory.collaborators || [];
      selectedAsset.creator.value = inventory?.creator || '';
      selectedAsset.updator.value = inventory?.updator || '';

      if (inventory?.returnDatetime) {
        setReturnDateTime(dayjs(inventory.returnDatetime));
      }

      if (inventory?.returnNotes) {
        setOpenReturnNote(true);
        selectedAsset.returnNotes.value = inventory.returnNotes;
      }

      if (inventory?.color) {
        setColor(inventory.color);
      }
      setFormData(selectedAsset);
    }
  }, [loading, inventory]);

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
      <CustomSnackbar
        open={snackbarContent.open}
        message={snackbarContent.message}
        severity={snackbarContent.severity}
        handleClose={() =>
          setSnackbarContent({
            open: false,
            severity: 'success',
            message: null,
          })
        }
      />
    </>
  );
};

export default SelectedAsset;
