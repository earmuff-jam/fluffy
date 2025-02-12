import * as React from "react";

import { Box, Button, Stack, Typography } from "@mui/material";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import TextFieldWithLabel from "@utils/TextFieldWithLabel";
import { UserDemographicsType } from "@features/profile/types";
import { BLANK_PROFILE_DETAILS } from "@features/profile/constants";

dayjs.extend(relativeTime);

const ProfileForm: React.FunctionComponent = () => {
  const data: UserDemographicsType = {
    id: "",
    username: "",
    full_name: "",
    email_address: "",
    phone_number: "",
    about_me: "",
    online_status: false,
    is_dark_theme: false,
    is_inventory_layout: false,
    created_at: "",
    updated_at: "",
  };
  const loading = false;

  const [formData, setFormData] = React.useState(BLANK_PROFILE_DETAILS);

  const submit = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const draftData = Object.entries(formData).reduce(
      (acc, [key, valueObj]) => {
        acc[key] = valueObj.value;
        return acc;
      },
      {}
    );
    draftData["updated_on"] = dayjs();
    // dispatch(profileActions.updateProfileDetails({ draftData }));
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = ev.target;
    const updatedFormData = { ...formData };
    let errorMsg = "";
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
    setFormData(updatedFormData);
  };

  React.useEffect(() => {
    if (!loading) {
      const draftProfileDetails = { ...BLANK_PROFILE_DETAILS };
      draftProfileDetails.username.value = data.username;
      draftProfileDetails.full_name.value = data.full_name;
      draftProfileDetails.email_address.value = data.email_address;
      draftProfileDetails.phone_number.value = data.phone_number;
      draftProfileDetails.about_me.value = data.about_me;
      draftProfileDetails.created_at.value = data.created_at;
      draftProfileDetails.updated_at.value = data.updated_at;
      setFormData(draftProfileDetails);
    }
  }, [loading]);

  return (
    <Stack spacing={0.8}>
      <TextFieldWithLabel
        label={"User name"}
        caption={"Your display name throughout the application."}
        id={"username"}
        name={"username"}
        placeholder={"Enter your username that you would like to go by"}
        value={formData?.username?.value || ""}
        onChange={handleChange}
        variant={"outlined"}
        size="small"
        error={Boolean(formData.username["errorMsg"].length)}
        helperText={formData.username["errorMsg"]}
      />
      <TextFieldWithLabel
        label={"First name"}
        id={"full_name"}
        name={"full_name"}
        placeholder={"Enter your full name"}
        value={formData?.full_name?.value || ""}
        onChange={handleChange}
        variant={"outlined"}
        size="small"
        error={Boolean(formData.full_name["errorMsg"].length)}
        helperText={formData.full_name["errorMsg"]}
      />
      <TextFieldWithLabel
        label={"Email address"}
        id="email_address"
        name="email_address"
        placeholder="Enter your unique email address"
        value={formData?.email_address.value || ""}
        onChange={handleChange}
        variant="outlined"
        size="small"
        error={Boolean(formData.email_address["errorMsg"].length)}
        helperText={formData.email_address["errorMsg"]}
      />
      <TextFieldWithLabel
        label={"Phone number"}
        id="phone_number"
        name="phone_number"
        placeholder="Enter your phone number"
        value={formData?.phone_number.value || ""}
        onChange={handleChange}
        variant="outlined"
        size="small"
        error={Boolean(formData.phone_number["errorMsg"].length)}
        helperText={formData.phone_number["errorMsg"]}
      />
      <TextFieldWithLabel
        label={"About me"}
        id="about_me"
        name="about_me"
        placeholder="Allow yourself to express your unique values with a short bio."
        value={formData?.about_me?.value || ""}
        onChange={handleChange}
        variant="outlined"
        multiline={true}
        rows={4}
        size="small"
        error={Boolean(formData.about_me["errorMsg"].length)}
        helperText={formData.about_me["errorMsg"]}
      />

      <Typography variant="caption" color="text.secondary">
        {formData?.updated_at === null
          ? `Created ${dayjs(formData?.created_at.value).fromNow()}`
          : `Last updated ${dayjs(formData?.updated_at.value).fromNow()}`}
      </Typography>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={submit}
          disabled={Object.values(formData).some(
            (v) => v?.errorMsg?.length > 0
          )}
        >
          Update profile
        </Button>
      </Box>
    </Stack>
  );
};

export default ProfileForm;
