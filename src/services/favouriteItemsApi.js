import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

export const useFetchFavouriteItems = () => {
  return useQuery({
    queryKey: ['favouriteItems'],
    queryFn: async () => {
      const response = await client.models.FavouriteItems.list();
      return response.data || [];
    },
  });
};

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
