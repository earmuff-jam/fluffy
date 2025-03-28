import { generateClient } from 'aws-amplify/data';
import { getUrl, uploadData } from 'aws-amplify/storage';
import { useAuthenticator } from '@aws-amplify/ui-react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const client = generateClient();

/**
 * useFetchAllCategories ...
 *
 * returns a list of all categories
 */
export const useFetchAllCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await client.models.Categories.list({
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
      const response = await client.models.Categories.get({
        id: id,
      });

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
        selectionSet: [
          'id',
          'assetId.*',
          'assetId.storageLocationId.*',
          'assetId.createdBy.*',
          'assetId.updatedBy.*',
          'categoryId.*',
        ],
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
 * useFetchCategoryPhoto ...
 *
 * retrieves the category photo if it exists from s3 bucket
 *
 * @param {string} id - the uuid representation of the file
 */
export const useFetchCategoryPhoto = (imagePathWithId) => {
  return useQuery({
    queryKey: ['categoryPhoto'],
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
 * useUploadCategoryPhoto ...
 *
 * uploads the category photo for the selected category. also
 * updates the database with proper reference for category img
 *
 */
export const useUploadCategoryPhoto = () => {
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
      await client.models.Categories.update({
        ...data,
        imageURL: result?.path,
      });

      return id;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['category', id]);
      queryClient.invalidateQueries(['categoryPhoto']);
    },
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
      const { data, errors } = await client.models.Categories.create(category, {
        authMode: 'userPool',
      });

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
    mutationFn: async ({ ids }) => {
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
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['category', id] });
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

      const { data: favItem, error: favItemErr } = await client.models.FavouriteItems.list({
        filter: {
          categoryIdRef: {
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
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['favouriteItems', data.createdCategoryIdRef] });
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
      const response = await client.models.Categories.list({
        selectionSet: ['name', 'description', 'color', 'status', 'location.*', 'updatedBy.*'],
      });
      return response.data || [];
    },
  });
};
