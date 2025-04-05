import {UserInterface} from '../user-interface';

export interface RegisterResponseInterface {
  token: string;
  refreshToken: string;
  user: UserInterface
}
