import * as React from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Skeleton } from "@mui/material";
import EmptyComponent from "@utils/EmptyComponent";
import ItemCard from "@common/ItemCard/ItemCard";
import ConfirmationBox from "@utils/ConfirmationBox";
import { CategoryType } from "@features/categories/types";

dayjs.extend(relativeTime);

interface ISectionCardContentProps {
  content: Array<CategoryType>;
  loading: boolean;
  displayModal: boolean;
  setDisplayModal: (value: boolean) => void;
  setSelectedID: (value: string) => void;
  removeItem: (value: string) => void;
  prefixURI: string;
}

const SectionCardContent: React.FunctionComponent<ISectionCardContentProps> = ({
  content,
  loading,
  displayModal,
  setDisplayModal,
  setSelectedID,
  removeItem,
  prefixURI,
}) => {
  const [idToDelete, setIdToDelete] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = (id: string) => {
    setOpenDialog(true);
    setIdToDelete(id);
  };

  const handleEdit = (id: string) => {
    setDisplayModal(true);
    setSelectedID(id);
  };
  const resetConfirmationBox = () => {
    setOpenDialog(false);
    setIdToDelete("");
  };

  const confirmDelete = (id: string) => {
    if (id === "") {
      return;
    }
    removeItem(id);
    resetConfirmationBox();
  };

  if (loading && !displayModal) {
    return <Skeleton height="10rem" />;
  }
  if (content?.length <= 0 || content == null) return <EmptyComponent />;

  return (
    <>
      <ItemCard
        data={content}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        prefixURI={prefixURI}
      />
      {openDialog ? (
        <ConfirmationBox
          title="Confirm deletion"
          handleClose={resetConfirmationBox}
          maxSize="xs"
          deleteID={idToDelete}
          confirmDelete={confirmDelete}
        />
      ) : null}
    </>
  );
};

export default SectionCardContent;
