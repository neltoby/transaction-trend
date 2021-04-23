export { IUsecaseParameter } from './use-case.interface';
import makeUserCase  from './user-use-case';
import makeAllUserCase from './all-user-usecase';
import makeOtherUserCase from './other-user-usecase'
import { dataAccess } from '../util';
import { cache } from '../util';
import logger from '../logger';

export const userCase = makeUserCase({ dataAccess });
export const otherUserCase = makeOtherUserCase({ dataAccess });
export const allUserCase = makeAllUserCase({dataAccess, cache, logger});
