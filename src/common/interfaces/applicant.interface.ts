import { UserType } from '../enums/general.enum'
import { IUser } from './user.interface'
import { IAdmin } from './admin.interface'

export interface IAdminApplicant extends IAdmin {
    type: UserType
    accesses: number[]
}

export interface IUserApplicant extends IUser {
    type: UserType
    accesses: number[]
}

export type IApplicant = IAdminApplicant | IUserApplicant
