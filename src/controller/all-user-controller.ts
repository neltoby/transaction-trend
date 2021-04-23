import LogClass from '../logger/service';

export default function makeAllUserController (allUserCase:
  (req: {ip: string, browser: string, referrer?: string} ) => any, logger: LogClass) {
  return async function allUserController (httpRequest: {headers: any, ip: string}): Promise<any> {
    try{
      const { headers, ip } = httpRequest;              
      const source: {ip: string, browser: string, referrer?: string} = {ip, browser: headers['User-Agent']};
      if (headers['Referer']) {
        source.referrer = headers['Referer'];
      }
      const req = { source }
      const res = await allUserCase(source);
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