import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

/**
 * useFetchFavouriteItems ...
 *
 * retrieves a list of favourite items based on the creator
 * @param {id} string - the userId of the logged in user
 */
export const useFetchFavouriteItems = (userId) => {
  return useQuery({
    queryKey: ['favouriteItems', userId],
    queryFn: async () => {
      if (!userId) return [];

      const response = await client.models.FavouriteItems.list({
        filter: {
          createdProfileIdRef: {
            eq: userId,
          },
        },
        selectionSet: [
          'id',
          'categoryIdRef',
          'categoryId.*',
          'maintenancePlanIdRef',
          'maintenancePlanId.*',
          'createdAt',
          'createdBy.*',
          'updatedAt',
          'updatedBy.*',
        ],
      });

      return response.data || [];
    },
    enabled: !!userId,
  });
};

/**
 * useCreateFavouriteItem ...
 *
 * creates a favourite item for a selected user
 */
export const useCreateFavouriteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (favouriteItem) => {
      if (!favouriteItem) throw new Error('Favourite Item details is required for creation');
      const { data, errors } = await client.models.FavouriteItems.create(favouriteItem);
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favouriteItems'] });
    },
  });
};

/**
 * useUpdateFavouriteItem ...
 *
 * updates a favourite item
 */
export const useUpdateFavouriteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (favouriteItem) => {
      if (!favouriteItem) throw new Error('Favourite Item details is required for update');
      const { data, errors } = await client.models.FavouriteItems.update(favouriteItem);
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favouriteItems'] });
    },
  });
};

/**
 * useRemoveFavouriteItem ...
 *
 * removes a favourite item
 */
export const useRemoveFavouriteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      if (!id) throw new Error('Favourite Item ID is required for deletion');
      const { data, errors } = await client.models.FavouriteItems.delete({ id });
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favouriteItems'] });
    },
  });
};
