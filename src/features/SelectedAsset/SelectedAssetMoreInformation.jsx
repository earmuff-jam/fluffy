import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { BookmarkAddedRounded, SwapHorizRounded } from '@mui/icons-material';

import TextFieldWithLabel from '@utils/TextFieldWithLabel';
import SelectedAssetReturnInformationContent from '@features/SelectedAsset/SelectedAssetReturnInformationContent';

export default function SelectedAssetMoreInformation({
  formFields,
  returnDateTime,
  setReturnDateTime,
  openReturnNote,
  setOpenReturnNote,
  handleCheckbox,
  handleInputChange,
}) {
  const isReturnable = Boolean(formFields.isReturnable.value);
  const isBookmarked = Boolean(formFields.isBookmarked.value);

  return (
    <Stack spacing={2}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isBookmarked}
            onChange={(e) => handleCheckbox('isBookmarked', e.target.checked)}
            color="primary"
          />
        }
        label={
          <Stack direction="row" alignItems="center">
            <BookmarkAddedRounded color={isBookmarked ? 'primary' : 'secondary'} />
            <Typography variant="caption">Bookmark</Typography>
          </Stack>
        }
      />

      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              checked={isReturnable}
              onChange={(e) => handleCheckbox('isReturnable', e.target.checked)}
              color="primary"
            />
          }
          label={
            <Stack direction="row" alignItems="center">
              <SwapHorizRounded color={isReturnable ? 'primary' : 'secondary'} />
              <Typography variant="caption">Returnable</Typography>
            </Stack>
          }
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
          value={formFields.returnNotes.value}
          size={formFields.returnNotes.size}
          placeholder={formFields.returnNotes.placeholder}
          handleChange={handleInputChange}
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
}
