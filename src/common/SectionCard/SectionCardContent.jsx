import { useState } from 'react';

import { Box, Skeleton, Stack } from '@mui/material';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import SectionCardDetails from '@common/SectionCard/SectionCardDetails';
import { ConfirmationBoxModal, EmptyComponent } from '@utils/utils';

dayjs.extend(relativeTime);

const SectionCardContent = ({
  content,
  loading,
  displayModal,
  setDisplayModal,
  setSelectedID,
  removeItem,
  prefixURI,
  emptyComponentSubtext = '',
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);

  const handleDelete = (id) => {
    setOpenDialog(true);
    setIdToDelete(id);
  };

  const handleEdit = (id) => {
    setDisplayModal(true);
    setSelectedID(id);
  };
  const resetConfirmationBox = () => {
    setOpenDialog(false);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      return;
    }
    removeItem(id);
    resetConfirmationBox();
  };

  if (loading && !displayModal) {
    return <Skeleton height="10rem" />;
  }
  if (content?.length <= 0 || content == null) return <EmptyComponent subtitle={emptyComponentSubtext} />;

  return (
    <>
      <Box sx={{ overflow: 'auto', paddingBottom: '1rem' }}>
        <Stack spacing={{ xs: 2 }} direction="row" useFlexGap flexWrap="wrap">
          {content?.map((item, index) => (
            <SectionCardDetails
              key={index}
              item={item}
              index={index}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              prefixURI={prefixURI}
            />
          ))}
        </Stack>
      </Box>
      <ConfirmationBoxModal
        openDialog={openDialog}
        title="Confirm deletion"
        handleClose={resetConfirmationBox}
        maxSize="xs"
        deleteID={idToDelete}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default SectionCardContent;
