import dayjs from 'dayjs';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { generateClient } from 'aws-amplify/data';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { getUrl, uploadData } from 'aws-amplify/storage';

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
  'createdAssetIdRef',
  'createdBy.*',
  'updatedAt',
  'updatedAssetIdRef',
  'updatedBy.*',
  'storageLocationId.*',
];

/**
 * useFetchAssets ...
 *
 * retrieves a list of all the assets for a selected userId
 */
export const useFetchAssets = (userId) => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const response = await client.models.Assets.list({
        filter: {
          createdAssetIdRef: {
            eq: userId,
          },
        },
        selectionSet: assetWithStorageLocationCols,
      });
      return response.data || [];
    },
    enabled: !!userId,
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
export const useFetchAssetReportByDate = (dateStr, userId) => {
  return useQuery({
    queryKey: ['asset', dateStr],
    queryFn: async () => {
      const response = await client.models.Assets.list({
        selectionSet: assetWithStorageLocationCols,
        filter: {
          createdAssetIdRef: {
            eq: userId,
          },
          updatedAt: {
            ge: dateStr,
          },
        },
      });
      return response.data || [];
    },
    enabled: !!dateStr && !!userId,
  });
};

/**
 * useFetchAssetsFromCategoryByDate ...
 *
 * retrieves the list of assets filtered by the date param that belongs to at least
 * one category
 *
 * @param {string} dateStr - the string representation of the datetime field
 * @param {string} userId - the string representation of the user id
 */
export const useFetchAssetsFromCategoryByDate = (dateStr, userId) => {
  return useQuery({
    queryKey: ['assetsAssociatedWithCategoryByUserId', dateStr],
    queryFn: async () => {
      const response = await client.models.CategoryItems.list({
        filter: {
          createdCategoryItemsIdRef: {
            eq: userId,
          },
          updatedAt: {
            ge: dateStr,
          },
        },
        selectionSet: ['id', 'assetId.*', 'assetId.storageLocationId.*', 'categoryId.*'],
      });
      return response.data || [];
    },
    enabled: !!dateStr && !!userId,
    select: (data) => data.map((item) => item.assetId),
  });
};

/**
 * useDownloadAssetsList ...
 *
 * downloads the list of all assets within a selected time period
 * @param {string} dateStr - the string representation of the datetime field
 */
export const useDownloadAssetsList = (dateStr) => {
  return useQuery({
    queryKey: ['downloadAssetList'],
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
    enabled: false,
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
 * useFetchAssetPhoto ...
 *
 * retrieves the asset photo if it exists from s3 bucket
 *
 * @param {string} id - the uuid representation of the file
 */
export const useFetchAssetPhoto = (imagePathWithId) => {
  return useQuery({
    queryKey: ['assetPhoto'],
    queryFn: async () => {
      if (!imagePathWithId) {
        return null;
      }

      const file = await getUrl({
        path: imagePathWithId,
      });

      return file || null;
    },
    enabled: !!imagePathWithId,
  });
};

/**
 * useUploadAssetPhoto ...
 *
 * uploads the asset photo for the selected asset. also
 * updates the database with proper reference for asset img
 *
 */
export const useUploadAssetPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, selectedImage, data }) => {
      if (!id || !selectedImage) {
        throw new Error('Required fields are missing for upload.');
      }

      const uploadResponse = uploadData({
        path: `photos/${id}`,
        data: selectedImage,
      });

      const result = await uploadResponse.result;
      await client.models.Assets.update({
        ...data,
        imageURL: result?.path,
      });

      return id;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['asset', id]);
      queryClient.invalidateQueries(['assetPhoto']);
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
  const { user } = useAuthenticator();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (assets) => {
      if (assets.length === 0) {
        throw new Error('Assets are required for creation.');
      }

      const uniqueStorageLocations = [...new Set(assets.map((asset) => asset.storageLocation))];

      let existingLocationMap = new Map();
      for (const location of uniqueStorageLocations) {
        try {
          const { data } = await client.models.StorageLocations.list({
            filter: {
              location: {
                eq: location,
              },
            },
          });

          if (data?.length > 0) {
            existingLocationMap.set(location, data[0].id);
          }
        } catch (error) {
          console.warn(`Failed to check storage location: ${location}`);
        }
      }

      const missingLocations = uniqueStorageLocations.filter((loc) => !existingLocationMap.has(loc));

      if (missingLocations.length > 0) {
        try {
          await Promise.all(
            missingLocations.map(async (location) => {
              const { data, errors } = await client.models.StorageLocations.create({
                location,
                storageLocationPoint: { lat: 0, lon: 0 },
                createdAt: dayjs().toISOString(),
                createdLocationIdRef: user.userId,
                updatedAt: dayjs().toISOString(),
                updatedLocationIdRef: user.userId,
              });

              if (errors) {
                throw new Error(`Failed to create storage location: ${location}`);
              }

              existingLocationMap.set(location, data.id);
              return data;
            })
          );
        } catch (error) {
          throw new Error('Failed to create required storage locations.');
        }
      }

      try {
        const createPromises = assets.map(async (asset) => {
          const storageLocationIdRef = existingLocationMap.get(asset.storageLocation);
          if (!storageLocationIdRef) {
            throw new Error(`Storage location ID not found for: ${asset.storageLocation}`);
          }

          const assetData = {
            ...asset,
            storageLocationIdRef,
            createdAt: dayjs().toISOString(),
            createdAssetIdRef: user.userId,
            updatedAt: dayjs().toISOString(),
            updatedAssetIdRef: user.userId,
          };
          delete assetData.storageLocation;

          const { data, errors } = await client.models.Assets.create(assetData);

          if (errors) {
            throw new Error(JSON.stringify(errors, null, 2));
          }
          return data;
        });

        return await Promise.all(createPromises);
      } catch (error) {
        throw new Error('Failed to create assets.');
      }
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
    onSuccess: ({ asset }) => {
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
