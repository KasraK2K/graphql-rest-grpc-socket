/* ------------------------------ Dependencies ------------------------------ */
import _ from 'lodash'
import { ObjectId } from 'mongodb'
/* ----------------------------- Custom Modules ----------------------------- */
import mongo from '../../bootstrap/mongodb'
/* -------------------------------------------------------------------------- */

class MongoRepository {
    // ─── SELECT ALL ─────────────────────────────────────────────────────────────────
    protected find<T>(
        tableName: string,
        args: Record<string, any> = {},
        omits: string[] = []
    ): Promise<T[]> {
        return new Promise((resolve, reject) => {
            args = this.sanitizeArgs(args)

            mongo
                .collection(tableName)
                .find<T>(args, { projection: this.generateProjection(omits) })
                .toArray()
                .then((result) => {
                    omits.includes('*') ? resolve([]) : resolve(result)
                })
                .catch((err) => reject(err))
        })
    }

    // ─── SELECT ONE ─────────────────────────────────────────────────────────────────
    protected findOne<T>(
        tableName: string,
        args: Record<string, any> = {},
        omits: string[] = []
    ): Promise<T | null> {
        return new Promise((resolve, reject) => {
            args = this.sanitizeArgs(args)

            mongo
                .collection(tableName)
                .findOne<T>(args, { projection: this.generateProjection(omits) })
                .then((result) => {
                    omits.includes('*') ? resolve(null) : resolve(result)
                })
                .catch((err) => reject(err))
        })
    }

    // ─── INSERT ONE ─────────────────────────────────────────────────────────────────
    protected insertOne<T>(
        tableName: string,
        args: Record<string, any>,
        omits: string[] = []
    ): Promise<T | null> {
        return new Promise((resolve, reject) => {
            args = this.sanitizeArgs(args)
            _.assign(args, { createdAt: new Date(), updatedAt: new Date() })

            mongo
                .collection(tableName)
                .insertOne(args)
                .then(async (result) =>
                    resolve(await this.findOne<T>(tableName, { _id: result.insertedId }, omits))
                )
                .catch((err) => reject(err))
        })
    }

    // ─── UPDATE ONE ─────────────────────────────────────────────────────────────────
    protected updateOne<T>(
        tableName: string,
        findArgs: Record<string, any>,
        args: Record<string, any>,
        omits: string[] = []
    ): Promise<T | null> {
        return new Promise((resolve, reject) => {
            findArgs = this.sanitizeArgs(findArgs)
            args = this.sanitizeArgs(args)

            mongo
                .collection(tableName)
                .updateOne(findArgs, { $set: args, $currentDate: { updatedAt: true } })
                .then(async () => resolve(await this.findOne<T>(tableName, findArgs, omits)))
                .catch((err) => reject(err))
        })
    }

    // ─── UPSERT ONE ─────────────────────────────────────────────────────────────────
    protected upsertOne<T>(
        tableName: string,
        findArgs: Record<string, any>,
        args: Record<string, any>,
        options: { upsert: boolean; omits: string[] } = { upsert: true, omits: [] }
    ): Promise<T | null> {
        return new Promise((resolve, reject) => {
            const { upsert, omits } = options
            findArgs = this.sanitizeArgs(findArgs)
            args = this.sanitizeArgs(args)
            const date = new Date()

            mongo
                .collection(tableName)
                .updateOne(
                    findArgs,
                    { $set: { ...args, updatedAt: date }, $setOnInsert: { createdAt: date } },
                    { upsert }
                )
                .then(async () => resolve(await this.findOne<T>(tableName, findArgs, omits)))
                .catch((err) => reject(err))
        })
    }

    // ─── SAFE DELETE ────────────────────────────────────────────────────────────────
    protected safeDeleteOne<T>(
        tableName: string,
        args: Record<string, any>,
        omits: string[] = []
    ): Promise<T | null> {
        return new Promise((resolve, reject) => {
            args = this.sanitizeArgs(args)
            const date = new Date()

            mongo
                .collection(tableName)
                .updateOne(
                    {
                        $and: [args, { deletedAt: { $exists: false } }]
                    },
                    { $set: { deletedAt: date, updatedAt: date } }
                )
                .then(async () => resolve(await this.findOne<T>(tableName, args, omits)))
                .catch((err) => reject(err))
        })
    }

    // ─── DELETE ONE ─────────────────────────────────────────────────────────────────
    protected deleteOne<T>(
        tableName: string,
        args: Record<string, any>,
        omits: string[] = []
    ): Promise<T | null> {
        return new Promise((resolve, reject) => {
            args = this.sanitizeArgs(args)

            mongo
                .collection(tableName)
                .deleteOne(args)
                .then(async () => resolve(await this.findOne<T>(tableName, args, omits)))
                .catch((err) => reject(err))
        })
    }

    // ─── RESTORE ONE ────────────────────────────────────────────────────────────────
    protected restoreOne<T>(
        tableName: string,
        args: Record<string, any>,
        omits: string[] = []
    ): Promise<T | null> {
        return new Promise((resolve, reject) => {
            args = this.sanitizeArgs(args)

            mongo
                .collection(tableName)
                .updateOne(
                    {
                        $and: [args, { deletedAt: { $exists: true } }]
                    },
                    { $unset: { deletedAt: '' }, $set: { updatedAt: new Date() } }
                )
                .then(() => resolve(this.findOne<T>(tableName, args, omits)))
                .catch((err) => reject(err))
        })
    }

    // ────────────────────────────────────────────────────── GENERATE PROJECTION ─────
    private generateProjection(omits: string[]): Record<string, any> {
        const projection: Record<string, any> = {}
        omits.forEach((omit) => (projection[omit] = 0))
        return projection
    }

    private sanitizeArgs(args: Record<string, any>): Record<string, any> {
        if ('id' in args) {
            args._id = new ObjectId(args.id)
            delete args.id
            return args
        } else if ('_id' in args) {
            args._id = new ObjectId(args._id)
            return args
        } else return args
    }

    private isObjectId(id: string): boolean {
        return ObjectId.isValid(id)
    }
}

export default MongoRepository
