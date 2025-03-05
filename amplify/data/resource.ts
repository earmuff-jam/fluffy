import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Profiles: a
    .model({
      id: a.id(),
      username: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      avatar_url: a.string(),
      emailAddress: a.string(),
      phoneNumber: a.string(),
      aboutMe: a.string(),
      imageURL: a.string(),
      appearance: a.boolean(),
      isGridView: a.boolean(),
      onlineStatus: a.boolean(),
      lastOnlineLocationPoint: a.customType({
        lat: a.float(),
        lon: a.float(),
      }),
      updatedAt: a.string(),
      createdLocations: a.hasMany("StorageLocations", "createdLocationId"),
      updatedLocations: a.hasMany("StorageLocations", "updatedLocationId"),
      createdNotes: a.hasMany("Notes", "createdNoteId"),
      updatedNotes: a.hasMany("Notes", "updatedNoteId"),
      createdAssets: a.hasMany("Assets", "createdAssetId"),
      updatedAssets: a.hasMany("Assets", "updatedAssetId"),
      createdCategories: a.hasMany("Categories", "createdCategoryId"),
      updatedCategories: a.hasMany("Categories", "updatedCategoryId"),
      createdCategoryItems: a.hasMany(
        "CategoryItems",
        "createdCategoryItemsId"
      ),
      updatedCategoryItems: a.hasMany(
        "CategoryItems",
        "updatedCategoryItemsId"
      ),
      createdMaintenancePlans: a.hasMany(
        "MaintenancePlans",
        "createdMaintenancePlanId"
      ),
      updatedMaintenancePlans: a.hasMany(
        "MaintenancePlans",
        "updatedMaintenancePlanId"
      ),
      createdMaintenancePlanItems: a.hasMany(
        "MaintenancePlanItems",
        "createdProfileId"
      ),
      updatedMaintenancePlanItems: a.hasMany(
        "MaintenancePlanItems",
        "updatedProfileId"
      ),
      createdMaintenanceAlert: a.hasMany(
        "MaintenanceAlert",
        "createdProfileId"
      ),
      updatedMaintenanceAlert: a.hasMany(
        "MaintenanceAlert",
        "updatedProfileId"
      ),
      createdRecentActivities: a.hasMany(
        "RecentActivities",
        "createdProfileId"
      ),
      updatedRecentActivities: a.hasMany(
        "RecentActivities",
        "updatedProfileId"
      ),
      createdFavouriteItems: a.hasMany("FavouriteItems", "createdProfileId"),
      updatedFavouriteItems: a.hasMany("FavouriteItems", "updatedProfileId"),
    })
    .authorization((allow) => [allow.authenticated()]),

  StorageLocations: a
    .model({
      id: a.id(),
      location: a.string(),
      storageLocationPoint: a.customType({
        lat: a.float(),
        lon: a.float(),
      }),
      createdAt: a.string(),
      // createdLocationId: a.id(),
      // created_by: a.belongsTo("Profiles", "createdLocationId"),
      updatedAt: a.string(),
      // updatedLocationId: a.id(),
      // updated_by: a.belongsTo("Profiles", "updatedLocationId"),
      // sharable_groups: a.string().array(),
      associatedAsset: a.hasOne('Assets', 'storageLocationIdRef'),
    })
    .authorization((allow) => [allow.authenticated()]),

  Notes: a
    .model({
      id: a.id(),
      title: a.string(),
      description: a.string(),
      color: a.string(),
      status: a.string(),
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
      price: a.string(),
      status: a.string(),
      barcode: a.string(),
      sku: a.string(),
      color: a.string(),
      imageURL: a.string(),
      quantity: a.integer(),
      boughtAt: a.string(),
      storageLocationIdRef: a.id(),
      storageLocationId: a.belongsTo('StorageLocations', 'storageLocationIdRef'),
      isBookmarked: a.boolean(),
      isReturnable: a.boolean(),
      returnLocation: a.string(),
      returnDatetime: a.string(),
      returnNotes: a.string(),
      maxWeight: a.string(),
      minWeight: a.string(),
      maxHeight: a.string(),
      minHeight: a.string(),
      createdAt: a.string(),
      //     createdAssetId: a.id(),
      //     created_by: a.belongsTo("Profiles", "createdAssetId"),
      updatedAt: a.string(),
      //     updatedAssetId: a.id(),
      //     updated_by: a.belongsTo("Profiles", "updatedAssetId"),
      //     sharable_groups: a.string().array(),
      associatedCategoryItems: a.hasMany('CategoryItems', 'assetIdRef'),
      associatedMaintenancePlanItems: a.hasMany('MaintenancePlanItems', 'assetIdRef'),
    })
    .authorization((allow) => [allow.authenticated()]),

  Categories: a
    .model({
      id: a.id(),
      name: a.string(),
      description: a.string(),
      color: a.string(),
      status: a.string(),
      imageURL: a.string(),
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
      associatedCategoryItems: a.hasMany('CategoryItems', 'categoryIdRef'),
      associatedFavouriteItems: a.hasMany('FavouriteItems', 'categoryIdRef'),
    })
    .authorization((allow) => [allow.authenticated()]),

  CategoryItems: a
    .model({
      id: a.id(),
      categoryIdRef: a.id(),
      categoryId: a.belongsTo('Categories', 'categoryIdRef'),
      assetIdRef: a.id(),
      assetId: a.belongsTo('Assets', 'assetIdRef'),
      createdAt: a.string(),
      // createdCategoryItemsId: a.id(),
      // created_by: a.belongsTo("Profiles", "createdCategoryItemsId"),
      updatedAt: a.string(),
      // updatedCategoryItemsId: a.id(),
      // updated_by: a.belongsTo("Profiles", "updatedCategoryItemsId"),
      // sharable_groups: a.string().array(),
    })
    .authorization((allow) => [allow.authenticated()]),

  MaintenancePlans: a
    .model({
      id: a.id(),
      name: a.string(),
      description: a.string(),
      color: a.string(),
      imageURL: a.string(),
      status: a.string(),
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
      associatedMaintenancePlanItems: a.hasMany('MaintenancePlanItems', 'maintenancePlanIdRef'),
      associatedMaintenanceAlert: a.hasMany('MaintenanceAlert', 'maintenancePlanIdRef'),
      associatedFavouriteItems: a.hasMany('FavouriteItems', 'maintenancePlanIdRef'),
    })
    .authorization((allow) => [allow.authenticated()]),

  MaintenancePlanItems: a
    .model({
      id: a.id(),
      maintenancePlanIdRef: a.id(),
      maintenancePlanId: a.belongsTo('MaintenancePlans', 'maintenancePlanIdRef'),
      assetIdRef: a.id(),
      assetId: a.belongsTo('Assets', 'assetIdRef'),
      createdAt: a.string(),
      // createdProfileId: a.id(),
      // created_by: a.belongsTo('Profiles', 'createdProfileId'),
      updatedAt: a.string(),
      // updatedProfileId: a.id(),
      // updated_by: a.belongsTo('Profiles', 'updatedProfileId'),
      // sharable_groups: a.string().array(),
    })
    .authorization((allow) => [allow.authenticated()]),

  MaintenanceAlert: a
    .model({
      id: a.id(),
      maintenancePlanIdRef: a.id(),
      maintenancePlanId: a.belongsTo('MaintenancePlans', 'maintenancePlanIdRef'),
      name: a.string(),
      type: a.string(),
      planDue: a.string(),
      isRead: a.boolean(),
      createdAt: a.string(),
      // createdProfileId: a.id(),
      // created_by: a.belongsTo("Profiles", "createdProfileId"),
      updatedAt: a.string(),
      // updatedProfileId: a.id(),
      // updated_by: a.belongsTo("Profiles", "updatedProfileId"),
      // sharable_groups: a.string().array(),
    })
    .authorization((allow) => [allow.authenticated()]),

  RecentActivities: a
    .model({
      id: a.id(),
      activityId: a.string(),
      type: a.enum(['asset', 'category', 'plan']),
      title: a.string(),
      customAction: a.enum(['created', 'updated', 'deleted']),
      createdAt: a.string(),
      // createdProfileId: a.id(),
      // created_by: a.belongsTo("Profiles", "createdProfileId"),
      updatedAt: a.string(),
      // updatedProfileId: a.id(),
      // updated_by: a.belongsTo("Profiles", "updatedProfileId"),
      // sharable_groups: a.string().array(),
    })
    .authorization((allow) => [allow.authenticated()]),

  FavouriteItems: a
    .model({
      id: a.id(),
      categoryIdRef: a.id(),
      categoryId: a.belongsTo('Categories', 'categoryIdRef'),
      maintenancePlanIdRef: a.id(),
      maintenancePlanId: a.belongsTo('MaintenancePlans', 'maintenancePlanIdRef'),
      createdAt: a.string(),
      // createdProfileId: a.id(),
      // created_by: a.belongsTo("Profiles", "createdProfileId"),
      updatedAt: a.string(),
      // updatedProfileId: a.id(),
      // updated_by: a.belongsTo("Profiles", "updatedProfileId"),
      // sharable_groups: a.string().array(),
    })
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
