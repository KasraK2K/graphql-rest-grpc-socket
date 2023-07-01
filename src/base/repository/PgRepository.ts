/* ------------------------------ Dependencies ------------------------------ */
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import { IFilter, IPagination } from '../../common/interfaces/general.interface'
import {
    IDefaultResponse,
    IPaginate,
    IQueryGenerator
} from '../../common/interfaces/repository.interface'
import PgBuilderRepository from './PgBuilderRepository'
import logger from '../../common/helpers/logger.helper'
/* -------------------------------------------------------------------------- */

class PgRepository extends PgBuilderRepository {
    // ─── SELECT ALL ─────────────────────────────────────────────────────────────────
    protected find<T>(tableName: string, omits: string[] = []): Promise<IDefaultResponse<T>> {
        const query = /* SQL */ ` SELECT * FROM ${tableName}`

        return new Promise((resolve, reject) => {
            this.executeQuery<T>({ query, omits })
                .then((result) => resolve(result))
                .catch((err) => {
                    logger.error(err, { dest: 'PgRepository.ts' })
                    return reject(err)
                })
        })
    }

    // ─── SELECT ONE ─────────────────────────────────────────────────────────────────
    protected findOne<T>(
        tableName: string,
        args: Record<string, any>,
        omits: string[] = []
    ): Promise<IDefaultResponse<T>> {
        const { query, parameters } = this.getFindOneQuery(tableName, args)

        return new Promise((resolve, reject) => {
            this.executeQuery<T>({ query, parameters, omits })
                .then((result) => resolve(result))
                .catch((err) => {
                    logger.error(err, { dest: 'PgRepository.ts' })
                    return reject(err)
                })
        })
    }

    // ─── GET SELECT ONE QUERY ───────────────────────────────────────────────────────
    protected getFindOneQuery(tableName: string, args: Record<string, any>): IQueryGenerator {
        let index = 0
        const parameters = _.values(args)
        const query = /* SQL */ `
      SELECT * FROM ${tableName}
      \tWHERE ${_.keys(args)
          .map((arg) => `\n\t${arg} = $${++index}`)
          .join(' AND ')}
      \tLIMIT 1
    `
        return { query, parameters }
    }

    // ─── INSERT ─────────────────────────────────────────────────────────────────────
    protected insertOne<T>(
        tableName: string,
        args: Record<string, any>,
        omits: string[] = []
    ): Promise<IDefaultResponse<T>> {
        args = _.omit(args, ['api_key'])
        const { query, parameters } = this.getInsertQuery(tableName, args)

        return new Promise((resolve, reject) => {
            // TODO: FIX parameters
            this.executeQuery<T>({ query, parameters, omits })
                .then((result) => resolve(result))
                .catch((err) => {
                    logger.error(err, { dest: 'PgRepository.ts' })
                    return reject(err)
                })
        })
    }

    // ─── GET INSERT QUERY ───────────────────────────────────────────────────────────
    protected getInsertQuery(tableName: string, args: Record<string, any>): IQueryGenerator {
        let index = 0
        const parameters = _.values(args)
        const keys = _.keys(args)
        const query = /* SQL */ `
      INSERT INTO ${tableName}
      (${keys})
      VALUES (${keys.map(() => `$${++index}`).join(', ')})
      RETURNING *
    `
        return { query, parameters }
    }

    // ─── UPDATE ─────────────────────────────────────────────────────────────────────
    protected updateOne<T>(
        tableName: string,
        args: Record<string, any>,
        omits: string[] = []
    ): Promise<IDefaultResponse<T>> {
        const { query, parameters } = this.getUpdateQuery(tableName, args, omits)

        return new Promise((resolve, reject) => {
            this.executeQuery<T>({ query, parameters })
                .then((result) => resolve(result))
                .catch((err) => {
                    logger.error(err, { dest: 'PgRepository.ts' })
                    return reject(err)
                })
        })
    }

