/* ------------------------------ Dependencies ------------------------------ */
import nodemailer from 'nodemailer'
/* ----------------------------- Custom Modules ----------------------------- */
import { certificate } from '..'
import htmlGenerator from '../../../common/helpers/html.helper'
import errorHandler from '../../../common/helpers/errors/error.handler'
/* -------------------------------------------------------------------------- */

class NodeMailer {
    protected transport = nodemailer.createTransport({
        host: certificate.host,
        port: 2525,
        auth: certificate.auth
    })

    public async sendMail<T>(
        options: { to: string; subject: string },
        htmlGeneratorMethodName: string,
        htmlNeededArguments: T
    ) {
        const html: string = htmlGenerator[htmlGeneratorMethodName](htmlNeededArguments)
        const from = 'Kasra.Karami.KK@gmail.com',
            sender = 'Kasra.Karami.KK@gmail.com'

        return await this.transport
            .sendMail({ ...options, from, sender, html })
            .then((result) => {
                if (result.accepted.includes(options.to)) return true
                else return false
            })
            .catch((err) => {
                errorHandler(err)
                return false
            })
    }
}

export default NodeMailer
