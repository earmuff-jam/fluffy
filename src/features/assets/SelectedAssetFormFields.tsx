import * as React from 'react';

import { Autocomplete, CardMedia, Stack, TextField, createFilterOptions } from '@mui/material';
import TextFieldWithLabel from '@utils/TextFieldWithLabel';
import ColorPicker from '@common/ColorPicker/ColorPicker';
import { AssetDetailsFormFieldType } from '@features/assets/types';

const filter = createFilterOptions<{ location: string; inputValue?: string }>();

interface ISelectedAssetFormFieldsProps {
  formFields: AssetDetailsFormFieldType;
  selectedImage?: string;
  assetColor: string;
  handleColorChange: (color: string) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: { location: string }[];
  storageLocation: { location: string } | null;
  setStorageLocation: (value: { location: string } | null) => void;
}

const SelectedAssetFormFields: React.FunctionComponent<ISelectedAssetFormFieldsProps> = ({
  formFields,
  selectedImage,
  assetColor,
  handleColorChange,
  handleInputChange,
  options,
  storageLocation,
  setStorageLocation,
}) => {
  return (
    <Stack spacing={2} marginTop={'1rem'}>
      <Stack direction="row" spacing={2} alignItems="center">
        <CardMedia
          component="img"
          sx={{ width: 300 }}
          image={selectedImage || '/blank_canvas.png'}
          alt="Default placeholder image for the asset"
        />
        <Stack spacing={2} flexGrow={1}>
          <TextFieldWithLabel {...formFields.name} value={String(formFields.name.value)} onChange={handleInputChange} />
          <TextFieldWithLabel
            {...formFields.description}
            value={String(formFields.description.value)}
            onChange={handleInputChange}
            multiline
            rows={4}
          />
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel {...formFields.price} value={String(formFields.price.value)} onChange={handleInputChange} />
        <TextFieldWithLabel
          {...formFields.barcode}
          value={String(formFields.barcode.value)}
          onChange={handleInputChange}
        />
        <TextFieldWithLabel {...formFields.sku} value={String(formFields.sku.value)} onChange={handleInputChange} />
      </Stack>

      <Stack direction="row" spacing={1}>
        <TextFieldWithLabel
          {...formFields.quantity}
          value={String(formFields.quantity.value)}
          onChange={handleInputChange}
        />
        <ColorPicker value={assetColor} handleChange={handleColorChange} label="Associate color" />
        <TextFieldWithLabel
          {...formFields.boughtAt}
          value={String(formFields.boughtAt.value)}
          onChange={handleInputChange}
        />
      </Stack>

      <Autocomplete
        fullWidth
        freeSolo
        forcePopupIcon
        value={storageLocation || null}
        // onOpen={() => dispatch(inventoryActions.getStorageLocations())}
        onChange={(_, newValue) => {
          if (typeof newValue === 'string') {
            setStorageLocation({ location: newValue });
          } else if (newValue?.inputValue) {
            setStorageLocation({ location: newValue.inputValue });
          } else {
            setStorageLocation(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          if (inputValue && !options.some((option) => inputValue === option.location)) {
            filtered.push({ inputValue, location: `Add "${inputValue}"` });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="autocomplete-storage-location"
        options={options}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.inputValue || option.location)}
        renderOption={(props, option) => (
          <li {...props} key={option.location}>
            {option.location}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label="Storage Location"
            variant="standard"
            placeholder="Where do you plan to store this item"
          />
        )}
      />
    </Stack>
  );
};

export default SelectedAssetFormFields;
