import { Typography } from '@mui/material';

/**
 * function is used to build the necessary object from the const steps to render the tour correctly.
 * @param {Array} staticSteps - an array of steps
 * @param {String} prefix - the prefix string to attach to the selector
 * @returns Array of steps with combined values of id, selector and content to build the tour properly.
 */
const derieveTourSteps = (staticSteps, prefix) => {
  return staticSteps.map(({ title }, index) => ({
    id: index,
    selector: `[data-tour="${prefix}-${index}"]`,
    content: <Typography variant="caption">{title}</Typography>,
  }));
};

const OVERVIEW_PAGE_TOUR_STEPS = [
  {
    title:
      'Welcome to Help and Tutorial. Learn how to navigate the application in thorough detail. Each page is designed with its own help page, and you can go over it again and again as much as you would like.',
  },
  {
    title:
      'This is your asset summary. View count of assets that are assigned to categories or plans. You can also view the count of assets that are due for return.',
  },
  {
    title:
      'This is your cost summary. You can view estimated cost of all the assets in your portfolio. Unestimated assets are the number of assets that do not have cost price associated with them.',
  },
  {
    title: 'Learn more about your asset categorization. Click on each content to navigate to the respective section.',
  },
  {
    title:
      'View a graphical representation of your assets. View the top five distribution based on characteristics of your assets like price and storage location or click on trends to view the trends of when the asset was last modified.',
  },
  {
    title:
      'This is where you can see notifications for the list of maintenance plans that are due by yesterday. Click on individual notification to disable them.',
  },
  {
    title:
      'Switch appearances or log out of the application. You can also revisit the tutorial based on where you are location in the application.',
  },
];

const ASSETS_PAGE_TOUR_STEPS = [
  {
    title: 'This is where you can view the list of all your assets.',
  },
  {
    title: 'Add details about a single asset to the system.',
  },
  { title: 'Add assets in bulk to the system. Reuse the template provided to ensure all values are populated.' },
];

const CATEGORIES_PAGE_TOUR_STEPS = [
  {
    title:
      'This is where you can view your categories. Categories are used to group your assets together. You can associate many items into different categories. Removing an asset will remove it from all associated categories as well.',
  },
  {
    title: 'Create new category from here.',
  },
  {
    title: 'Download a report of the categories from here.',
  },
  {
    title: 'Filter your categories in terms of the status of the category. Eg, draft, archived etc',
  },
  {
    title: 'Sort categories based on the last updated date from here.',
  },
];

const MAINTENANCE_PAGE_TOUR_STEPS = [
  {
    title:
      'This is where you can view your maintenance plans. Maintenance plans can be configured to asses your individual assets on a regular basis. These assesments must be done by the individual periodically and must be updated into the system to keep itself up to date.',
  },
  {
    title: 'Create new maintenance plan from here.',
  },
  {
    title: 'Download a report of the maintenance plans from here.',
  },
  {
    title: 'Filter your maintenance plans in terms of the status of the plan. Eg, draft, archived etc.',
  },
  {
    title: 'Sort maintenance plans based on the last updated date from here.',
  },
];

const REPORTS_PAGE_TOUR_STEPS = [
  {
    title:
      'View detailed reports of your assets from here. Reports are combined to instrument as a guide for you to understand your asset portfolio better. The data defaults to YTD to give you a perspective of how your assets perform over the course of the year. You can also change your assets to match more relevant data.',
  },
  {
    title: 'Filter results to match a more reasonable timeline.',
  },
  {
    title: 'You can download or export the selected data from this button here.',
  },
  {
    title:
      'Displays the total valuation of all assets from the time selected. All assets are in terms of dollar value.',
  },
  {
    title:
      'Displays the valuation of assets that are categoried under either one of the categories. If the asset does not belong to any category, then it is exempt from this report section.',
  },
  {
    title: 'Displays the most recently added asset in this section by the logged in user.',
  },
  {
    title: 'Displays the most recent maintenance plan that was created by the logged in user.',
  },
  {
    title: 'View the list of assets that fall under the above filter results column.',
  },
];

