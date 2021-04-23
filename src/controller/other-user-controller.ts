import LogClass from '../logger/service';

export default ({ otherUserCase, logger }: { otherUserCase: 
  (req: { id: number, source: {ip: string, browser: string, referrer?: string}}) => any, logger: LogClass}) => {
  return async function otherUserController (httpRequest: any): Promise<any> {
    try{
      const { headers, params: { id }, ip } = httpRequest;
      if(!id || isNaN(id)){
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
      const res = await otherUserCase(req);
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
        statusCode: e.statusCode ? e.statusCode : 500,
        body: {
            error: e.message ? e.message : 'Server error'
        }
      };
    }
  }
}