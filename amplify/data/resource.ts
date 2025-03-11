import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Profiles: a
    .model({
      id: a.id(),
      username: a.string(),
      firstName: a.string(),
      lastName: a.string(),
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
      createdAt: a.string(),
      updatedAt: a.string(),
      createdLocations: a.hasMany("StorageLocations", "createdLocationIdRef"),
      updatedLocations: a.hasMany("StorageLocations", "updatedLocationIdRef"),
      createdNotes: a.hasMany("Notes", "createdNoteIdRef"),
      updatedNotes: a.hasMany("Notes", "updatedNoteIdRef"),
      createdAssets: a.hasMany("Assets", "createdAssetIdRef"),
      updatedAssets: a.hasMany("Assets", "updatedAssetIdRef"),
      createdCategories: a.hasMany("Categories", "createdCategoryIdRef"),
      updatedCategories: a.hasMany("Categories", "updatedCategoryIdRef"),
      createdCategoryItems: a.hasMany(
        "CategoryItems",
        "createdCategoryItemsIdRef"
      ),
      updatedCategoryItems: a.hasMany(
        "CategoryItems",
        "updatedCategoryItemsIdRef"
      ),
      createdMaintenancePlans: a.hasMany(
        "MaintenancePlans",
        "createdMaintenancePlanIdRef"
      ),
      updatedMaintenancePlans: a.hasMany(
        "MaintenancePlans",
        "updatedMaintenancePlanIdRef"
      ),
      createdMaintenancePlanItems: a.hasMany(
        "MaintenancePlanItems",
        "createdProfileIdRef"
      ),
      updatedMaintenancePlanItems: a.hasMany(
        "MaintenancePlanItems",
        "updatedProfileIdRef"
      ),
      createdMaintenanceAlert: a.hasMany(
        "MaintenanceAlert",
        "createdProfileIdRef"
      ),
      updatedMaintenanceAlert: a.hasMany(
        "MaintenanceAlert",
        "updatedProfileIdRef"
      ),
      createdRecentActivities: a.hasMany(
        "RecentActivities",
        "createdProfileIdRef"
      ),
      updatedRecentActivities: a.hasMany(
        "RecentActivities",
        "updatedProfileIdRef"
      ),
      createdFavouriteItems: a.hasMany("FavouriteItems", "createdProfileIdRef"),
      updatedFavouriteItems: a.hasMany("FavouriteItems", "updatedProfileIdRef"),
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
      createdLocationIdRef: a.id(),
      createdBy: a.belongsTo("Profiles", "createdLocationIdRef"),
      updatedAt: a.string(),
      updatedLocationIdRef: a.id(),
      updatedBy: a.belongsTo("Profiles", "updatedLocationIdRef"),
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
      createdNoteIdRef: a.id(),
      createdBy: a.belongsTo("Profiles", "createdNoteIdRef"),
      updatedAt: a.string(),
      updatedNoteIdRef: a.id(),
      updatedBy: a.belongsTo("Profiles", "updatedNoteIdRef"),
      collaborators: a.string().array(),
    })
    .authorization(allow => [allow.ownersDefinedIn('collaborators')]),

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
      createdAssetIdRef: a.id(),
      createdBy: a.belongsTo("Profiles", "createdAssetIdRef"),
      updatedAt: a.string(),
      updatedAssetIdRef: a.id(),
      updatedBy: a.belongsTo("Profiles", "updatedAssetIdRef"),
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
      createdCategoryIdRef: a.id(),
      createdBy: a.belongsTo("Profiles", "createdCategoryIdRef"),
      updatedAt: a.string(),
      updatedCategoryIdRef: a.id(),
      updatedBy: a.belongsTo("Profiles", "updatedCategoryIdRef"),
      collaborators: a.string().array(),
      associatedCategoryItems: a.hasMany('CategoryItems', 'categoryIdRef'),
      associatedFavouriteItems: a.hasMany('FavouriteItems', 'categoryIdRef'),
    })
    .authorization(allow => [allow.ownersDefinedIn('collaborators')]),

  CategoryItems: a
    .model({
      id: a.id(),
      categoryIdRef: a.id(),
      categoryId: a.belongsTo('Categories', 'categoryIdRef'),
      assetIdRef: a.id(),
      assetId: a.belongsTo('Assets', 'assetIdRef'),
      createdAt: a.string(),
      createdCategoryItemsIdRef: a.id(),
      createdBy: a.belongsTo("Profiles", "createdCategoryItemsIdRef"),
      updatedAt: a.string(),
      updatedCategoryItemsIdRef: a.id(),
      updatedBy: a.belongsTo("Profiles", "updatedCategoryItemsIdRef"),
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
      createdMaintenancePlanIdRef: a.id(),
      createdBy: a.belongsTo("Profiles", "createdMaintenancePlanIdRef"),
      updatedAt: a.string(),
      updatedMaintenancePlanIdRef: a.id(),
      updatedBy: a.belongsTo("Profiles", "updatedMaintenancePlanIdRef"),
      collaborators: a.string().array(),
      associatedMaintenancePlanItems: a.hasMany('MaintenancePlanItems', 'maintenancePlanIdRef'),
      associatedMaintenanceAlert: a.hasMany('MaintenanceAlert', 'maintenancePlanIdRef'),
      associatedFavouriteItems: a.hasMany('FavouriteItems', 'maintenancePlanIdRef'),
    })
    .authorization(allow => [allow.ownersDefinedIn('collaborators')]),

  MaintenancePlanItems: a
    .model({
      id: a.id(),
      maintenancePlanIdRef: a.id(),
      maintenancePlanId: a.belongsTo('MaintenancePlans', 'maintenancePlanIdRef'),
      assetIdRef: a.id(),
      assetId: a.belongsTo('Assets', 'assetIdRef'),
      createdAt: a.string(),
      createdProfileIdRef: a.id(),
      createdBy: a.belongsTo('Profiles', 'createdProfileIdRef'),
      updatedAt: a.string(),
      updatedProfileIdRef: a.id(),
      updatedBy: a.belongsTo('Profiles', 'updatedProfileIdRef'),
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
      createdProfileIdRef: a.id(),
      createdBy: a.belongsTo("Profiles", "createdProfileIdRef"),
      updatedAt: a.string(),
      updatedProfileIdRef: a.id(),
      updatedBy: a.belongsTo("Profiles", "updatedProfileIdRef"),
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
      createdProfileIdRef: a.id(),
      createdBy: a.belongsTo("Profiles", "createdProfileIdRef"),
      updatedAt: a.string(),
      updatedProfileIdRef: a.id(),
      updatedBy: a.belongsTo("Profiles", "updatedProfileIdRef"),
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
      createdProfileIdRef: a.id(),
      createdBy: a.belongsTo("Profiles", "createdProfileIdRef"),
      updatedAt: a.string(),
      updatedProfileIdRef: a.id(),
      updatedBy: a.belongsTo("Profiles", "updatedProfileIdRef"),
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
