import * as React from 'react';

import { Stack } from '@mui/material';

import { BookmarkAddedRounded, SwapHorizRounded } from '@mui/icons-material';
import { AssetDetailsFormFieldType } from '@features/assets/types';
import TextFieldWithLabel from '@utils/TextFieldWithLabel';
import SelectedAssetMoreInformationCheckbox from '@features/assets/SelectedAssetMoreInformationCheckbox';
import SelectedAssetReturnInformationContent from '@features/assets/SelectedAssetReturnInformationContent';
import { Dayjs } from 'dayjs';


interface ISelectedAssetMoreInformationProps {
  formFields: AssetDetailsFormFieldType;
  returnDateTime: Dayjs;
  setReturnDateTime: (date: Dayjs) => void;
  openReturnNote: boolean;
  setOpenReturnNote: (open: boolean) => void;
  handleCheckbox: (name: string, value: boolean) => void;
  handleInputChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectedAssetMoreInformation: React.FunctionComponent<ISelectedAssetMoreInformationProps> = ({
  formFields,
  returnDateTime,
  setReturnDateTime,
  openReturnNote,
  setOpenReturnNote,
  handleCheckbox,
  handleInputChange,
}) => {

  const isReturnable = Boolean(formFields.isReturnable.value);
  const isBookmarked = Boolean(formFields.isBookmarked.value);

  return (
    <Stack spacing={2}>
      <SelectedAssetMoreInformationCheckbox
        isChecked={isBookmarked}
        handleCheckbox={handleCheckbox}
        target="is_bookmarked"
        label="Bookmark"
        icon={<BookmarkAddedRounded color={isBookmarked ? 'primary' : 'secondary'} />}
      />
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <SelectedAssetMoreInformationCheckbox
          isChecked={isReturnable}
          handleCheckbox={handleCheckbox}
          target="is_returnable"
          label="Returnable"
          icon={<SwapHorizRounded color={isReturnable ? 'primary' : 'secondary'} />}
        />
        {isReturnable && (
          <SelectedAssetReturnInformationContent
            openReturnNote={openReturnNote}
            setOpenReturnNote={setOpenReturnNote}
            formFields={formFields}
            returnDateTime={returnDateTime}
            setReturnDateTime={setReturnDateTime}
            handleInputChange={handleInputChange}
          />
        )}
      </Stack>
      {openReturnNote && (
        <TextFieldWithLabel
          id={formFields.returnNotes.name}
          name={formFields.returnNotes.name}
          label={formFields.returnNotes.label}
          value={String(formFields.returnNotes.value)}
          size={formFields.returnNotes.size}
          placeholder={formFields.returnNotes.placeholder}
          onChange={handleInputChange}
          required={formFields.returnNotes.required}
          fullWidth={formFields.returnNotes.fullWidth}
          error={Boolean(formFields.returnNotes.errorMsg)}
          helperText={formFields.returnNotes.errorMsg}
          variant={formFields.returnNotes.variant}
          multiline
          rows={4}
        />
      )}
    </Stack>
  );
};

export default SelectedAssetMoreInformation;
