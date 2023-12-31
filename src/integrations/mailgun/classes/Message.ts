/* ----------------------------- Custom Modules ----------------------------- */
import { MailgunMessageData, MailGunJS, MessagesSendResult } from '..'
/* -------------------------------------------------------------------------- */

class Message {
    constructor(private superThis: MailGunJS, private certificate: Record<string, any>) {}

    public createMessage(data: MailgunMessageData): Promise<MessagesSendResult> {
        return new Promise((resolve, reject) => {
            if (!('from' in data)) Object.assign(data, { from: this.certificate.from })

            this.superThis.client.messages
                .create(this.certificate.domain, data)
                .then((response: MessagesSendResult) => resolve(response))
                .catch((err) => reject(err))
        })
    }
}

export default Message
