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
        error: '',
        noResults: false,
        users: action.payload,
      };
    case 'SET_NO_RESULTS':
      return {
        ...state,
        error: '',
        users: [],
        noResults: action.payload,
      };
    case 'SET_API_RATE_MESSAGE':
      return {
        ...state,
        users: [],
        noResults: false,
        error: action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        users: [],
        filters: action.payload,
      };
    case 'SET_SELECTED':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id !== action.payload ? u : { ...u, selected: !u.selected }
        ),
      };
    case 'SELECT_ALL':
      return {
        ...state,
        users: state.users.map((u) =>
          u.selected === true ? u : { ...u, selected: true }
        ),
      };
    case 'UNSELECT_ALL':
      return {
        ...state,
        users: state.users.map((u) =>
          u.selected === false ? u : { ...u, selected: false }
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
