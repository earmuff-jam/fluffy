import { useAuthenticator } from '@aws-amplify/ui-react';
import { FavoriteRounded } from '@mui/icons-material';
import { CardContent, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { useCreateFavouriteItem, useFetchFavouriteItems, useRemoveFavouriteItem } from '@services/favouriteItemsApi';

export default function DetailsCardItemContent({ selectedItem, categoryMode, favBtnDataTour }) {
  const { user } = useAuthenticator();

  const { data: favItems = [], isLoading } = useFetchFavouriteItems(user.userId);

  const createFavouriteItem = useCreateFavouriteItem();
  const removeFavouriteItem = useRemoveFavouriteItem();

  const isFavourite = favItems.some(
    (v) => v.categoryIdRef === selectedItem.id || v.maintenancePlanIdRef === selectedItem.id
  );

  const handleFavItem = async (_, selectedID, isFavourite) => {
    if (isFavourite) {
      const currentItems = favItems?.filter(
        (v) => v.categoryIdRef === selectedID || v.maintenancePlanIdRef === selectedID
      );
      removeFavouriteItem.mutateAsync(currentItems.find(() => true).id);
    } else {
      let draftFavItem = {};
      if (categoryMode) {
        draftFavItem = { categoryId: selectedID };
      } else {
        draftFavItem = { maintenancePlanId: selectedID };
      }
      createFavouriteItem.mutateAsync({
        categoryIdRef: draftFavItem.categoryId,
        maintenancePlanIdRef: draftFavItem.maintenancePlanId,
        createdProfileIdRef: user.userId,
      });
    }
  };

  return (
    <CardContent>
      <Stack direction="row" alignItems="flex-start">
        {isLoading ? (
          <Skeleton width="2rem" />
        ) : (
          <IconButton
            size="small"
            onClick={(ev) => handleFavItem(ev, selectedItem.id, isFavourite)}
            data-tour={favBtnDataTour}
          >
            <FavoriteRounded fontSize="small" sx={{ color: isFavourite ? selectedItem.color : 'secondary.main' }} />
          </IconButton>
        )}
        <Typography gutterBottom variant="h5">
          {selectedItem.name}
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        {selectedItem.description}
      </Typography>
    </CardContent>
  );
}
