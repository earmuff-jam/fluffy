import { generateClient } from 'aws-amplify/data';
import { getUrl, uploadData } from 'aws-amplify/storage';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const client = generateClient();

/**
 * useFetchMaintenancePlans ...
 *
 * returns a list of all the maintenance plans
 */
export const useFetchMaintenancePlans = () => {
  return useQuery({
    queryKey: ['maintenancePlans'],
    queryFn: async () => {
      const response = await client.models.MaintenancePlans.list({
        selectionSet: [
          'id',
          'name',
          'description',
          'color',
          'status',
          'imageURL',
          'location.*',
          'createdAt',
          'createdMaintenancePlanIdRef',
          'createdBy.*',
          'updatedAt',
          'updatedMaintenancePlanIdRef',
          'updatedBy.*',
        ],
      });
      return response.data || [];
    },
  });
};

/**
 * useFetchMaintenancePlanById ...
 *
 * retrieves a selected maintenancePlan by the id
 * @param {string} id - the id of the selected maintenancePlan
 */
export const useFetchMaintenancePlanById = (id) => {
  return useQuery({
    queryKey: ['maintenancePlan', id],
    queryFn: async () => {
      const response = await client.models.MaintenancePlans.get({ id: id });

      return response.data || {};
    },
    enabled: !!id,
  });
};

/**
 * useFetchAssetsAssociatedWithMaintenancePlanById ...
 *
 * retrieves selected assets that belongs to a specific maintenance plan
 * @param {string} id - the id of the selected maintenance plan
 */
export const useFetchAssetsAssociatedWithMaintenancePlanById = (id) => {
  return useQuery({
    queryKey: ['assetsAssociatedWithMaintenancePlan', id],
    queryFn: async () => {
      if (!id) return [];

      const response = await client.models.MaintenancePlanItems.list({
        filter: {
          maintenancePlanIdRef: {
            eq: id,
          },
        },
        selectionSet: [
          'id',
          'assetId.*',
          'assetId.storageLocationId.*',
          'assetId.createdBy.*',
          'assetId.updatedBy.*',
          'maintenancePlanId.*',
        ],
      });

      return response.data || [];
    },
    enabled: !!id,
  });
};

/**
 * useFetchAssetsAssociatedWithMaintenancePlanByUserId ...
 *
 * retrieves the list of assets that belong to at least one maintenance plan,
 * created by the selected user. This is used for the overview page
 * to display assets that are associated to at least one maintenance plan.
 *
 * @param {string} userId - the userId that references the creator
 */
export const useFetchAssetsAssociatedWithMaintenancePlanByUserId = (userId) => {
  return useQuery({
    queryKey: ['assetsAssociatedWithMaintenancePlanByUserId', userId],
    queryFn: async () => {
      if (!userId) return [];

      const response = await client.models.MaintenancePlanItems.list({
        filter: {
          createdProfileIdRef: {
            eq: userId,
          },
        },
        selectionSet: ['id', 'assetId.*', 'assetId.storageLocationId.*', 'maintenancePlanId.*'],
      });

      return response.data || [];
    },
    enabled: !!userId,
  });
};

/**
 * useCreateMaintenancePlan ...
 *
 * creates a new maintenance plan
 */
export const useCreateMaintenancePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (plan) => {
      if (!plan) throw new Error('Maintenance plan details is required for creation.');
      const { data, errors } = await client.models.MaintenancePlans.create(plan, {
        authMode: 'userPool',
      });

      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenancePlans'] });
    },
  });
};

/**
 * useCreateAssociationForItemsWithMaintenancePlan ...
 *
 * creates association for items with a selected maintenance plan.
 */
