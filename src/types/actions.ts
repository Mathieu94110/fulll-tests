import { UsersInterface } from 'interfaces/users.interface';

export type ACTIONTYPE =
  | { type: 'SET_USERS_INFO'; payload: UsersInterface[] | [] }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };
