import * as React from 'react';

import { Stack } from '@mui/material';

import dayjs from 'dayjs';
import CustomMuiTable from '@common/CustomMuiTable/CustomMuiTable';
import { ASSET_LIST_TABLE_HEADERS } from '@features/assets/contants';
import { SelectedAssetType } from '@features/categories/types';

interface IAddItemProps {
    selectedIDList: string[];
    setSelectedIDList: (value: string[]) => void;
    associatedItems: SelectedAssetType[];
}

const AddItem: React.FunctionComponent<IAddItemProps> = ({
    selectedIDList, setSelectedIDList, associatedItems
}) => {
    const inventories = [];
    const loading = false;

    const handleRowSelection = (_, id) => {
        if (id === 'all') {
            if (selectedIDList.length !== 0) {
                setSelectedIDList([]);
            } else {
                setSelectedIDList(inventories.map((v) => v.id));
            }
        } else {
            const selectedIndex = selectedIDList.indexOf(id);
            let draftSelected = [];
            if (selectedIndex === -1) {
                draftSelected = draftSelected.concat(selectedIDList, id);
            } else if (selectedIndex === 0) {
                draftSelected = draftSelected.concat(selectedIDList.slice(1));
            } else if (selectedIndex === selectedIDList.length - 1) {
                draftSelected = draftSelected.concat(selectedIDList.slice(0, -1));
            } else if (selectedIndex > 0) {
                draftSelected = draftSelected.concat(
                    selectedIDList.slice(0, selectedIndex),
                    selectedIDList.slice(selectedIndex + 1)
                );
            }
            setSelectedIDList(draftSelected);
        }
    };

    const rowFormatter = (row, column) => {
        if (['created_at', 'updated_at'].includes(column)) {
            return dayjs(row[column]).fromNow();
        }
        if (['updater_name', 'creator_name'].includes(column)) {
            return row[column] ?? '-';
        }
        return row[column] ?? '-';
    };
    return (
        <Stack spacing={1}>
            <CustomMuiTable
                paper
                showActions={false}
                isLoading={loading}
                data={inventories.filter((inventory) => !associatedItems?.some((item) => item.id === inventory.id))}
                columns={Object.values(ASSET_LIST_TABLE_HEADERS).filter((v) => v.displayConcise)}
                rowFormatter={rowFormatter}
                selectedIDList={selectedIDList}
                handleRowSelection={handleRowSelection}
                emptyComponentSubtext="Add assets to associated them with selected plan."
            />
        </Stack>
    );
};

export default AddItem;
