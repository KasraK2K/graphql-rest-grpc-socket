//===============================================================================
//
//  #####    #####    #####   ######   ####  ######  #####      ###    #####
//  ##  ##  ##   ##  ##   ##    ##    ##       ##    ##  ##    ## ##   ##  ##
//  #####   ##   ##  ##   ##    ##     ###     ##    #####    ##   ##  #####
//  ##  ##  ##   ##  ##   ##    ##       ##    ##    ##  ##   #######  ##
//  #####    #####    #####     ##    ####     ##    ##   ##  ##   ##  ##
//
//===============================================================================

// ──────────────────────────────────────────────────────────────────────────────────
//   :::::: R E F L E C T   M E T A D A T A : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
import 'reflect-metadata'
import './extend'
import './environment'
import './requirements'

import mongoClient from './mongodb'
import postgresPool from './postgresql'
import knex from './knex'
import { createRedisClient } from './redis'
import './cron-jobs/index'
import './rabbitmq-consumers'

export { mongoClient }
export { postgresPool }
export { knex }
export { createRedisClient }
