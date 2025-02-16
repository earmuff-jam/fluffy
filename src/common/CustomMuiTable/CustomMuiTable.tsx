import CustomTableBody from "@common/CustomMuiTable/CustomTableBody";
import CustomTableHeader from "@common/CustomMuiTable/CustomTableHeader";
import { Paper, Skeleton, Table, TableContainer } from "@mui/material";
import EmptyComponent from "@utils/EmptyComponent";

interface TableColumn {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string;
  [key: string]: any;
}

interface CustomMuiTableProps {
  paper?: boolean;
  showActions?: boolean;
  hideCheckBox?: boolean;
  hideIconButton?: boolean;
  hideMoreDetailsButton?: boolean;
  isLoading?: boolean;
  columns: TableColumn[];
  data: any[];
  rowFormatter: (row: any) => JSX.Element;
  selectedIDList: string[];
  onRowSelect: (id: string) => void;
  handleRowSelection: (id: string) => void;
  handleEdit: (id: string) => void;
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
