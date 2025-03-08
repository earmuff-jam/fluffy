import { useEffect, useState } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';

import { useAuthenticator } from '@aws-amplify/ui-react';

import { BLANK_PROFILE_DETAILS } from '@features/Profile/constants';
import TextFieldWithLabel from '@common/TextFieldWithLabel/TextFieldWithLabel';
import { useFetchUserProfileDetails, useUpdateProfile } from '@services/profileApi';

dayjs.extend(relativeTime);

const ProfileForm = ({ handleClose }) => {
  const { user } = useAuthenticator();
  const { data, isLoading } = useFetchUserProfileDetails(user.userId);
  const { mutate: updateProfile } = useUpdateProfile();

  const [formData, setFormData] = useState(BLANK_PROFILE_DETAILS);

  const submit = (ev) => {
    ev.preventDefault();
    const draftData = Object.entries(formData).reduce((acc, [key, valueObj]) => {
      if (['updatedAt'].includes(key)) {
        acc[key] = valueObj;
      } else {
        acc[key] = valueObj.value;
      }
      return acc;
    }, {});

    draftData.id = data.id;
    updateProfile(draftData);
    handleClose();
  };

  const handleChange = (ev) => {
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

    setFormData(updatedFormData);
  };

  useEffect(() => {
    if (!isLoading) {
      const draftProfileDetails = { ...BLANK_PROFILE_DETAILS };

      draftProfileDetails.username.value = data.username;
      draftProfileDetails.firstName.value = data.firstName;
      draftProfileDetails.lastName.value = data.lastName;
      draftProfileDetails.emailAddress.value = data.emailAddress;
      draftProfileDetails.phoneNumber.value = data.phoneNumber;
      draftProfileDetails.aboutMe.value = data.aboutMe;
      draftProfileDetails.updatedAt = data.updatedAt;

      setFormData(draftProfileDetails);
    }
  }, [isLoading]);

  return (
    <Stack spacing={0.8}>
      <TextFieldWithLabel
        label={'User name'}
        caption={'Your display name throughout the application.'}
        id={'username'}
        name={'username'}
        placeholder={'Enter your username that you would like to go by'}
        value={formData?.username?.value || ''}
        handleChange={handleChange}
        variant={'outlined'}
        size="small"
        error={Boolean(formData.username['errorMsg'].length)}
        helperText={formData.username['errorMsg']}
      />
      <TextFieldWithLabel
        label={'First name'}
        id={'firstName'}
        name={'firstName'}
        placeholder={'Enter your first name'}
        value={formData?.firstName?.value || ''}
        handleChange={handleChange}
        variant={'outlined'}
        size="small"
        error={Boolean(formData.firstName['errorMsg'].length)}
        helperText={formData.firstName['errorMsg']}
      />
      <TextFieldWithLabel
        label={'Last name'}
        id={'lastName'}
        name={'lastName'}
        placeholder={'Enter your last name'}
        value={formData?.lastName?.value || ''}
        handleChange={handleChange}
        variant={'outlined'}
        size="small"
        error={Boolean(formData.lastName['errorMsg'].length)}
        helperText={formData.lastName['errorMsg']}
      />
      <TextFieldWithLabel
        label={'Email address'}
        id="emailAddress"
        name="emailAddress"
        placeholder="Enter your unique email address"
        value={formData?.emailAddress.value || ''}
        handleChange={handleChange}
        variant="outlined"
        size="small"
        error={Boolean(formData.emailAddress['errorMsg'].length)}
        helperText={formData.emailAddress['errorMsg']}
      />
      <TextFieldWithLabel
        label={'Phone number'}
        id="phoneNumber"
        name="phoneNumber"
        placeholder="Enter your phone number"
        value={formData?.phoneNumber.value || ''}
        handleChange={handleChange}
        variant="outlined"
        size="small"
        error={Boolean(formData.phoneNumber['errorMsg'].length)}
        helperText={formData.phoneNumber['errorMsg']}
      />
      <TextFieldWithLabel
        label={'About me'}
        id="aboutMe"
        name="aboutMe"
        placeholder="Allow yourself to express your unique values with a short bio."
        value={formData?.aboutMe?.value || ''}
        handleChange={handleChange}
        variant="outlined"
        multiline={true}
        rows={4}
        size="small"
        error={Boolean(formData.aboutMe['errorMsg'].length)}
        helperText={formData.aboutMe['errorMsg']}
      />

      <Typography variant="caption" color="text.secondary">
        Last updated {dayjs(formData?.updatedAt).fromNow()}
      </Typography>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={submit}
          disabled={Object.values(formData).some((v) => v?.errorMsg?.length > 0)}
        >
          Update profile
        </Button>
      </Box>
    </Stack>
  );
};

export default ProfileForm;
