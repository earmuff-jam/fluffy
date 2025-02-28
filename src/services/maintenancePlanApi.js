import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

const client = generateClient();

export const useFetchMaintenancePlans = () => {
  return useQuery({
    queryKey: ['maintenancePlans'],
    queryFn: async () => {
      const response = await client.models.MaintenancePlans.list();
      return response.data || [];
    },
  });
};

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
