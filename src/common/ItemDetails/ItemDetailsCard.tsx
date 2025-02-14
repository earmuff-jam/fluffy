import * as React from 'react';

import dayjs from 'dayjs';
import { produce } from 'immer';

import relativeTime from 'dayjs/plugin/relativeTime';
import { Card, CardMedia, Paper, Stack } from '@mui/material';
import { SnackbarContent } from '@utils/types';

dayjs.extend(relativeTime);

interface IItemDetailsCardProps {
    selectedItem: string;
    selectedImage: string;
    favBtnDataTour: string;
    imageBtnDataTour: string;
    shareBtnDataTour: string;
    categoryMode: boolean;
}

const ItemDetailsCard: React.FunctionComponent<IItemDetailsCardProps> = ({
    selectedItem,
    selectedImage,
    favBtnDataTour,
    imageBtnDataTour,
    shareBtnDataTour,
    categoryMode = false,
}) => {
    const userID = localStorage.getItem('userID');

    const [editImgMode, setEditImgMode] = React.useState<boolean | undefined>(null);
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [snackbarContent, setSnackbarContent] = React.useState<SnackbarContent>(
        {
            open: false,
            message: null,
            severity: "success",
        }
    );

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleUpload = (id: string, selectedImage: string): void => {
        if (categoryMode) {
            // dispatch(categoryItemDetailsActions.uploadImage({ id: id, selectedImage: selectedImage }));
        } else {
            // dispatch(maintenancePlanItemActions.uploadImage({ id: id, selectedImage: selectedImage }));
        }
        setSnackbarContent({
            open: true,
            message: 'New image upload successful.',
            severity: "success",
        });
        setEditImgMode(false);
    };

    const updateCollaborators = (sharableGroups) => {
        const newMembers = sharableGroups.map((v) => v.value);
        const draftSelectionDetails = produce(selectedItem, (draft) => {
            draft.updated_by = userID;
            draft.sharable_groups = newMembers;
            if (categoryMode) {
                draft.status = draft.status_name;
            } else {
                draft.maintenance_status = draft.maintenance_status_name;
            }
        });
        if (categoryMode) {
            dispatch(categoryItemDetailsActions.updateCollaborators(draftSelectionDetails));
            enqueueSnackbar('Updated collaborators for selected category.', {
                variant: 'success',
            });
            if (!newMembers.includes(userID)) {
                navigate('/');
            }
        } else {
            dispatch(maintenancePlanItemActions.updateCollaborators(draftSelectionDetails));
            enqueueSnackbar('Updated collaborators for selected maintenance plan.', {
                variant: 'success',
            });
            if (!newMembers.includes(userID)) {
                navigate('/');
            }
        }
        handleCloseModal();
    };

    return (
        <>
            <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Card sx={{ flexGrow: 1 }}>
                    <CardMedia sx={{ height: '10rem' }} image={selectedImage || '/blank_canvas.png'} />
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
                        existingGroups={selectedItem?.sharable_groups || []}
                        creator={selectedItem?.created_by}
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

export default ItemDetailsCard;
