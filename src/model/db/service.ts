import { Pool } from 'pg'

import logger from '../../logger'
import { IDatabaseConfigAttributes  } from '../dbInterface/dbConfig.interface'

export default class Database{
  connected: boolean = false;
  outputString: string = 'initializing connection.';
  pool: Pool
  client: any
  logger = logger
  
  // static client: any;
  // static pool: Pool;
  static connected: boolean;

  constructor(public config: IDatabaseConfigAttributes){
    this.pool = new Pool(this.config)
    // this.connect();
  }

  protected async connect() {
    try{
      this.logger.info(this.outputString)
      if(!this.connected){     
        this.client = await this.pool.connect(); 
        this.connected = true;
      }     
      this.outputString = 'Database has been connected.'
    }catch(e){
      this.outputString = 'Failed to connect to database.';
      await this.logger.error(e)
    }finally{
        this.logger.info(this.outputString);
    }
  }

  async disconnect(): Promise<void> {
    try{
    this.outputString = 'Disconnecting ...';
    await this.logger.info(this.outputString);
    await this.pool.end();
    this.outputString = 'Disconneted ...';
    await this.logger.info(this.outputString);
    } catch(e) {
      this.outputString = 'Failed to disconnect,';
      await this.logger.error(this.outputString);
      await this.logger.error(e)
    }
  }
}