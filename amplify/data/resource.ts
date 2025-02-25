import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  // Profiles: a
  //   .model({
  //     id: a.id(),
  //     username: a.string(),
  //     full_name: a.string(),
  //     avatar_url: a.string(),
  //     email_address: a.string(),
  //     phone_number: a.string(),
  //     about_me: a.string(),
  //     imageURL: a.string(),
  //     appearance: a.boolean(),
  //     grid_view: a.boolean(),
  //     onlineStatus: a.boolean(),
  //     lastOnlineLocationPoint: a.customType({
  //       lat: a.float(),
  //       lon: a.float(),
  //     }),
  //     updated_at: a.string(),
  //     createdLocations: a.hasMany("StorageLocations", "createdLocationId"),
  //     updatedLocations: a.hasMany("StorageLocations", "updatedLocationId"),
  //     createdNotes: a.hasMany("Notes", "createdNoteId"),
  //     updatedNotes: a.hasMany("Notes", "updatedNoteId"),
  //     createdAssets: a.hasMany("Assets", "createdAssetId"),
  //     updatedAssets: a.hasMany("Assets", "updatedAssetId"),
  //     createdCategories: a.hasMany("Categories", "createdCategoryId"),
  //     updatedCategories: a.hasMany("Categories", "updatedCategoryId"),
  //     createdCategoryItems: a.hasMany(
  //       "CategoryItems",
  //       "createdCategoryItemsId"
  //     ),
  //     updatedCategoryItems: a.hasMany(
  //       "CategoryItems",
  //       "updatedCategoryItemsId"
  //     ),
  //     createdMaintenancePlans: a.hasMany(
  //       "MaintenancePlans",
  //       "createdMaintenancePlanId"
  //     ),
  //     updatedMaintenancePlans: a.hasMany(
  //       "MaintenancePlans",
  //       "updatedMaintenancePlanId"
  //     ),
  //     createdMaintenancePlanItems: a.hasMany(
  //       "MaintenancePlanItems",
  //       "createdProfileId"
  //     ),
  //     updatedMaintenancePlanItems: a.hasMany(
  //       "MaintenancePlanItems",
  //       "updatedProfileId"
  //     ),
  //     createdMaintenanceAlert: a.hasMany(
  //       "MaintenanceAlert",
  //       "createdProfileId"
  //     ),
  //     updatedMaintenanceAlert: a.hasMany(
  //       "MaintenanceAlert",
  //       "updatedProfileId"
  //     ),
  //     createdRecentActivities: a.hasMany(
  //       "RecentActivities",
  //       "createdProfileId"
  //     ),
  //     updatedRecentActivities: a.hasMany(
  //       "RecentActivities",
  //       "updatedProfileId"
  //     ),
  //     createdFavouriteItems: a.hasMany("FavouriteItems", "createdProfileId"),
  //     updatedFavouriteItems: a.hasMany("FavouriteItems", "updatedProfileId"),
  //   })
  //   .authorization((allow) => [allow.authenticated()]),

  // StorageLocations: a
  //   .model({
  //     id: a.id(),
  //     location: a.string(),
  //     storageLocationPoint: a.customType({
  //       lat: a.float(),
  //       lon: a.float(),
  //     }),
  //     created_at: a.string(),
  //     createdLocationId: a.id(),
  //     created_by: a.belongsTo("Profiles", "createdLocationId"),
  //     updated_at: a.string(),
  //     updatedLocationId: a.id(),
  //     updated_by: a.belongsTo("Profiles", "updatedLocationId"),
  //     sharable_groups: a.string().array(),
  //   })
  //   .authorization((allow) => [allow.authenticated()]),

  // Status: a
  //   .model({
  //     id: a.id(),
  //     name: a.string(),
  //     description: a.string(),
  //     statusId: a.id(),
  //     notes: a.hasMany("Notes", "statusId"),
  //     categories: a.hasMany("Categories", "statusId"),
  //     maintenancePlans: a.hasMany("MaintenancePlans", "statusId"),
  //   })
  //   .authorization((allow) => [allow.authenticated()]),

  Notes: a
    .model({
      id: a.id(),
      title: a.string(),
      description: a.string(),
      // statusId: a.id(),
      // status: a.belongsTo("Status", "statusId"),
      color: a.string(),
      completionDate: a.string(),
      location: a.customType({
        lat: a.float(),
        lon: a.float(),
      }),
      createdAt: a.string(),
      // createdNoteId: a.id(),
      // created_by: a.belongsTo("Profiles", "createdNoteId"),
      updatedAt: a.string(),
      // updatedNoteId: a.id(),
      // updated_by: a.belongsTo("Profiles", "updatedNoteId"),
      // sharable_groups: a.string().array(),
    })
    .authorization((allow) => [allow.authenticated()]),

  Assets: a
    .model({
      id: a.id(),
      name: a.string(),
      description: a.string(),
      price: a.float(),
      status: a.string(),
      barcode: a.string(),
      sku: a.string(),
      color: a.string(),
      // imageURL: a.string(),
      quantity: a.integer(),
      boughtAt: a.string(),
      location: a.customType({
        lat: a.float(),
        lon: a.float(),
      }),
      // storage_location_id: a.string(),
      isReturnable: a.boolean(),
      returnLocation: a.string(),
      returnDatetime: a.string(),
      returnNotes: a.string(),
       maxWeight: a.float(),
      minWeight: a.float(),
      maxHeight: a.float(),
      minHeight: a.float(),
      createdAt: a.string(),
  //     createdAssetId: a.id(),
  //     created_by: a.belongsTo("Profiles", "createdAssetId"),
      updatedAt: a.string(),
  //     updatedAssetId: a.id(),
  //     updated_by: a.belongsTo("Profiles", "updatedAssetId"),
  //     sharable_groups: a.string().array(),
  //     assetsInCategories: a.hasMany("CategoryItems", "assetId"),
  //     assetsInMaintenancePlans: a.hasMany("MaintenancePlanItems", "assetId"),
    })
    .authorization((allow) => [allow.authenticated()]),

  Categories: a
    .model({
      id: a.id(),
      name: a.string(),
      description: a.string(),
      color: a.string(),
      imageURL: a.string(),
      // statusId: a.id(),
      // status: a.belongsTo('Status', 'statusId'),
      location: a.customType({
        lat: a.float(),
        lon: a.float(),
      }),
      createdAt: a.string(),
      // createdCategoryId: a.id(),
      // created_by: a.belongsTo("Profiles", "createdCategoryId"),
      updatedAt: a.string(),
      // updatedCategoryId: a.id(),
      // updated_by: a.belongsTo("Profiles", "updatedCategoryId"),
      // sharable_groups: a.string().array(),
      // associatedCategories: a.hasMany("CategoryItems", "categoryId"),
      // associatedFavouriteCategories: a.hasMany("FavouriteItems", "categoryId"),
    })
    .authorization((allow) => [allow.authenticated()]),

  // CategoryItems: a
  //   .model({
  //     id: a.id(),
  //     categoryId: a.id(),
  //     category_id: a.belongsTo("Categories", "categoryId"),
  //     assetId: a.id(),
  //     item_id: a.belongsTo("Assets", "assetId"),
  //     created_at: a.string(),
  //     createdCategoryItemsId: a.id(),
  //     created_by: a.belongsTo("Profiles", "createdCategoryItemsId"),
  //     updated_at: a.string(),
  //     updatedCategoryItemsId: a.id(),
  //     updated_by: a.belongsTo("Profiles", "updatedCategoryItemsId"),
  //     sharable_groups: a.string().array(),
  //   })
  //   .authorization((allow) => [allow.authenticated()]),

  MaintenancePlans: a
    .model({
      id: a.id(),
      name: a.string(),
      description: a.string(),
      color: a.string(),
      imageURL: a.string(),
      // statusId: a.id(),
      // status: a.belongsTo("Status", "statusId"),
      // plan_due: a.string(),
      // plan_type: a.string(),
      location: a.customType({
        lat: a.float(),
        lon: a.float(),
      }),
      createdAt: a.string(),
      // createdMaintenancePlanId: a.id(),
      // created_by: a.belongsTo("Profiles", "createdMaintenancePlanId"),
      updatedAt: a.string(),
      // updatedMaintenancePlanId: a.id(),
      // updated_by: a.belongsTo("Profiles", "updatedMaintenancePlanId"),
      // sharable_groups: a.string().array(),
      // associatedMaintenancePlans: a.hasMany(
      //   "MaintenancePlanItems",
      //   "maintenancePlanId"
      // ),
      // associatedMaintenancePlanAlerts: a.hasMany(
      //   "MaintenanceAlert",
      //   "maintenancePlanId"
      // ),
      // associatedFavouriteMaintenancePlans: a.hasMany(
      //   "FavouriteItems",
      //   "maintenancePlanId"
      // ),
    })
    .authorization((allow) => [allow.authenticated()]),

  // MaintenancePlanItems: a
  //   .model({
  //     id: a.id(),
  //     maintenancePlanId: a.id(),
  //     maintenance_plan_id: a.belongsTo("MaintenancePlans", "maintenancePlanId"),
  //     assetId: a.id(),
  //     item_id: a.belongsTo("Assets", "assetId"),
  //     created_at: a.string(),
  //     createdProfileId: a.id(),
  //     created_by: a.belongsTo("Profiles", "createdProfileId"),
  //     updated_at: a.string(),
  //     updatedProfileId: a.id(),
  //     updated_by: a.belongsTo("Profiles", "updatedProfileId"),
  //     sharable_groups: a.string().array(),
  //   })
  //   .authorization((allow) => [allow.authenticated()]),

  // MaintenanceAlert: a
  //   .model({
  //     id: a.id(),
  //     maintenancePlanId: a.id(),
  //     maintenance_plan_id: a.belongsTo("MaintenancePlans", "maintenancePlanId"),
  //     name: a.string(),
  //     type: a.string(),
  //     plan_due: a.string(),
  //     is_read: a.boolean(),
  //     created_at: a.string(),
  //     createdProfileId: a.id(),
  //     created_by: a.belongsTo("Profiles", "createdProfileId"),
  //     updated_at: a.string(),
  //     updatedProfileId: a.id(),
  //     updated_by: a.belongsTo("Profiles", "updatedProfileId"),
  //     sharable_groups: a.string().array(),
  //   })
  //   .authorization((allow) => [allow.authenticated()]),

  // RecentActivities: a
  //   .model({
  //     id: a.id(),
  //     activity_id: a.string(),
  //     type: a.string(),
  //     title: a.string(),
  //     custom_action: a.string(),
  //     created_at: a.string(),
  //     createdProfileId: a.id(),
  //     created_by: a.belongsTo("Profiles", "createdProfileId"),
  //     updated_at: a.string(),
  //     updatedProfileId: a.id(),
  //     updated_by: a.belongsTo("Profiles", "updatedProfileId"),
  //     sharable_groups: a.string().array(),
  //   })
  //   .authorization((allow) => [allow.authenticated()]),

  // FavouriteItems: a
  //   .model({
  //     id: a.id(),
  //     categoryId: a.id(),
  //     category_id: a.belongsTo("Categories", "categoryId"),
  //     maintenancePlanId: a.id(),
  //     maintenance_plan_id: a.belongsTo("MaintenancePlans", "maintenancePlanId"),
  //     created_at: a.string(),
  //     createdProfileId: a.id(),
  //     created_by: a.belongsTo("Profiles", "createdProfileId"),
  //     updated_at: a.string(),
  //     updatedProfileId: a.id(),
  //     updated_by: a.belongsTo("Profiles", "updatedProfileId"),
  //     sharable_groups: a.string().array(),
  //   })
  //   .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
