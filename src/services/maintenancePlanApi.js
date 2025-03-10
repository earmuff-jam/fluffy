import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

const client = generateClient();

/**
 * useFetchMaintenancePlans ...
 *
 * returns a list of all the maintenance plans
 */
export const useFetchMaintenancePlans = (userId) => {
  return useQuery({
    queryKey: ['maintenancePlans'],
    queryFn: async () => {
      const response = await client.models.MaintenancePlans.list({
        filter: {
          createdMaintenancePlanIdRef: {
            eq: userId,
          },
        },
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
    enabled: !!userId,
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
        selectionSet: ['id', 'assetId.*', 'assetId.storageLocationId.*', 'maintenancePlanId.*'],
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
      const { data, errors } = await client.models.MaintenancePlans.create(plan);
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
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenancePlans'] });
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
      const { data, errors } = await client.models.MaintenancePlans.list();
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: (rawData) => {
      if (!rawData || rawData.length === 0) {
        console.warn('No plans to download.');
        return;
      }

      const formattedData = rawData.map(
        ({ id, activity_id, created_by, updated_by, sharable_groups, status, ...rest }) => rest
      );

      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wsColsWidth = Object.values(formattedData[0] || {}).map((v) => ({ wch: v.length > 10 ? v.length : 10 }));
      ws['!cols'] = wsColsWidth;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, dayjs().format('YYYY-MM-DD'));

      XLSX.writeFile(wb, 'plan.xlsx');
    },
  });
};
