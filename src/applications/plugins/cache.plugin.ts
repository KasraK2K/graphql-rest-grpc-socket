/* ------------------------------ Dependencies ------------------------------ */
import { useResponseCache } from '@envelop/response-cache'
import { Plugin } from 'graphql-yoga'
/* ----------------------------- Custom Modules ----------------------------- */
import { context } from './../../graphql/context'
/* -------------------------------------------------------------------------- */

const useCache = (): Plugin =>
  useResponseCache({
    includeExtensionMetadata: true,
    shouldCacheResult: ({ cacheKey, result: __ }) => {
      context.cacheKey = cacheKey
      return true
    },
    session: () => null,
    // REVIEW : I use `@cacheControl(maxAge: <number of seconds>)`  in front of my schema response to make it more clear
    /** 1. @param ttlPerSchemaCoordinate: It is specific schema cache and it will overwrite `ttlPerType` and `ttl` */
    // ttlPerSchemaCoordinate: { /* 'Query.users': 10_000, */ },

    /** 2. @param ttlPerType: It is type cache and can be overwritten by `ttlPerSchemaCoordinate` and it will overwrite `ttl` */
    // ttlPerType: { Query: 120_000 },

    /** 3. @param ttl: It is general cache to everything but can be overwritten by `ttlPerType` or `ttlPerSchemaCoordinate` */
    ttl: 10_000,
  })

export default useCache
