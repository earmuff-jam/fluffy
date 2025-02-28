import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();
const assetWithStorageLocationDetails = [
  'id',
  'name',
  'description',
  'price',
  'status',
  'barcode',
  'sku',
  'color',
  'imageURL',
  'quantity',
  'boughtAt',
  'isBookmarked',
  'isReturnable',
  'returnLocation',
  'returnDatetime',
  'returnNotes',
  'maxWeight',
  'minWeight',
  'maxHeight',
  'minHeight',
  'createdAt',
  'updatedAt',
  'storageLocationId.*',
];

export const useAssets = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const response = await client.models.Assets.list({
        assetWithStorageLocationDetails,
      });
      return response.data || [];
    },
  });
};

export const useAssetById = (id) => {
  return useQuery({
    queryKey: ['asset', id],
    queryFn: async () => {
      const response = await client.models.Assets.get({ id: id }, { selectionSet: assetWithStorageLocationDetails });
      return response.data || [];
    },
    enabled: !!id,
  });
};

export const useCreateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (asset) => {
      if (!asset) throw new Error('Asset details is required for creation.');
      const { data, errors } = await client.models.Assets.create(asset);
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
};

export const useUpdateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (asset) => {
      if (!asset) throw new Error('Asset details is required for update');
      const { data, errors } = await client.models.Assets.update(asset);
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      queryClient.invalidateQueries({ queryKey: ['asset', asset.id] }); // used when updating selected asset
    },
  });
};

// removes multiple ids if necessary
export const useRemoveAssets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids) => {
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new Error('Asset IDs is required for deletion.');
      }

      const deletePromises = ids.map(async (id) => {
        const { data, errors } = await client.models.Assets.delete({ id });
        if (errors) throw new Error(errors);
        return data;
      });

      return Promise.all(deletePromises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
};
