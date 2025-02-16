import * as React from "react";

import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import RetrieveUserLocation from "@common/Location/RetrieveUserLocation";
import TextFieldWithLabel from "@utils/TextFieldWithLabel";
import { AddCategoryFormFields } from "@features/categories/types";
import { LocationType } from "@utils/types";

interface IAddFormHeaderProps {
  formFields: AddCategoryFormFields;
  handleInputChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  setLocation: (value: LocationType) => void;
}

const AddFormHeader: React.FunctionComponent<IAddFormHeaderProps> = ({
  formFields,
  handleInputChange,
  setLocation,
}) => {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" color="text.secondary">
        {formFields.name.label} {formFields.name.required && "*"}
      </Typography>
      <TextField
        id={formFields.name.name}
        name={formFields.name.name}
        value={formFields.name.value}
        onChange={handleInputChange}
        placeholder={formFields.name.placeholder}
        fullWidth
        variant="outlined"
        required={formFields.name.required}
        size={formFields.name.size}
        error={Boolean(formFields.name["errorMsg"].length)}
        helperText={formFields.name["errorMsg"]}
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
        onChange={handleInputChange}
        required={formFields.description.required}
        fullWidth={formFields.description.fullWidth}
        error={Boolean(formFields.description.errorMsg)}
        helperText={formFields.description.errorMsg}
        variant={formFields.description.variant}
        rows={formFields.description.rows || 4}
        multiline={formFields.description.multiline || false}
      />
    </Stack>
  );
};

export default AddFormHeader;
