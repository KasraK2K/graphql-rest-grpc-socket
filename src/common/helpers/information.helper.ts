//=======================================================================================================================================================
//
//   ####  #####  #####    ##   ##  #####  #####          ##  ##     ##  #####   #####   #####    ###    ###    ###    ######  ##   #####   ##     ##
//  ##     ##     ##  ##   ##   ##  ##     ##  ##         ##  ####   ##  ##     ##   ##  ##  ##   ## #  # ##   ## ##     ##    ##  ##   ##  ####   ##
//   ###   #####  #####    ##   ##  #####  #####          ##  ##  ## ##  #####  ##   ##  #####    ##  ##  ##  ##   ##    ##    ##  ##   ##  ##  ## ##
//     ##  ##     ##  ##    ## ##   ##     ##  ##         ##  ##    ###  ##     ##   ##  ##  ##   ##      ##  #######    ##    ##  ##   ##  ##    ###
//  ####   #####  ##   ##    ###    #####  ##   ##        ##  ##     ##  ##      #####   ##   ##  ##      ##  ##   ##    ##    ##   #####   ##     ##
//
//=======================================================================================================================================================

/* ------------------------------ Node Modules ------------------------------ */
import os from 'node:os'
/* ------------------------------ Dependencies ------------------------------ */
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import { IApplicationConfig } from '../../../config/config.interface'
import tokenHelper from './token.helper'
import { ITokenPayload } from '../interfaces'
import { TokenType, UserType } from '../enums/general.enum'
/* -------------------------------------------------------------------------- */

const appConfig: IApplicationConfig = config.get('application')

const printInformation = (port: string) => {
    if (appConfig.information) {
        console.group('Server Information:')
        console.table([
            {
                Port: port,
                NODE_ENV: process.env.NODE_ENV,
                Platform: os.platform(),
                'CPU Model': os.cpus()[0].model,
                Arch: os.arch()
            }
        ])
        console.groupEnd()
        // CPU/Ram Information
        console.group('\nCPU/Ram Information:')
        console.table([
            {
                'CPU Count': os.cpus().length,
                'CPU Speed': os.cpus()[0].speed,
                'Total Memory': os.totalmem(),
                'Free Memory': os.freemem(),
                'Used Memory': os.totalmem() - os.freemem()
            }
        ])
        console.groupEnd()
        // Node Information
        console.group('\nNode Information:')
        console.table([
            {
                'Node PID': process.pid,
                'Node CPU Usage': process.cpuUsage(),
                'Node Version': process.version,
                'Node Exec Path': process.execPath
            }
        ])
        console.groupEnd()

        const payload: ITokenPayload = {
            id: 1,
            user_type: UserType.USER,
            token_type: TokenType.TOKEN
        }
        const cryptoToken = tokenHelper.sign(payload)

        console.log('\n- Crypto Token ----------------------------------------------------------')
        console.info(cryptoToken)

        console.log('\n- Api Key ---------------------------------------------------------------')
        console.info(process.env.API_KEY, '\n')
    }
}

export default printInformation
