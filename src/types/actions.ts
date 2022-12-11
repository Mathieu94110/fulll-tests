import {
  UsersInterface,
  // selectedUsersInterface,
} from 'interfaces/users.interface';

export type ACTIONTYPE =
  | { type: 'SET_USERS_INFO'; payload: UsersInterface[] }
  | { type: 'SET_NO_RESULTS'; payload: boolean }
  | { type: 'SET_API_RATE_MESSAGE'; payload: string }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SELECTED'; payload: number }
  | { type: 'SET_DELETE'; payload: number[] };
