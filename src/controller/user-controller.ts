import { IUsecaseParameter } from '../use-case';
import LogClass from '../logger/service';

export default function makeUserController (userCase:
  (req: IUsecaseParameter) => any, logger: LogClass) {
  return async function userController (httpRequest: {headers: any, params: { id:number }, ip: string}): Promise<any> {
    try{
      const { headers, params: { id }, ip } = httpRequest;
      if(!id){
        throw {
          statusCode: 400,
          status: 'Bad request',
          message: 'Unique identifier missing',
        };
      }               
      const source: {ip: string, browser: string, referrer?: string} = {ip, browser: headers['User-Agent']};
      if (headers['Referer']) {
        source.referrer = headers['Referer'];
      }
      const req = { id, source }
      const res = await userCase(req);
      return {
        headers: {
          'Content-Type': 'application/json',
        }, 
        statusCode: 200,
        body: res,
      };
    }catch(e) {
      logger.error(e.message == undefined ? e : e.message);
      return {
        headers: {
            'Content-Type': 'application/json',
        }, 
        statusCode: e.statusCode,
        body: {
            error: e.message
        }
      };
    }
  }
}