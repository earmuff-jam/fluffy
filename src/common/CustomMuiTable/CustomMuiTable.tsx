import CustomTableBody from "@common/CustomMuiTable/CustomTableBody";
import CustomTableHeader from "@common/CustomMuiTable/CustomTableHeader";
import { SelectedAssetType } from "@features/categories/types";
import { Paper, Skeleton, Table, TableContainer } from "@mui/material";
import EmptyComponent from "@utils/EmptyComponent";
import { AssetListColumnHeader } from "@utils/types";


interface CustomMuiTableProps {
  paper?: boolean;
  showActions?: boolean;
  hideCheckBox?: boolean;
  hideIconButton?: boolean;
  hideMoreDetailsButton?: boolean;
  isLoading?: boolean;
  columns: AssetListColumnHeader[];
  data: any[];
  rowFormatter: (row: SelectedAssetType,
    columnName: string,
    columnData: AssetListColumnHeader) => string | JSX.Element;
  selectedIDList: string[];
  onRowSelect?: (value: SelectedAssetType) => void;
  handleRowSelection?: (ev: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  handleEdit?: (id: string) => void;
  emptyComponentSubtext?: string;
  maxHeight?: string;
}

const CustomMuiTable: React.FC<CustomMuiTableProps> = ({
  paper = false,
  showActions = true,
  hideCheckBox = false,
  hideIconButton = false,
  hideMoreDetailsButton = false,
  isLoading = false,
  columns,
  data,
  rowFormatter,
  selectedIDList,
  onRowSelect,
  handleRowSelection,
  handleEdit,
  emptyComponentSubtext = "",
  maxHeight = "20rem",
}) => {
  if (isLoading) return <Skeleton height="10vh" />;

  if (!data || data.length === 0) {
    return <EmptyComponent subtitle={emptyComponentSubtext} />;
  }

  return (
    <TableContainer component={paper ? Paper : undefined} sx={{ maxHeight }}>
      <Table>
        <CustomTableHeader
          columns={columns}
          selectedIDList={selectedIDList}
          showActions={showActions}
          hideCheckBox={hideCheckBox}
          handleRowSelection={handleRowSelection}
        />
        <CustomTableBody
          data={data}
          columns={columns}
          selectedIDList={selectedIDList}
          hideCheckBox={hideCheckBox}
          handleRowSelection={handleRowSelection}
          rowFormatter={rowFormatter}
          showActions={showActions}
          handleEdit={handleEdit}
          onRowSelect={onRowSelect}
          hideIconButton={hideIconButton}
          hideMoreDetailsButton={hideMoreDetailsButton}
        />
      </Table>
    </TableContainer>
  );
};

export default CustomMuiTable;