const PROFILE_PAGE_TOUR_STEPS = [
  {
    title:
      'This is profile details where you can update details about yourself, choose your own avatar or view or edit settings.',
  },
  {
    title: 'Add a profile picture or avatar of yourself so others can know who you are easily.',
  },
  {
    title: 'This is your username and your biographic information.',
  },
  {
    title: 'Add a description about yourself so others can know things about you.',
  },
  {
    title: 'Displays your general preferences in the app',
  },
  {
    title: 'View general profile statistics such as the number of categories, plans or assets you have created.',
  },
  {
    title: 'Alter the appearance of the app from here.',
  },
];

const RECENT_ACTIVITIES_PAGE_TOUR_STEPS = [
  {
    title:
      'View a list of last 10 changes made with your assets here. If assets are shared between collaborators and change is made by another user, you can still view the changes here.',
  },
  {
    title: 'Download the history of all the changes made within the last 30 calendar days from today.',
  },
];

const PERSONAL_NOTES_PAGE_DATA_TOUR_STEPS = [
  {
    title: 'View list of notes that you have created over time.',
  },
  {
    title: 'Add new note from here. You can also assign location to the notes.',
  },
];

const SELECTED_CATEGORY_PAGE_DATA_TOUR_STEPS = [
  {
    title: 'View details about your selected category.',
  },
  {
    title: 'Mark category as favourites so that they can be displayed on the left menu bar easily.',
  },
  {
    title: 'Share the category and its items to other collaborators.',
  },
  {
    title: 'Upload images to represent the category.',
  },
  {
    title:
      'Click on the add button to associate assets to a selected category. Assets can be shared across many other categories.',
  },
  {
    title: 'Select assets that you would like to remove association from this category and press remove button.',
  },
  {
    title: 'View list of all assets that are associated to this specific category.',
  },
  {
    title:
      'View a graph representation of the assets that belong to the category. If you have more than 10 items in the selected category, then only the last 10 are displayed.',
  },
];

const SELECTED_MAINTENANCE_PLAN_PAGE_DATA_TOUR_STEPS = [
  {
    title: 'View details about your selected maintenance plan.',
  },
  {
    title: 'Mark maintenance plan as favourites so that they can be displayed on the left menu bar easily.',
  },
  {
    title: 'Share the maintenance plan and its items to other collaborators.',
  },
  {
    title: 'Upload images to represent the maintenance plan.',
  },
  {
    title:
      'Click on the add button to associate assets to a selected maintenance plan. Assets can be shared across many other maintenance plans.',
  },
  {
    title:
      'Select assets that you would like to remove association from this maintenance plan and press remove button.',
  },
  {
    title: 'View list of all assets that are associated to this specific maintenance plan.',
  },
  {
    title:
      'View a graph representation of the assets that belong to the maintenance plan. If you have more than 10 items in the selected maintenance plan, then only the last 10 are displayed.',
  },
];

/**
 * Step Mapper function
 *
 * An object used to hold the steps and its respective start and end points. Based on the location of the
 * application, the step mapper will build a start and end number which will align to the tour steps.
 * The start number will be the length of previous tour and the end will always be the sum of the
 * previous and current tour since the end cannot be less than the start
 */
