import { generateClient } from 'aws-amplify/data';
import type { Schema } from 'amplify/data/resource';

const client = generateClient<Schema>();

// fetchAllCategories ...
//
// fetch all categories that are shared with a selected user
export const fetchAllCategories = async (userID: string, setSortedData: Function) => {
  try {
    // const { data: categories } = await client.models.Categories.list({
    //   filter: {
    //     sharable_groups: {
    //       contains: userID,
    //     },
    //   },
    // });
    const { data: categories } = await client.models.Categories.list();

    // setSortedData(categories); // Directly set the state once data is fetched
    console.log(categories);
    setSortedData([]);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
