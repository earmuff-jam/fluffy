import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { ConfirmationBoxModal } from '@common/utils';
import { MODAL_STATE } from '@features/Assets/constants';
import AssetListHeader from '@features/Assets/AssetListHeader/AssetListHeader';
import AssetListContent from '@features/Assets/AssetListContent/AssetListContent';
import { useAssets, useRemoveAssets } from '@services/assets';

export default function AssetList() {
  const { assets = [], isLoading } = useAssets();
  const { mutate: removeAsset } = useRemoveAssets();

  const [options, setOptions] = useState([]);
  const [rowSelected, setRowSelected] = useState([]); // this is for checkbox and associated actions
  const [gridMode, setGridMode] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);
  const [modalState, setModalState] = useState(MODAL_STATE.NONE);

  const handleCloseModal = () => setModalState(MODAL_STATE.NONE);

  const handleRemoveAsset = () => {
    setOpenDialog(true);
    setIdToDelete(rowSelected);
  };

  const reset = () => {
    setOpenDialog(false);
    setRowSelected([]);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      return;
    }
    removeAsset(rowSelected);
    reset();
  };

  useEffect(() => {
    if (Array.isArray(assets)) {
      setOptions(assets);
    }
  }, [isLoading]);

  return (
    <Stack flexGrow="1" spacing={2} data-tour="assets-0">
      <AssetListHeader
        gridMode={gridMode}
        setGridMode={setGridMode}
        options={options}
        setOptions={setOptions}
        inventories={assets}
        setModalState={setModalState}
        handleRemoveAsset={handleRemoveAsset}
        disableDelete={rowSelected.length <= 0}
      />
      <AssetListContent
        loading={isLoading}
        modalState={modalState}
        setModalState={setModalState}
        gridMode={gridMode}
        inventories={assets}
        options={options}
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
        handleCloseModal={handleCloseModal}
      />
      <ConfirmationBoxModal
        openDialog={openDialog}
        title="Confirm deletion"
        handleClose={reset}
        maxSize="xs"
        deleteID={idToDelete}
        confirmDelete={confirmDelete}
      />
    </Stack>
  );
}
