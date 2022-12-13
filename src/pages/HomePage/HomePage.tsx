import { useEffect, useReducer } from 'react';
import Header from '../../ui-components/Header/Header';
import Search from '../../ui-components/Search/Search';
import ItemGroupsAction from './components/ItemGroupsAction/ItemGroupsAction';
import UserCardsList from './components/UserCardsList/UserCardsList';
import githubSearchApi from '../../api/search';
import {
  GithubApiSearchInterface,
  UsersInterface,
} from 'interfaces/users.interface';
import itemsReducer from '../../utils/reducer';
import Loading from '../../ui-components/Loading/Loading';

function HomePage() {
  const [state, dispatch] = useReducer(itemsReducer, {
    users: [],
    filters: '',
    isLoading: false,
    error: '',
    noResults: false,
    isEditMode: false,
  });

  const { users, filters, isLoading, error, noResults, isEditMode } = state;
  let selectedItems = users.filter(
    (user: UsersInterface) => user.selected === true
  );

  useEffect(() => {
    if (filters) {
      // cancel on below is used in order to avoid make same request twice
      let cancel = false;
      githubSearchApi
        .getUsersProfiles(filters)
        .then((data?: GithubApiSearchInterface): void => {
          if (data?.message) {
            dispatch({
              type: 'SET_API_RATE_MESSAGE',
              payload: data.message,
            });
          } else {
            if (!cancel) {
              if (typeof data !== 'undefined' && data.total_count > 0) {
                const selectedProperty: { selected: boolean } = {
                  selected: false,
                };
                const uniqUsers = new Set(data.items?.map((user) => user));
                const uniqUsersInArray = Array.from(uniqUsers).map((user) =>
                  Object.assign(user, selectedProperty)
                );
                dispatch({
                  type: 'SET_USERS_INFO',
                  payload: uniqUsersInArray,
                });
              } else {
                dispatch({
                  type: 'SET_NO_RESULTS',
                  payload: true,
                });
              }
            }
          }
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          dispatch({
            type: 'SET_LOADING',
            payload: false,
          });
        });
    } else {
      const emptyArray: UsersInterface[] = [];
      dispatch({
        type: 'SET_USERS_INFO',
        payload: emptyArray,
      });
    }
  }, [filters]);

  function setFilter(value: string): void {
    dispatch({
      type: 'SET_FILTER',
      payload: value,
    });
  }
  function setCheckedInfo(value: number): void {
    dispatch({
      type: 'SET_SELECTED',
      payload: value,
    });
  }

  function setEditMode(value: string): void {
    dispatch({
      type: 'SET_EDIT_MODE',
      payload: value === 'on' ? true : false,
    });
  }

  function setSelectAll(value: string): void {
    dispatch({
      type: value === 'select' ? 'SELECT_ALL' : 'UNSELECT_ALL',
    });
  }

  function copySelectedUsers(users: UsersInterface[]): void {
    dispatch({
      type: 'ADD_COPIED_USERS',
      payload: users,
    });
  }

  function deleteSelectedUsers(users: number[]): void {
    dispatch({
      type: 'SET_DELETE',
      payload: users,
    });
  }

  return (
    <div className="home-page">
      <Header />
      <Search setFilter={setFilter} />
      {error && <h2 className="api-rate-error">{error}</h2>}
      {noResults && <h2 className="api-no-results">No results found</h2>}
      {!!selectedItems.length && isEditMode && (
        <ItemGroupsAction
          selected={selectedItems}
          copySelectedUsers={copySelectedUsers}
          deleteSelectedUsers={deleteSelectedUsers}
        />
      )}
      {isLoading && filters ? (
        <Loading />
      ) : (
        <UserCardsList
          usersList={users}
          selected={selectedItems}
          setEditMode={setEditMode}
          setCheckedInfo={setCheckedInfo}
          setSelectAll={setSelectAll}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
}

export default HomePage;
