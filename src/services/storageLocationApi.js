import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

/**
 * useFetchStorageLocations ...
 *
 * retrieves a list of storage locations
 */
export const useFetchStorageLocations = () => {
  return useQuery({
    queryKey: ['storageLocations'],
    queryFn: async () => {
      const response = await client.models.StorageLocations.list();
      return response.data || [];
    },
  });
};

/**
 * useCreateStorageLocation ...
 *
 * creates a new storage location
 */
export const useCreateStorageLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (storageLocation) => {
      if (!storageLocation) throw new Error('Storage Location is required for creation.');
      const { data, errors } = await client.models.StorageLocations.create(storageLocation);
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storageLocations'] });
    },
  });
};

/**
 * useUpdateStorageLocation ...
 *
 * updates an existing storage location
 */
export const useUpdateStorageLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (storageLocation) => {
      if (!storageLocation) throw new Error('StorageLocation details is required for update');
      const { data, errors } = await client.models.StorageLocations.update(storageLocation);
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storageLocations'] });
    },
  });
};

/**
 * useRemoveStorageLocation ...
 *
 * removes an existing storage location
 *
 */
export const useRemoveStorageLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      if (!id) throw new Error('StorageLocation ID is required for deletion.');
      const { data, errors } = await client.models.StorageLocations.delete({ id });
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storageLocations'] });
    },
  });
};
