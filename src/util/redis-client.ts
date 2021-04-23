import redis  from 'redis';
import { promisify } from 'util';

import logger from '../logger';

const client = redis.createClient({
    host: process.env.REDIS_HOSTNAME,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
})

client.on('ready', async () => {
    await logger.info(
        `${new Date()} - redis.connection.ready`
    )
}) 

client.on('connect', async () => {
    await logger.info(
        `${new Date()} - redis.connection.connected`
    )
})

client.on('error', (err: any) => {
    logger.error(
        `${new Date()} - redis.connection.failed :::: ${err.message}`
    )
}) 

const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.setex).bind(client)

const cacheVariable = async ({ varName , varValue }: {varName: string, varValue: any }) => {
    if(!varName){
        logger.error(
            `${new Date()} :::: cacheVariable function :::: varName is missing`
        )
        throw {
            message: 'varName is missing'
        }
    }
    if(!varValue){
        logger.error(
            `${new Date()} :::: cacheVariable function :::: varValue is missing`
        )
        throw {
            message: 'varValue is missing'
        }
    }
    const cached = await setAsync(varName, 180, JSON.stringify(varValue))
    logger.info(
        `${new Date()} :::: cacheVariable function :::: varName: ${varName} :::: varValue: ${varValue}`
    )
    if(cached === 'OK'){
        logger.info(
            `${new Date()} :::: cacheVariable function :::: caching was succesfull`
        )
        return {
            action: 'caching',
            success: true,
            message: 'caching was succesfull'
        }
    }
    logger.info(
        `${new Date()} :::: cacheVariable function :::: caching was not succesfull`
    )
    return {
        action: 'caching',
        success: false,
        message: 'caching was not succesfull'
    }
}

const getVariable = async (varName: string) => {
    if(!varName){
        logger.error(
            `${new Date()} :::: getVariable function :::: varName is missing`
        )
        throw {
            message: 'varName is missing'
        }
    }
    logger.info(
        `${new Date()} :::: getVariable function :::: client.get method :::: varName :::: ${varName}`
    )
    const getResponse = await getAsync(varName)
    if(getResponse){
        logger.info(
            `${new Date()} :::: getVariable function :::: client.get method :::: response exist :::: ${getResponse}`
        )
        return {
            action: 'get_cache',
            success: true,
            message: 'cached value exist',
            value: JSON.parse(getResponse),
        }
    }else{
        logger.info(
            `${new Date()} :::: getVariable function :::: client.get method :::: response do not exist`
        )
        return {
            action: 'get_cache',
            success: false,
            message: 'cached value does not exist',
        }
    }
}

export const cache = {
    getVariable,
    cacheVariable,
} 