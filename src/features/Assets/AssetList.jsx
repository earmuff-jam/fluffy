import { useEffect, useMemo, useState } from 'react';

import { ListItemIcon, MenuItem, Stack } from '@mui/material';
import { AddRounded, EditRounded, FileOpenRounded, PlaylistAddRounded, RemoveCircleRounded } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

import { ConfirmationBoxModal, EmptyComponent, pluralizeWord } from '@common/utils';
import { ASSETS_LIST_HEADERS, MODAL_STATE, ASSET_LIST_HEADERS } from '@features/Assets/constants';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useFetchAssets, useRemoveAssets } from '@services/assetsApi';

import SimpleModal from '@common/SimpleModal';
import AddAssetsInBulk from '@features/Assets/AddAssetsInBulk/AddAssetsInBulk';
import AddAssetDetails from '@features/Assets/AddAssetFormDetails/AddAssetDetails';
import AssetDetailsDrawer from '@features/Assets/AssetDetailsDrawer/AssetDetailsDrawer';

import RowHeader from '@common/RowHeader';
import DataTable from '@common/DataTable/DataTable';
import { useMaterialReactTable } from 'material-react-table';

export default function AssetList() {
  const navigate = useNavigate();
  const { user } = useAuthenticator();

  const { data: assets = [], isLoading, isFetching } = useFetchAssets(user.userId);
  const { mutate: removeAsset } = useRemoveAssets();

  const [options, setOptions] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]); // display more details

  const [idToDelete, setIdToDelete] = useState(-1);
  const [openDialog, setOpenDialog] = useState(false);
  const [modalState, setModalState] = useState(MODAL_STATE.NONE);

  const handleCloseModal = () => setModalState(MODAL_STATE.NONE);

  const handleRemoveAsset = (id) => {
    setOpenDialog(true);
    setIdToDelete([id]);
  };

  const reset = () => {
    setOpenDialog(false);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      return;
    }
    removeAsset(idToDelete);
    reset();
  };

  const columns = useMemo(() => ASSETS_LIST_HEADERS, []);

  const table = useMaterialReactTable({
    columns,
    data: assets,
    enableSorting: true,
    enableFilters: true,
    enableFullScreenToggle: false,
    enableRowActions: true,
    enableTopToolbar: true,
    enableColumnResizing: false,
    enableDensityToggle: false,
    enablePagination: assets.length > 0,
    initialState: {
      density: 'comfortable',
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiTableHeadRowProps: {
      sx: { padding: '1rem' },
    },
    muiTableBodyRowProps: {
      sx: { padding: '0.2rem' },
    },
    renderEmptyRowsFallback: () => <EmptyComponent padding="1rem 1rem" subtitle="Add new asset" />,
    state: {
      isLoading: isLoading || isFetching,
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          closeMenu();
          handleRemoveAsset(row.original.id);
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <RemoveCircleRounded color="error" fontSize="small" />
        </ListItemIcon>
        Remove
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          closeMenu();
          navigate(`/inventories/${row.original.id}/update`);
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <EditRounded color="primary" fontSize="small" />
        </ListItemIcon>
        Edit
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          closeMenu();
          setSelectedRow(row.original);
          setModalState(MODAL_STATE.MORE_DETAILS);
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <FileOpenRounded color="primary" fontSize="small" />
        </ListItemIcon>
        More details
      </MenuItem>,
    ],
  });

  useEffect(() => {
    if (Array.isArray(assets)) {
      setOptions(assets);
    }
  }, [isFetching]);

  return (
    <Stack flexGrow="1" spacing={2} data-tour="assets-0">
      <RowHeader
        title="Assets"
        caption={`Viewing ${pluralizeWord('asset detail', options?.length)}`}
        primaryButtonTextLabel="Add Asset"
        primaryStartIcon={<AddRounded />}
        handleClickPrimaryButton={() => setModalState(MODAL_STATE.ADD_ITEM)}
        primaryBtnDataTour="assets-1"
        secondaryButtonTextLabel="Add Bulk"
        secondaryStartIcon={<PlaylistAddRounded />}
        handleClickSecondaryButton={() => setModalState(MODAL_STATE.BULK_ITEM)}
        secondaryBtnDataTour="assets-2"
      />
      <DataTable table={table} />
      {modalState === MODAL_STATE.ADD_ITEM && (
        <SimpleModal title="Add New Item" handleClose={handleCloseModal} maxSize="sm">
          <AddAssetDetails handleClose={handleCloseModal} />
        </SimpleModal>
      )}
      {modalState === MODAL_STATE.BULK_ITEM && (
        <SimpleModal
          title="Add Bulk Item"
          subtitle="Upload inventory items in bulk with the selected template."
          handleClose={handleCloseModal}
          maxSize="sm"
        >
          <AddAssetsInBulk handleClose={handleCloseModal} />
        </SimpleModal>
      )}
      {modalState === MODAL_STATE.MORE_DETAILS && (
        <AssetDetailsDrawer
          columns={Object.values(ASSET_LIST_HEADERS)}
          resetSelection={handleCloseModal}
          title="View Item Details"
          selectedRow={selectedRow}
        />
      )}
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
