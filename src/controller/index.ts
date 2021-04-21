import makeUserController from './user-controller';
import makeOtherUserController from './other-user-controller';
import { userCase, otherUserCase } from '../use-case';
import logger from '../logger';

export const userController = makeUserController(userCase, logger);
export const otherUserController = makeOtherUserController({ otherUserCase, logger });