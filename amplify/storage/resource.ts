import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'fleetwise',
  isDefault: true,
  access: (allow) => ({
    'photos/*': [allow.authenticated.to(['read', 'write', 'delete'])],
  }),
});
