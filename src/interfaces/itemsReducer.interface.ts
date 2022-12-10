import { UsersInterface } from './users.interface';

export interface usersInitialInterface {
  users: UsersInterface[] | [];
  filters: string;
  isLoading: boolean;
}
