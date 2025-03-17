import { useState } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Card, CardMedia, Paper, Stack } from '@mui/material';

import { produce } from 'immer';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import RowHeader from '@utils/RowHeader';
import SimpleModal from '@utils/SimpleModal';
import ImagePicker from '@utils/ImagePicker';
import SharableGroups from '@utils/SharableGroups';
import LocationPicker from '@utils/LocationPicker';

import DetailsCardItemContent from '@common/ItemDetails/DetailsCardItemContent';
import DetailsCardItemActions from '@common/ItemDetails/DetailsCardItemActions';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useFetchCategoryPhoto, useUpdateCategory, useUploadCategoryPhoto } from '@services/categoriesApi';
import { useUpdateMaintenancePlan, useUploadMaintenancePlanPhoto } from '@services/maintenancePlanApi';

dayjs.extend(relativeTime);

export default function ItemDetailsHeader({
  categoryMode = false,
  favBtnDataTour,
  imageBtnDataTour,
  shareBtnDataTour,
  label,
  caption,
  item,
  image,
}) {
  const navigate = useNavigate();
  const { user } = useAuthenticator();

  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: uploadCategoryPhoto } = useUploadCategoryPhoto();
  const { mutate: updateMaintenancePlan } = useUpdateMaintenancePlan();
  const { mutate: uploadMaintenancePlanPhoto } = useUploadMaintenancePlanPhoto();

  const [editImgMode, setEditImgMode] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleUpload = (id, selectedImage) => {
    if (categoryMode) {
      uploadCategoryPhoto({ id, selectedImage, data: item });
    } else {
      uploadMaintenancePlanPhoto({ id, selectedImage, data: item });
    }

    enqueueSnackbar('New image upload successful.', {
      variant: 'success',
    });

    setEditImgMode(false);
  };

  const updateCollaborators = (sharableGroups) => {
    const newMembers = sharableGroups.map((v) => v.value);

    if (categoryMode) {
      const draftSelectionDetails = produce(item, (draft) => {
        draft.updatedCategoryIdRef = user.userId;
        draft.collaborators = newMembers;
      });
      updateCategory(draftSelectionDetails);
      enqueueSnackbar('Updated collaborators for selected category.', {
        variant: 'success',
      });
    } else {
      const draftSelectionDetails = produce(item, (draft) => {
        draft.updatedMaintenancePlanIdRef = user.userId;
        draft.collaborators = newMembers;
      });
      updateMaintenancePlan(draftSelectionDetails);
      enqueueSnackbar('Updated collaborators for selected maintenance plan.', {
        variant: 'success',
      });
    }
    if (!newMembers.includes(user.userId)) {
      navigate('/');
    }
    handleCloseModal();
  };
  return (
    <>
      <RowHeader title={label} caption={caption} />
      <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Card sx={{ flexGrow: 1 }}>
          <CardMedia sx={{ height: '10rem' }} image={image?.url || '/blank_canvas.png'} />
          <DetailsCardItemContent selectedItem={item} categoryMode={categoryMode} favBtnDataTour={favBtnDataTour} />
          <DetailsCardItemActions
            selectedItem={item}
            handleOpenModal={handleOpenModal}
            setEditImgMode={setEditImgMode}
            imageBtnDataTour={imageBtnDataTour}
            shareBtnDataTour={shareBtnDataTour}
          />
        </Card>
        {item?.location?.lat ? (
          <Paper elevation={2} sx={{ width: { xs: '100%', sm: '20rem' }, height: 'inherit', flexGrow: 1 }}>
            <LocationPicker location={item?.location} height={'100%'} />
          </Paper>
        ) : null}
      </Stack>
      {openModal && (
        <SimpleModal
          title="Add sharable groups"
          subtitle="Assign collaborators."
          handleClose={handleCloseModal}
          maxSize="sm"
        >
          <SharableGroups
            handleSubmit={updateCollaborators}
            existingGroups={item?.collaborators || []}
            creator={item?.createdBy}
          />
        </SimpleModal>
      )}
      {editImgMode && (
        <SimpleModal
          title="Assign image"
          subtitle="Assign image to the selected item."
          handleClose={() => setEditImgMode(false)}
          maxSize="xs"
        >
          <ImagePicker id={item.id} name={item.name} handleUpload={handleUpload} disableCancel />
        </SimpleModal>
      )}
    </>
  );
}
