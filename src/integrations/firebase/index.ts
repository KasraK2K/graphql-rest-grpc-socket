import Firebase from './classes/Firebase'
import Messaging from './classes/Messaging'
import {
    DataMessagePayload,
    MessagingPayload,
    MessagingOptions,
    NotificationMessagePayload
} from 'firebase-admin/messaging'
import { toChunk } from './functions/toChunk'

export { Firebase }
export { Messaging }
export { DataMessagePayload, MessagingPayload, MessagingOptions, NotificationMessagePayload }
export { toChunk }

export default new Firebase()
