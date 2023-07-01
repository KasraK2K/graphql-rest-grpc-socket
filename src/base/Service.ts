/* ------------------------------ Dependencies ------------------------------ */
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import tokenHelper from '../common/helpers/token.helper'
import { TokenMode, TokenType } from '../common/enums/general.enum'
/* -------------------------------------------------------------------------- */

class Service {
    protected createToken(
        entity: Record<string, any>,
        mode: TokenMode
    ): {
        token: string
        expire_token: string
        refresh_token: string
        expire_refresh_token: string
        entity: Record<string, any>
    } {
        const expire_token = process.env.NODE_ENV === 'development' ? '200 days' : '30 min'
        const expire_refresh_token = process.env.NODE_ENV === 'development' ? '400 days' : '1 hour'

        const token = tokenHelper.sign(
            { id: entity.id, reseller_id: entity.reseller_id, type: TokenType.TOKEN, mode },
            { expiresIn: expire_token }
        )
        const refresh_token = tokenHelper.sign(
            { id: entity.id, reseller_id: entity.reseller_id, type: TokenType.REFRESH, mode },
            { expiresIn: expire_refresh_token }
        )

        return {
            token,
            expire_token,
            refresh_token,
            expire_refresh_token,
            entity: _.omit(entity, ['password'])
        }
    }
}

export default Service
