/* ------------------------------ Dependencies ------------------------------ */
export * from 'mailgun.js/Types'
/* ----------------------------- Custom Modules ----------------------------- */
import MailGunJS from './classes/MailGunJS'
import Message from './classes/Message'
/* -------------------------------------------------------------------------- */

export { MailGunJS }
export { Message }

export * from './libs/interface'

export default new MailGunJS()
