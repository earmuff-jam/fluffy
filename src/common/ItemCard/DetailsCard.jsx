import { useState } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Card, CardMedia, Paper, Stack } from '@mui/material';

import { produce } from 'immer';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import SimpleModal from '@common/SimpleModal';
import SharableGroups from '@common/SharableGroups';
import ImagePicker from '@common/ImagePicker';
import LocationPicker from '@common/LocationPicker';
import DetailsCardItemContent from '@common/ItemCard/ItemContent/DetailsCardItemContent';
import DetailsCardItemActions from '@common/ItemCard/ItemContent/DetailsCardItemActions';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useUpdateCategory, useUploadCategoryPhoto } from '@services/categoriesApi';
import { useUpdateMaintenancePlan, useUploadMaintenancePlanPhoto } from '@services/maintenancePlanApi';

dayjs.extend(relativeTime);

export default function DetailsCard({
  selectedItem,
  selectedImage,
  favBtnDataTour,
  imageBtnDataTour,
  shareBtnDataTour,
  categoryMode = false,
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
      uploadCategoryPhoto({ id, selectedImage });
    } else {
      uploadMaintenancePlanPhoto({ id, selectedImage });
    }

    enqueueSnackbar('New image upload successful.', {
      variant: 'success',
    });

    setEditImgMode(false);
  };

  const updateCollaborators = (sharableGroups) => {
    const newMembers = sharableGroups.map((v) => v.value);

    if (categoryMode) {
      const draftSelectionDetails = produce(selectedItem, (draft) => {
        draft.updatedCategoryIdRef = user.userId;
        draft.collaborators = newMembers;
      });
      updateCategory(draftSelectionDetails);
      enqueueSnackbar('Updated collaborators for selected category.', {
        variant: 'success',
      });
    } else {
      const draftSelectionDetails = produce(selectedItem, (draft) => {
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
      <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Card sx={{ flexGrow: 1 }}>
          <CardMedia sx={{ height: '10rem' }} image={selectedImage?.url || '/blank_canvas.png'} />
          <DetailsCardItemContent
            selectedItem={selectedItem}
            categoryMode={categoryMode}
            favBtnDataTour={favBtnDataTour}
          />
          <DetailsCardItemActions
            selectedItem={selectedItem}
            handleOpenModal={handleOpenModal}
            setEditImgMode={setEditImgMode}
            imageBtnDataTour={imageBtnDataTour}
            shareBtnDataTour={shareBtnDataTour}
          />
        </Card>
        {selectedItem?.location?.lat ? (
          <Paper elevation={2} sx={{ width: { xs: '100%', sm: '20rem' }, height: 'inherit', flexGrow: 1 }}>
            <LocationPicker location={selectedItem?.location} height={'100%'} />
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
            existingGroups={selectedItem?.collaborators || []}
            creator={selectedItem?.createdBy}
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
          <ImagePicker id={selectedItem.id} name={selectedItem.name} handleUpload={handleUpload} disableCancel />
        </SimpleModal>
      )}
    </>
  );
}
