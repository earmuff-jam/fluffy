import * as React from "react";

import { InputAdornment, TextField, Typography } from "@mui/material";

import TextFieldWithLabel from "@utils/TextFieldWithLabel";
import { AddNoteFormFields, LocationType } from "@features/notes/types";
import { TextFieldSizeVariants } from "@utils/types";
import RetrieveUserLocation from "@common/Location/RetrieveUserLocation";

interface IAddNoteHeaderProps {
  formFields: AddNoteFormFields;
  handleInput: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  setLocation: (value: LocationType) => void;
}

const AddNoteHeader: React.FunctionComponent<IAddNoteHeaderProps> = ({
  formFields,
  handleInput,
  setLocation,
}) => {
  return (
    <>
      <Typography variant="subtitle2" color="text.secondary">
        {formFields.title.label} {formFields.title.required && "*"}
      </Typography>
      <TextField
        id={formFields.title.name}
        name={formFields.title.name}
        value={formFields.title.value}
        size={formFields.title.size as TextFieldSizeVariants}
        placeholder={formFields.title.placeholder}
        onChange={handleInput}
        required={formFields.title.required}
        error={Boolean(formFields.title["errorMsg"].length)}
        helperText={formFields.title["errorMsg"]}
        variant={formFields.title.variant}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <RetrieveUserLocation setLocation={setLocation} />
            </InputAdornment>
          ),
        }}
      />
      <TextFieldWithLabel
        id={formFields.description.name}
        name={formFields.description.name}
        label={formFields.description.label}
        value={formFields.description.value}
        size={formFields.description.size}
        placeholder={formFields.description.placeholder}
        onChange={handleInput}
        required={formFields.description.required}
        fullWidth={formFields.description.fullWidth}
        error={Boolean(formFields.description.errorMsg)}
        helperText={formFields.description.errorMsg}
        variant={formFields.description.variant}
        rows={formFields.description.rows || 4}
        multiline={formFields.description.multiline || false}
      />
    </>
  );
};

export default AddNoteHeader;
