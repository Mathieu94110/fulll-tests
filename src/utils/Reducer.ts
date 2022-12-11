import { usersInitialInterface } from 'interfaces/itemsReducer.interface';
import { ACTIONTYPE } from 'types/actions';

function itemsReducer(state: usersInitialInterface, action: ACTIONTYPE) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_USERS_INFO':
      return {
        ...state,
        users: action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filters: action.payload,
      };
    case 'SET_SELECTED':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id !== action.payload ? u : { ...u, selected: !u.selected }
        ),
      };
    case 'SET_DELETE':
      return {
        ...state,
        users: state.users.filter(
          (user) => !action.payload.some((id) => user.id === id)
        ),
      };
    default: {
      throw new Error('action inconnue');
    }
  }
}
export default itemsReducer;