    // ─── GET UPDATE QUERY ───────────────────────────────────────────────────────────
    protected getUpdateQuery(
        tableName: string,
        args: Record<string, any>,
        omits: string[] = []
    ): IQueryGenerator {
        let index = 0
        const id = args.id
        delete args.id

        const parameters = _.values(args)
        parameters.push(id)
        const query = /* SQL */ `
      UPDATE ${tableName} SET
      \t${_.keys(args).map((arg) => `\n\t${arg} = $${++index}`)}
      \tWHERE id = (SELECT id FROM ${tableName} WHERE id = $${++index} LIMIT 1)
      \tRETURNING ${_.keys(_.omit(args, omits)).join(', ')}
    `

        return { query, parameters }
    }

    // ─── SAFE DELETE ────────────────────────────────────────────────────────────────
    protected safeDeleteOne<T>(
        tableName: string,
        id: string,
        omits: string[] = []
    ): Promise<IDefaultResponse<T>> {
        const { query, parameters } = this.getSafeDeleteOneQuery(tableName, id)

        return new Promise((resolve, reject) => {
            this.executeQuery<T>({ query, parameters, omits })
                .then((result) => resolve(result))
                .catch((err) => {
                    logger.error(err, { dest: 'PgRepository.ts' })
                    return reject(err)
                })
        })
    }

    // ─── GET SAFE DELETE ONE QUERY ──────────────────────────────────────────────────
    protected getSafeDeleteOneQuery(tableName: string, id: string): IQueryGenerator {
        const parameters = [id]
        const query = /* SQL */ `
      UPDATE ${tableName}
      SET deleted_at = NOW()
      WHERE id = (SELECT id FROM ${tableName} WHERE id = $1 LIMIT 1)
      RETURNING *
    `
        return { query, parameters }
    }

    // ─── RESTORE ONE ────────────────────────────────────────────────────────────────
    protected restoreOne<T>(
        tableName: string,
        id: string,
        omits: string[] = []
    ): Promise<IDefaultResponse<T>> {
        const { query, parameters } = this.getRestoreOneQuery(tableName, id)
        return new Promise((resolve, reject) => {
            this.executeQuery<T>({ query, parameters, omits })
                .then((result) => resolve(result))
                .catch((err) => {
                    logger.error(err, { dest: 'PgRepository.ts' })
                    return reject(err)
                })
        })
    }

    // ─── GET RESTORE ONE QUERY ──────────────────────────────────────────────────────
    protected getRestoreOneQuery(tableName: string, id: string): IQueryGenerator {
        const parameters = [id]
        const query = /* SQL */ `
      UPDATE ${tableName}
      SET deleted_at = NULL
      WHERE id = (SELECT id FROM ${tableName} WHERE id = $1 LIMIT 1)
      RETURNING *
    `
        return { query, parameters }
    }

    // ─── DELETE ONE ─────────────────────────────────────────────────────────────────
    protected deleteOne<T>(
        tableName: string,
        id: string,
        omits: string[] = []
    ): Promise<IDefaultResponse<T>> {
        const { query, parameters } = this.getDeleteOneQuery(tableName, id)
        return new Promise((resolve, reject) => {
            this.executeQuery<T>({ query, parameters, omits })
                .then((result) => resolve(result))
                .catch((err) => {
                    logger.error(err, { dest: 'PgRepository.ts' })
                    return reject(err)
                })
        })
    }

    // ─── GET DELETE ONE QUERY ───────────────────────────────────────────────────────
    protected getDeleteOneQuery(tableName: string, id: string): IQueryGenerator {
        const parameters = [id]
        const query = /* SQL */ `
        DELETE
        FROM ${tableName}
        WHERE id = (SELECT id FROM ${tableName} WHERE id = $1 LIMIT 1)
        RETURNING *
		`
        return { query, parameters }
    }

