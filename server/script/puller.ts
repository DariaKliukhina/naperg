/**
 * A script that checks RSS feeds and refreshes and checks only those that need
 * to be updated.
 *
 * Note that this script ONLY interacts with a GraphQL API (in this case, it
 * happens to be the same one that the frontend uses, for simplicity). It does
 * not touch Prisma directly. It should not touch Prisma directly. If you are
 * tempted to use Prisma directly, then you are thinking incorrectly about the
 * clean division of responsibilities.
 *
 * Of course, in this case, this script happens to be in the same repository as
 * the Prisma things, but that's only for convenience of delivering the code to
 * you in this case.
 *
 * For further reference, see "architecture 0" on the lecture slides.
 */

import { scheduleJob } from 'node-schedule';
import { request, gql } from 'graphql-request';

async function main() {
  // TODO: Use a GraphQL client or a simple `fetch` to call the endpoint to
  // refresh all feeds with the appropriate arguments.

  // */10 every 10 seconds
  scheduleJob('1 * * * *', async () => {
    const query = gql`
        mutation Mutation {
            refreshFeeds
        }
    `;

    // Handling
    console.log('started');
    const response = await request('http://localhost:4000/graphql', query);
    console.log(response)
  });
}

// TODO: Last time, people seemed confused about where the "scheduling"
// happens. It does not happen in the code. This script does not know when it's
// called, it just knows how to trigger an endpoint.
//
// Answer the following questions (you don't need to actually do these),
// Googling the answer and writing it in your own words.
//
// 1. When you use cron, what file do you change in order set up a cron job?
// 2. What would be the cron line you would add to run this script once a day?
// 3. And what about for once every 10 minutes?
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

