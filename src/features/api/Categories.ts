// Categories Api File

import { generateClient } from 'aws-amplify/data';
import { type Schema } from 'amplify/data/resource';

const client = generateClient<Schema>();

// fetchAllExistingCategories
//
// used to retrieve all existing categories for a selected user.
// export const fetchAllExistingCategories = async () => {
//   const { data: categories, errors } = await client.models.Categories.list();
//   return [categories, errors];
// };
