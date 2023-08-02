/* ------------------------------ Dependencies ------------------------------ */
import md5 from 'md5'
import { uid } from 'uid'
/* -------------------------------------------------------------------------- */

export const uniqueString = (): string => {
    return md5(`${Date.now}-${uid}`)
}
