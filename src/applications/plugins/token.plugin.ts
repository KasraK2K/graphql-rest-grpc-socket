/* ------------------------------ Dependencies ------------------------------ */
import { Plugin } from 'graphql-yoga'
/* ----------------------------- Custom Modules ----------------------------- */
import { context } from '../../graphql/context'
/* -------------------------------------------------------------------------- */

const useToken = (): Plugin => {
  return {
    onRequest({ request }) {
      const authorization: string | undefined = request.headers.get('authorization') || undefined
      context.token = authorization && authorization.length ? authorization.slice(7) : undefined
    },
  }
}

export default useToken
