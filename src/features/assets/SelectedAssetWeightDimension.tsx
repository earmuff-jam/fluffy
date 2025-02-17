import * as React from 'react';

import { Stack } from '@mui/material';
import TextFieldWithLabel from '@utils/TextFieldWithLabel';
import { AssetDetailsFormFieldType } from '@features/assets/types';

interface ISelectedAssetWeightDimensionProps {
  formFields: AssetDetailsFormFieldType;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectedAssetWeightDimension: React.FunctionComponent<ISelectedAssetWeightDimensionProps> = ({ formFields, onChange }) => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          id={formFields.maxWeight.name}
          name={formFields.maxWeight.name}
          label={formFields.maxWeight.label}
          value={formFields.maxWeight.value}
          size={formFields.maxWeight.size}
          placeholder={formFields.maxWeight.placeholder}
          onChange={onChange}
          required={formFields.maxWeight.required}
          fullWidth={formFields.maxWeight.fullWidth}
          error={Boolean(formFields.maxWeight.errorMsg)}
          helperText={formFields.maxWeight.errorMsg}
          variant={formFields.maxWeight.variant}
        />
        <TextFieldWithLabel
          id={formFields.minWeight.name}
          name={formFields.minWeight.name}
          label={formFields.minWeight.label}
          value={formFields.minWeight.value}
          size={formFields.minWeight.size}
          placeholder={formFields.minWeight.placeholder}
          onChange={onChange}
          required={formFields.minWeight.required}
          fullWidth={formFields.minWeight.fullWidth}
          error={Boolean(formFields.minWeight.errorMsg)}
          helperText={formFields.minWeight.errorMsg}
          variant={formFields.minWeight.variant}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          id={formFields.maxHeight.name}
          name={formFields.maxHeight.name}
          label={formFields.maxHeight.label}
          value={formFields.maxHeight.value}
          size={formFields.maxHeight.size}
          placeholder={formFields.maxHeight.placeholder}
          onChange={onChange}
          required={formFields.maxHeight.required}
          fullWidth={formFields.maxHeight.fullWidth}
          error={Boolean(formFields.maxHeight.errorMsg)}
          helperText={formFields.maxHeight.errorMsg}
          variant={formFields.maxHeight.variant}
        />
        <TextFieldWithLabel
          id={formFields.minHeight.name}
          name={formFields.minHeight.name}
          label={formFields.minHeight.label}
          value={formFields.minHeight.value}
          size={formFields.minHeight.size}
          placeholder={formFields.minHeight.placeholder}
          onChange={onChange}
          required={formFields.minHeight.required}
          fullWidth={formFields.minHeight.fullWidth}
          error={Boolean(formFields.minHeight.errorMsg)}
          helperText={formFields.minHeight.errorMsg}
          variant={formFields.minHeight.variant}
        />
      </Stack>
    </Stack>
  );
};

export default SelectedAssetWeightDimension;
