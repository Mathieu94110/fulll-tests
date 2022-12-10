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

  useEffect(() => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });
    // Cancel below is used in order to avoid performing request twice
    let cancel = false;
    githubSearchApi
      .getUsersProfiles(filter)
      .then((usersInfo?: GithubApiSearchInterface) => {
        console.log(usersInfo);
        if (!cancel) {
          if (typeof usersInfo !== 'undefined') {
            dispatch({
              type: 'SET_USERS_INFO',
              payload: usersInfo.items,
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

  return (
    <div className="home-page">
      <Header />
      <Search setFilter={setFilter} />
      <ItemGroupsAction />
      {isLoading && !userInfos ? (
        <Loading />
      ) : (
        <UserCardsList usersList={userInfos} />
      )}
    </div>
  );
}

export default HomePage;
