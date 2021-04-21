import { Request, Response } from 'express'; 

import logger from '../logger';

const apiRoot: string = process.env.API_ROOT;

export default (controller: (body: any) => any): any => {
  return async (req: Request, res: Response) => {
    const { 
      params,
      ip,
      path,
      method
    } = req;
    const headers = {
      'Content-Type': req.get('Content-Type'),
      Referer: req.get('referer'),
      'User-Agent': req.get('User-Agent'),
    };
    try {
      logger.info(
        `${new Date()} - server.${apiRoot}${path} ${method} method request./`
      )
      ;
      controller({params, headers, ip}).then((httpResponse: any) => {
        const { statusCode, body } = httpResponse;
        res.status(statusCode).json(body);
      });
    } catch (e) {
      logger.info(
        `${new Date()} :::: server.postRequest.${apiRoot}/event.httpadapter :::: ${e.message}`
      );
      res.status(500).json({error: 'Server error', status});
    }
  }
};