import {UserInterface} from '../user-interface';

export interface LoginResponseInterface {
  token: string;
  refreshToken: string;
  user: UserInterface
}