export const DEFAULT_STEP_MAPPER = {
  '/assets/overview': {
    start: 0,
    end: OVERVIEW_PAGE_TOUR_STEPS.length,
  },
  '/assets/list': {
    start: OVERVIEW_PAGE_TOUR_STEPS.length,
    end: OVERVIEW_PAGE_TOUR_STEPS.length + ASSETS_PAGE_TOUR_STEPS.length,
  },
  '/assets/categories': {
    start: OVERVIEW_PAGE_TOUR_STEPS.length + ASSETS_PAGE_TOUR_STEPS.length,
    end: OVERVIEW_PAGE_TOUR_STEPS.length + ASSETS_PAGE_TOUR_STEPS.length + CATEGORIES_PAGE_TOUR_STEPS.length,
  },
  '/assets/plans': {
    start: OVERVIEW_PAGE_TOUR_STEPS.length + ASSETS_PAGE_TOUR_STEPS.length + CATEGORIES_PAGE_TOUR_STEPS.length,
    end:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length,
  },
  '/assets/reports': {
    start:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length,
    end:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length +
      REPORTS_PAGE_TOUR_STEPS.length,
  },
  '/assets/profile': {
    start:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length +
      REPORTS_PAGE_TOUR_STEPS.length,
    end:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length +
      REPORTS_PAGE_TOUR_STEPS.length +
      PROFILE_PAGE_TOUR_STEPS.length,
  },
  '/assets/recent': {
    start:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length +
      REPORTS_PAGE_TOUR_STEPS.length +
      PROFILE_PAGE_TOUR_STEPS.length,
    end:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length +
      REPORTS_PAGE_TOUR_STEPS.length +
      PROFILE_PAGE_TOUR_STEPS.length +
      RECENT_ACTIVITIES_PAGE_TOUR_STEPS.length,
  },
  '/assets/notes': {
    start:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length +
      REPORTS_PAGE_TOUR_STEPS.length +
      PROFILE_PAGE_TOUR_STEPS.length +
      RECENT_ACTIVITIES_PAGE_TOUR_STEPS.length,
    end:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length +
      REPORTS_PAGE_TOUR_STEPS.length +
      PROFILE_PAGE_TOUR_STEPS.length +
      RECENT_ACTIVITIES_PAGE_TOUR_STEPS.length +
      PERSONAL_NOTES_PAGE_DATA_TOUR_STEPS.length,
  },
  '/category/id': {
    start:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length +
      REPORTS_PAGE_TOUR_STEPS.length +
      PROFILE_PAGE_TOUR_STEPS.length +
      RECENT_ACTIVITIES_PAGE_TOUR_STEPS.length +
      PERSONAL_NOTES_PAGE_DATA_TOUR_STEPS.length,
    end:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length +
      REPORTS_PAGE_TOUR_STEPS.length +
      PROFILE_PAGE_TOUR_STEPS.length +
      RECENT_ACTIVITIES_PAGE_TOUR_STEPS.length +
      PERSONAL_NOTES_PAGE_DATA_TOUR_STEPS.length +
      SELECTED_CATEGORY_PAGE_DATA_TOUR_STEPS.length,
  },
  '/plan/id': {
    start:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length +
      REPORTS_PAGE_TOUR_STEPS.length +
      PROFILE_PAGE_TOUR_STEPS.length +
      RECENT_ACTIVITIES_PAGE_TOUR_STEPS.length +
      PERSONAL_NOTES_PAGE_DATA_TOUR_STEPS.length +
      SELECTED_CATEGORY_PAGE_DATA_TOUR_STEPS.length,
    end:
      OVERVIEW_PAGE_TOUR_STEPS.length +
      ASSETS_PAGE_TOUR_STEPS.length +
      CATEGORIES_PAGE_TOUR_STEPS.length +
      MAINTENANCE_PAGE_TOUR_STEPS.length +
      REPORTS_PAGE_TOUR_STEPS.length +
      PROFILE_PAGE_TOUR_STEPS.length +
      RECENT_ACTIVITIES_PAGE_TOUR_STEPS.length +
      PERSONAL_NOTES_PAGE_DATA_TOUR_STEPS.length +
      SELECTED_CATEGORY_PAGE_DATA_TOUR_STEPS.length +
      SELECTED_MAINTENANCE_PLAN_PAGE_DATA_TOUR_STEPS.length,
  },
};

const DEFAULT_TOUR_STEPS = [
  ...derieveTourSteps(OVERVIEW_PAGE_TOUR_STEPS, 'overview'),
  ...derieveTourSteps(ASSETS_PAGE_TOUR_STEPS, 'assets'),
  ...derieveTourSteps(CATEGORIES_PAGE_TOUR_STEPS, 'categories'),
  ...derieveTourSteps(MAINTENANCE_PAGE_TOUR_STEPS, 'plans'),
  ...derieveTourSteps(REPORTS_PAGE_TOUR_STEPS, 'reports'),
  ...derieveTourSteps(PROFILE_PAGE_TOUR_STEPS, 'profile'),
  ...derieveTourSteps(RECENT_ACTIVITIES_PAGE_TOUR_STEPS, 'recentActivities'),
  ...derieveTourSteps(PERSONAL_NOTES_PAGE_DATA_TOUR_STEPS, 'notes'),
  ...derieveTourSteps(SELECTED_CATEGORY_PAGE_DATA_TOUR_STEPS, 'selected-category'),
  ...derieveTourSteps(SELECTED_MAINTENANCE_PLAN_PAGE_DATA_TOUR_STEPS, 'selected-plan'),
];

export default DEFAULT_TOUR_STEPS;