export const useCreateAssociationForItemsWithMaintenancePlan = () => {
  const { user } = useAuthenticator();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ maintenancePlanId, assetIds }) => {
      if (!maintenancePlanId || !assetIds || assetIds.length === 0) {
        throw new Error('Both maintenancePlanId and assetIds are required.');
      }

      const createPromises = assetIds.map(async (assetId) => {
        const { data, errors } = await client.models.MaintenancePlanItems.create({
          maintenancePlanIdRef: maintenancePlanId,
          assetIdRef: assetId,
          createdProfileIdRef: user.userId,
          updatedProfileIdRef: user.userId,
        });

        if (errors) throw new Error(errors);
        return data;
      });

      return await Promise.all(createPromises);
    },
    onSuccess: (_, { maintenancePlanId }) => {
      queryClient.invalidateQueries({ queryKey: ['assetsAssociatedWithMaintenancePlan', maintenancePlanId] });
    },
  });
};

/**
 * useRemoveAssociationForAssetsWithMaintenancePlan ...
 *
 * removes association for items with a selected maintenance plan
 */
export const useRemoveAssociationForAssetsWithMaintenancePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ids }) => {
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new Error('Maintenance Plan Items IDs is required for deletion.');
      }

      const deletePromises = ids.map(async (id) => {
        const { data, errors } = await client.models.MaintenancePlanItems.delete({ id });
        if (errors) throw new Error(errors);
        return data;
      });

      return Promise.all(deletePromises);
    },
    onSuccess: (_, { maintenancePlanId }) => {
      queryClient.invalidateQueries({ queryKey: ['assetsAssociatedWithMaintenancePlan', maintenancePlanId] });
    },
  });
};

/**
 * useFetchMaintenancePlanPhoto ...
 *
 * retrieves the maintenance plan photo if it exists from s3 bucket
 *
 * @param {string} id - the uuid representation of the file
 */
export const useFetchMaintenancePlanPhoto = (imagePathWithId) => {
  return useQuery({
    queryKey: ['maintenancePlanPhoto'],
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
 * useUploadMaintenancePlanPhoto ...
 *
 * uploads the maintenance plan photo for the selected plan. also
 * updates the database with proper reference for plan img
 *
 */
export const useUploadMaintenancePlanPhoto = () => {
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

      await client.models.MaintenancePlans.update({
        ...data,
        imageURL: result?.path,
      });
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['maintenancePlan', id]);
      queryClient.invalidateQueries(['maintenancePlanPhoto']);
    },
  });
};

/**
 * useUpdateMaintenancePlan ...
 *
 * updates an existing maintenance plan
 */
export const useUpdateMaintenancePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (plan) => {
      if (!plan) throw new Error('Maintenance plan details is required for update');

      const { data, errors } = await client.models.MaintenancePlans.update(plan);

      if (errors) throw new Error(errors);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenancePlans'] });
    },
  });
};

/**
 * useRemoveMaintenancePlan ...
 *
 * removes a selected maintenance plan when an id is passed in
 */
export const useRemoveMaintenancePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      if (!id) throw new Error('Maintenance Plan ID is required for deletion.');

      const { data, errors } = await client.models.MaintenancePlans.delete({ id });

      const { data: favItem, error: favItemErr } = await client.models.FavouriteItems.list({
        filter: {
          maintenancePlanIdRef: {
            eq: id,
          },
        },
      });

      // only one favItem for categoryId can exists.
      if (!favItemErr && favItem.length === 1) {
        const currentAssetAssociationId = favItem.at(0);
        await client.models.FavouriteItems.delete({
          id: currentAssetAssociationId.id,
        });
      }

      if (errors) throw new Error(errors);

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['maintenancePlans'] });
      queryClient.invalidateQueries({ queryKey: ['favouriteItems', data.createdMaintenancePlanIdRef] });
    },
  });
};

/**
 * useDownloadMaintenancePlans ...
 *
 * download the list of maintenance plans
 */
export const useDownloadMaintenancePlans = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await client.models.MaintenancePlans.list({
        selectionSet: ['name', 'description', 'color', 'status', 'location.*', 'updatedBy.*'],
      });
      return response.data || [];
    },
  });
};
