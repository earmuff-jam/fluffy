import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

import { generateClient } from 'aws-amplify/data';
import { useAuthenticator } from '@aws-amplify/ui-react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const client = generateClient();

/**
 * useFetchAllCategories ...
 *
 * returns a list of all categories
 */
export const useFetchAllCategories = (userId) => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await client.models.Categories.list({
        filter: {
          createdCategoryIdRef: {
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
          'createdCategoryIdRef',
          'createdBy.*',
          'updatedAt',
          'updatedCategoryIdRef',
          'updatedBy.*',
        ],
      });
      return response.data || [];
    },
    enabled: !!userId,
  });
};

/**
 * useFetchCategoryById ...
 *
 * retrieves a selected category by the id
 * @param {string} id - the id of the selected category
 */
export const useFetchCategoryById = (id) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      const response = await client.models.Categories.get({ id: id });
      return response.data || {};
    },
    enabled: !!id,
  });
};

/**
 * useFetchAssetsAssociatedWithCategoryById ...
 *
 * retrieves selected assets that belongs to a specific category
 * @param {string} id - the id of the selected category
 */
export const useFetchAssetsAssociatedWithCategoryById = (id) => {
  return useQuery({
    queryKey: ['assetsAssociatedWithCategory', id],
    queryFn: async () => {
      if (!id) return [];

      const response = await client.models.CategoryItems.list({
        filter: {
          categoryIdRef: {
            eq: id,
          },
        },
        selectionSet: ['id', 'assetId.*', 'assetId.storageLocationId.*', 'categoryId.*'],
      });

      return response.data || [];
    },
    enabled: !!id,
  });
};

/**
 * useFetchAssetsAssociatedWithCategoriesByUserId ...
 *
 * retrieves the list of assets that belong to at least one category,
 * created by the selected user. This is used for the overview page
 * to display assets that are associated to at least one category.
 *
 * @param {string} userId - the userId that references the creator
 */
export const useFetchAssetsAssociatedWithCategoriesByUserId = (userId) => {
  return useQuery({
    queryKey: ['assetsAssociatedWithCategoryByUserId', userId],
    queryFn: async () => {
      if (!userId) return [];

      const response = await client.models.CategoryItems.list({
        filter: {
          createdCategoryItemsIdRef: {
            eq: userId,
          },
        },
        selectionSet: ['id', 'assetId.*', 'assetId.storageLocationId.*', 'categoryId.*'],
      });

      return response.data || [];
    },
    enabled: !!userId,
  });
};

/**
 * useCreateCategory ...
 *
 * create a new category
 */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category) => {
      if (!category) throw new Error('Category details is required for creation.');
      const { data, errors } = await client.models.Categories.create(category);
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

/**
 * useCreateAssociationForItemsWithCategory ...
 *
 * creates association for items with a selected category.
 */
export const useCreateAssociationForItemsWithCategory = () => {
  const { user } = useAuthenticator();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ categoryId, assetIds }) => {
      if (!categoryId || !assetIds || assetIds.length === 0) {
        throw new Error('Both categoryId and assetIds are required.');
      }

      const createPromises = assetIds.map(async (assetId) => {
        const { data, errors } = await client.models.CategoryItems.create({
          categoryIdRef: categoryId,
          assetIdRef: assetId,
          createdCategoryItemsIdRef: user.userId,
          updatedCategoryItemsIdRef: user.userId,
        });

        if (errors) throw new Error(errors);
        return data;
      });

      return await Promise.all(createPromises);
    },
    onSuccess: (_, { categoryId }) => {
      queryClient.invalidateQueries({ queryKey: ['assetsAssociatedWithCategory', categoryId] });
    },
  });
};

/**
 * useRemoveAssociationForAssetsWithCategory ...
 *
 * removes association for items with a selected category
 */
export const useRemoveAssociationForAssetsWithCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ categoryId, ids }) => {
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new Error('Category Items IDs is required for deletion.');
      }

      const deletePromises = ids.map(async (id) => {
        const { data, errors } = await client.models.CategoryItems.delete({ id });
        if (errors) throw new Error(errors);
        return data;
      });

      return Promise.all(deletePromises);
    },
    onSuccess: (_, { categoryId }) => {
      queryClient.invalidateQueries({ queryKey: ['assetsAssociatedWithCategory', categoryId] });
    },
  });
};

/**
 * useUpdateCategory ...
 *
 * updates an existing category
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category) => {
      if (!category) throw new Error('Category details is required for update');
      const { data, errors } = await client.models.Categories.update(category);
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

/**
 * useRemoveCategory ...
 *
 * removes a selected category when an id is passed in
 */
export const useRemoveCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      if (!id) throw new Error('Category ID is required for deletion.');
      const { data, errors } = await client.models.Categories.delete({ id });
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

/**
 * useDownloadCategories ...
 *
 * download the list of categories
 */
export const useDownloadCategories = () => {
  return useMutation({
    mutationFn: async () => {
      const { data, errors } = await client.models.Categories.list();
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: (rawData) => {
      if (!rawData || rawData.length === 0) {
        console.warn('No categories to download.');
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

      XLSX.writeFile(wb, 'categories.xlsx');
    },
  });
};
