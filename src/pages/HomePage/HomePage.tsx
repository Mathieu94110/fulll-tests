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
import itemsReducer from '../../utils/Reducer';
import Loading from '../../components/Loading/Loading';

function HomePage() {
  const [state, dispatch] = useReducer(itemsReducer, {
    users: [],
    filters: '',
    isLoading: false,
    error: '',
    noResults: false,
  });
  const userInfos = state.users;
  const filter = state.filters;
  const isLoading = state.isLoading;
  const selectedItems = state.users.filter((user) => user.selected === true);
  const error = state.error;
  const noResults = state.noResults;

  useEffect(() => {
    if (filter) {
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      });
      // Cancel below is used in order to avoid performing request twice
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
      {!!selectedItems.length && (
        <ItemGroupsAction
          selected={selectedItems}
          deleteSelectedUsers={deleteSelectedUsers}
        />
      )}
      {isLoading && !userInfos ? (
        <Loading />
      ) : (
        <UserCardsList
          usersList={userInfos}
          selected={selectedItems}
          setCheckedInfo={setCheckedInfo}
        />
      )}
    </div>
  );
}

export default HomePage;
