import React, { useEffect, useReducer } from 'react';
import Header from 'components/Header/Header';
import Search from './Components/Search/Search';
import ItemGroupsAction from './Components/ItemGroupsAction/ItemGroupsAction';
import UserCardsList from './Components/UserCardsList/UserCardsList';
import githubSearchApi from '../../api/search';
import {
  GithubApiSearchInterface,
  UsersInterface,
} from 'interfaces/users.interface';
import itemsReducer from '../../utils/reducer';
import Loading from '../../components/Loading/Loading';

function HomePage() {
  const [state, dispatch] = useReducer(itemsReducer, {
    users: [],
    filters: '',
    isLoading: false,
    error: '',
    noResults: false,
    isEditMode: false,
  });
  const userInfos = state.users;
  const filter = state.filters;
  const isLoading = state.isLoading;
  const selectedItems = state.users.filter((user) => user.selected === true);
  const error = state.error;
  const noResults = state.noResults;
  const isEditMode = state.isEditMode;
  useEffect(() => {
    if (filter) {
      let cancel = false;
      githubSearchApi
        .getUsersProfiles(filter)
        .then((data?: GithubApiSearchInterface) => {
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
  }, [filter]);

  function setFilter(value: string) {
    dispatch({
      type: 'SET_FILTER',
      payload: value,
    });
  }
  function setCheckedInfo(value: number) {
    dispatch({
      type: 'SET_SELECTED',
      payload: value,
    });
  }

  function setEditMode(value: string) {
    if (value === 'on') {
      dispatch({
        type: 'SET_EDIT_MODE',
        payload: true,
      });
    } else if (value === 'off') {
      dispatch({
        type: 'SET_EDIT_MODE',
        payload: false,
      });
    } else {
      throw new Error('setEditMode value is non valid');
    }
  }

  function setSelectAll(value: string) {
    if (value === 'select') {
      dispatch({
        type: 'SELECT_ALL',
      });
    } else if (value === 'unselect') {
      dispatch({
        type: 'UNSELECT_ALL',
      });
    } else {
      throw new Error('setSelectAll value is non valid');
    }
  }

  function copySelectedUsers(users: UsersInterface[]) {
    dispatch({
      type: 'ADD_COPIED_USERS',
      payload: users,
    });
  }

  function deleteSelectedUsers(users: number[]) {
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
      {isLoading ? (
        <Loading />
      ) : (
        <UserCardsList
          usersList={userInfos}
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
