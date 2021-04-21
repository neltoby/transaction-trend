export { IUsecaseParameter } from './use-case.interface';
import makeUserCase  from './user-use-case';
import makeOtherUserCase from './other-user-usecase'
import { dataAccess } from '../util';

export const userCase = makeUserCase({ dataAccess });
export const otherUserCase = makeOtherUserCase({ dataAccess })
