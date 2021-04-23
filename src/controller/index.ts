import makeUserController from './user-controller';
import makeOtherUserController from './other-user-controller';
import makeAllUserController from './all-user-controller';
import { userCase, otherUserCase, allUserCase } from '../use-case';
import logger from '../logger';

export const userController = makeUserController(userCase, logger);
export const otherUserController = makeOtherUserController({ otherUserCase, logger });
export const allUserController = makeAllUserController(allUserCase, logger);