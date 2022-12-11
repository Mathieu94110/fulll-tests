import React, { useEffect, useReducer } from 'react';
import Header from 'components/Header/Header';
import Search from './Components/Search/Search';
import ItemGroupsAction from './Components/ItemGroupsAction/ItemGroupsAction';
import UserCardsList from './Components/UserCardsList/UserCardsList';
import githubSearchApi from '../../api/search';
import { GithubApiSearchInterface } from 'interfaces/users.interface';
import itemsReducer from '../../utils/Reducer';
import Loading from '../../components/Loading/Loading';

function HomePage() {
  const [state, dispatch] = useReducer(itemsReducer, {
    users: [],
    filters: '',
    isLoading: false,
  });
  const userInfos = state.users;
  const filter = state.filters;
  const isLoading = state.isLoading;
  const selectedItems = state.users.filter((user) => user.selected === true);

  useEffect(() => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });
    // Cancel below is used in order to avoid performing request twice
    let cancel = false;
    githubSearchApi
      .getUsersProfiles(filter)
      .then((users?: GithubApiSearchInterface) => {
        if (!cancel) {
          if (typeof users !== 'undefined') {
            const selectedProperty: { selected: boolean } = { selected: false };
            const uniqUsers = new Set(users.items.map((user) => user));
            const uniqUsersInArray = Array.from(uniqUsers).map((user) =>
              Object.assign(user, selectedProperty)
            );
            dispatch({
              type: 'SET_USERS_INFO',
              payload: uniqUsersInArray,
            });
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
      {!!selectedItems.length && (
        <ItemGroupsAction
          selected={selectedItems}
          deleteSelectedUsers={deleteSelectedUsers}
        />
      )}
      {isLoading && !userInfos ? (
        <Loading />
      ) : (
        <UserCardsList usersList={userInfos} setCheckedInfo={setCheckedInfo} />
      )}
    </div>
  );
}

export default HomePage;