    // ─── PAGINATION ─────────────────────────────────────────────────────────────────
    protected paginate<T>(
        tableName: string,
        pagination: IPagination = { limit: 200, page: 1, filter: {} },
        omits: string[] = []
    ): Promise<IPaginate<T>> {
        const { limit, page } = pagination
        const { query, parameters } = this.getPaginateQuery(tableName, pagination)

        return new Promise((resolve, reject) => {
            let total_count: number
            let total_page: number
            let paginateResult: IPaginate<T>

            this.executeQuery({ query, parameters, omits })
                .then((result: any) => {
                    if (result.rowCount) {
                        paginateResult = { ...result, rows: [] }
                        total_count = Number(result.rows[0].total_count)
                        total_page = Math.ceil(total_count / limit)
                        paginateResult.total_count = total_count
                        paginateResult.total_page = total_page
                        paginateResult.page = page
                        paginateResult.limit = limit
                        page !== total_page && (paginateResult.nextPage = page + 1)
                        page - 1 && (paginateResult.prevPage = page - 1)
                        paginateResult.rows = result.rows.map((row: any) =>
                            _.omit(row, ['total_count'])
                        )
                        return resolve(paginateResult)
                    } else {
                        paginateResult = {
                            row_count: 0,
                            rows: [],
                            total_count: 0,
                            total_page: 0,
                            page,
                            limit,
                            nextPage: 0,
                            prevPage: 0
                        }
                        return resolve(paginateResult)
                    }
                })
                .catch((err) => {
                    logger.error(err, { dest: 'PgRepository.ts' })
                    return reject(err)
                })
        })
    }

    // ─── GET PAGINATION QUERY ───────────────────────────────────────────────────────
    protected getPaginateQuery(
        tableName: string,
        pagination: IPagination = { limit: 200, page: 1, filter: {} }
    ): IQueryGenerator {
        const { limit, page } = pagination
        const query = /* SQL */ `SELECT *, count(*) OVER() AS total_count FROM ${tableName} `
        const filter: IFilter = _.assign({ ...pagination.filter, limit, page })
        return this.addFilterToQuery(filter, query)
    }

    // ─── ADD FILTER TO QUERY ────────────────────────────────────────────────────────
    protected addFilterToQuery(filter: IFilter, query: string, index = 0): IQueryGenerator {
        const parameters: string[] = []

        // ───────────────────────────────────────────────── AND WHERE ─────
        if (filter && filter.where) {
            const where = filter.where
            where.map((objItem) => parameters.push(objItem.value))
            query += `\n\tWHERE ${where
                .map((objItem) => `${objItem.field} ${objItem.operator} $${++index}`)
                .join('\n\tAND ')} `
        }

        // ────────────────────────────────────────────────── GROUP BY ─────
        if (filter && filter.group) {
            const group = filter.group
            group.forEach((item) => parameters.push(item))
            query += `\n\tGROUP BY ${group.map(() => `$${++index}`).join(', ')}, "id" `
        }

        // ───────────────────────────────────────────────── ORDER BY ─────
        if (filter && filter.order) {
            const order = filter.order
            order.forEach((item) => parameters.push(item))
            query += `\n\tORDER BY ${order.map(() => `$${++index}`).join(', ')} `
            filter && filter.is_asc ? (query += 'ASC ') : (query += 'DESC ')
        }

        // ────────────────────────────────────────── LIMIT AND OFFSET ─────
        if (filter.limit && filter.page) {
            if (filter.limit) query += `\n\tLIMIT ${filter.limit} `
            if (filter.page) query += `OFFSET ${(filter.page - 1) * filter.limit} `
        }
        query.trim()

        return { query, parameters }
    }

    // ─── TOTAL COUNT ────────────────────────────────────────────────────────────────
    protected totalCount<T>(tableName: string, whereQueries: string[] = []): Promise<number> {
        const query = /* SQL */ `SELECT COUNT(*) FROM ${tableName} ${
            whereQueries.length ? `WHERE ${whereQueries.join(' AND ')}` : ''
        }`
        return new Promise((resolve, reject) => {
            this.executeQuery<T>({ query })
                .then((result) => resolve(Number(result.rows[0].count)))
                .catch((err) => {
                    logger.error(err, { dest: 'PgRepository.ts' })
                    return reject(err)
                })
        })
    }
}

export default PgRepository
