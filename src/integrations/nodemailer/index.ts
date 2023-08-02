/* ----------------------------- Custom Modules ----------------------------- */
import prodCertificate from './certificate.prod.json'
import devCertificate from './certificate.dev.json'
import NodeMailer from './classes/NodeMailer'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
const certificate = process.env.NODE_ENV === 'production' ? prodCertificate : devCertificate
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 How To Use                                 */
/* -------------------------------------------------------------------------- */
// import nodeMailer from './integrations/nodemailer'

// const email = async () => {
//     const user = {
//         first_name: 'Kasra',
//         email: 'Kasra.Karami.Work@gmail.com'
//     }

//     const result = await nodeMailer.sendMail<any>(
//         { to: user.email, subject: 'Verify Wisdom Account' },
//         'verifyEmail',
//         user
//     )
// }
/* -------------------------------------------------------------------------- */

export { certificate }
export default new NodeMailer()
