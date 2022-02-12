/**
 * Contains resolvers related to refreshing RSS feeds.
 *
 * This would be an example of separating resolvers more cleanly into separate
 * files. Note that there are many ways to do this, depending on how large your
 * app is.
 */
import { Source } from '@prisma/client';
import * as Parser from 'rss-parser';
import { Context } from '../model/appInterface';


// This is the number, in minutes, before a source is considered "stale" and
// needs to be refreshed. That is, if a source has not been refreshed in the last
// N minutes, it should be refreshed.
//
// You may change this value if you want for testing. You can even change it to
// seconds.
//
// Please note the avoidance of magic numbers.
// https://en.wikipedia.org/wiki/Magic_number_(programming)
const SOURCE_STALENESS_MINUTES = 10;

export const rssMutationResolvers = {
  refreshFeeds: async (parent, args, ctx: Context) => {
    // TODO: Using Prisma, query for all sources. Filter only for stale sources,
    // either using Prisma filters or using code.
    const staleSources: Source[] = await ctx.prisma.source.findMany();

    for (const source of staleSources) {
      // TODO: For each stale source, use an RSS parser of your choice to parse the RSS feed.
      // https://www.google.com/search?q=rss+feed+parser+node
      // You may need to change this code depending on your approach for
      // handling asynchronicity.
      try {
        const parsedResults = await parseRssFeed(source.url);
        for (const parsedResult of parsedResults) {
          // @ts-ignore
          const { title, link: url, content, description } = parsedResult;
          // Raw SQL stuff in future PRs we made awesome code
          // @ts-ignore
          const post = await ctx.prisma.post.findFirst({ where: { url } });
          if (!post) {
            await ctx.prisma.post.create({
              data: {
                title,
                url,
                content: content || description,
                sourceId: source.id,
              },
            });
          }
        }
      } catch (e) {
        console.error(e);
        return false;
      }
      // TODO: For each article in parsed result, update or insert the
      // corresponding article. You may need to change your schema here: how do
      // you "deduplicate" articles?

      // TODO: Make sure that somewhere, somehow, the lastRefreshedAt time for
      // the source is correct.
    }
    return true;
    // TODO: How do you test this resolver? What gets mocked? You don't need to
    // actually write the tests, but think about how you would do this. Write
    // your response below.
  }
  ,
};

/**
 * A type used only internally in this file for parsing an article from an RSS
 * feed.
 */
interface ParsedArticle {
  // TODO: Specify your custom type.
}

/**
 * Returns a **list** of objects representing articles for the given RSS feed.
 *
 * Optional: You may want this to take "SOURCE_STALENESS_MINUTES" too, so you
 * can filter out articles that don't need to be refreshed. Think about how you
 * might be adding duplicate articles on accident.
 */
const parseRssFeed = async (url: string): Promise<ParsedArticle[]> => {
  // TODO: Use the RSS parser here. This has been separated into its own
  // function for cleanliness.

  const parser: Parser<any, any> = new Parser({ xml2js: true });
  const feeds = await parser.parseURL(url);
  return feeds.items;
};
