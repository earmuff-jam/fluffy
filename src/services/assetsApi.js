import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';
import dayjs from 'dayjs';

const client = generateClient();
const assetWithStorageLocationCols = [
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

/**
 * useFetchAssets ...
 *
 * retrieves a list of all the assets
 */
export const useFetchAssets = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const response = await client.models.Assets.list({
        selectionSet: assetWithStorageLocationCols,
      });
      return response.data || [];
    },
  });
};

/**
 * useFetchAssetById ...
 *
 * retrieves a selected asset by the id
 * @param {string} id - the id of the selected asset
 */
export const useFetchAssetById = (id) => {
  return useQuery({
    queryKey: ['asset', id],
    queryFn: async () => {
      const response = await client.models.Assets.get({ id: id }, { selectionSet: assetWithStorageLocationCols });
      return response.data || [];
    },
    enabled: !!id,
  });
};

/**
 * useFetchAssetReportByDate ...
 *
 * retrieves the list of assets filtered by the date param
 * @param {string} dateStr - the string representation of the datetime field
 */
export const useFetchAssetReportByDate = (dateStr) => {
  return useQuery({
    queryKey: ['asset', dateStr],
    queryFn: async () => {
      const response = await client.models.Assets.list({
        selectionSet: assetWithStorageLocationCols,
        filter: {
          updatedAt: {
            ge: dateStr,
          },
        },
      });
      return response.data || [];
    },
    enabled: !!dateStr,
  });
};

/**
 * useCreateAsset ...
 *
 * creates a new asset
 */
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

/**
 * useCreateAssetsInBulk ...
 *
 * creates new storage locations if they do not exist. retrieves the storage location id ref
 * and uses it to populate the asset object. creates a subsequent promise to create a new
 * asset with the storageLocationIdRef.
 *
 */
export const useCreateAssetsInBulk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (assets) => {
      if (assets.length === 0) {
        throw new Error('Assets are required for creation.');
      }

      const uniqueStorageLocations = [...new Set(assets.map((asset) => asset.storageLocation))];

      let existingLocations = [];
      try {
        const { data } = await client.models.StorageLocations.list({
          filter: { location: { $in: uniqueStorageLocations } },
        });
        existingLocations = data || [];
      } catch (error) {
        throw new Error('Failed to check storage locations.');
      }

      const existingLocationMap = new Map(existingLocations.map((loc) => [loc.location, loc.id]));

      const missingLocations = uniqueStorageLocations.filter((loc) => !existingLocationMap.has(loc));
      if (missingLocations.length > 0) {
        try {
          const createdLocations = await Promise.all(
            missingLocations.map(async (location) => {
              const { data, errors } = await client.models.StorageLocations.create({
                location,
                storageLocationPoint: { lat: 0, lon: 0 },
                createdAt: dayjs().toISOString(),
                updatedAt: dayjs().toISOString(),
              });

              if (errors) {
                throw new Error(`Failed to create storage location: ${location}`);
              }
              return data;
            })
          );

          createdLocations.forEach((loc) => {
            existingLocationMap.set(loc.location, loc.id);
          });
        } catch (error) {
          throw new Error('Failed to create required storage locations.');
        }
      }

      // try {
      //   const createPromises = assets.map(async (asset) => {
      //     const storageLocationIdRef = existingLocationMap.get(asset.storageLocation);
      //     if (!storageLocationIdRef) {
      //       throw new Error(`Storage location ID not found for: ${asset.storageLocation}`);
      //     }

      //     const assetData = {
      //       ...asset,
      //       storageLocationIdRef,
      //     };
      //     delete assetData.storageLocation;

      //     const { data, errors } = await client.models.Assets.create(assetData);

      //     if (errors) {
      //       console.error('Asset creation error:', errors);
      //       throw new Error(JSON.stringify(errors, null, 2));
      //     }
      //     return data;
      //   });

      //   return await Promise.all(createPromises);
      // } catch (error) {
      //   throw new Error('Failed to create assets.');
      // }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
};

/**
 * useUpdateAsset ...
 *
 * updates a specific asset with the details that are passed in
 */
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

/**
 * useRemoveAssets ...
 *
 * removes assets that are within the matching list of array of ids passed in
 */
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
