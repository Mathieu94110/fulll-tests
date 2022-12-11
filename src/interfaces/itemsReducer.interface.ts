import { UsersInterface } from './users.interface';

export interface usersInitialInterface {
  users: UsersInterface[] | [];
  noResults: boolean;
  filters: string;
  isLoading: boolean;
  error: string;
}
