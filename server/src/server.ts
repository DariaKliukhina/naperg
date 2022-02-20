import { ApolloServer } from 'apollo-server';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import * as Redis from 'ioredis';

import { resolvers } from './schema';
import { createContext } from './context';
import { makeExecutableSchema } from 'graphql-tools';
import { query } from './typeDefs/query';
import { user } from './typeDefs/user';
import { feed } from './typeDefs/feed';
import { source } from './typeDefs/source';
import { post } from './typeDefs/post';
import { mutation } from './typeDefs/mutation';
import { BaseRedisCache } from 'apollo-server-cache-redis';


const schema = makeExecutableSchema({
  typeDefs: [query, user, feed, source, post, mutation],
  resolvers,
});

const client = new Redis({ host: 'localhost', port: 6379 });
const cache = new BaseRedisCache({ client });
const app = new ApolloServer({ schema, context: createContext, plugins: [responseCachePlugin()], cache });


app.listen(
  { port: 4000 },
  () => console.log(`🚀 Server ready at: http://localhost:4000 ⭐️⭐️⭐️⭐️`),
).catch((e) => {
  console.error(e);
  process.exit(1);
});
