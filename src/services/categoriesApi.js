import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

const client = generateClient();

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await client.models.Categories.list();
      return response.data || [];
    },
  });
};

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
