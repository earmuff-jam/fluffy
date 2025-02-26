import { Stack } from '@mui/material';
import { BookmarkAddedRounded, SwapHorizRounded } from '@mui/icons-material';
import TextFieldWithLabel from '@common/TextFieldWithLabel/TextFieldWithLabel';
import SelectedAssetMoreInformationCheckbox from '@features/SelectedAsset/SelectedAssetMoreInformationCheckbox';
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
      <SelectedAssetMoreInformationCheckbox
        isChecked={isBookmarked}
        handleCheckbox={handleCheckbox}
        target="isBookmarked"
        label="Bookmark"
        icon={<BookmarkAddedRounded color={isBookmarked ? 'primary' : 'secondary'} />}
      />
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <SelectedAssetMoreInformationCheckbox
          isChecked={isReturnable}
          handleCheckbox={handleCheckbox}
          target="isReturnable"
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
