import React from 'react';
import Header from 'components/Header/Header';
import Search from './Components/Search/Search';
import ItemGroupsAction from './Components/ItemGroupsAction/ItemGroupsAction';
import UserCardsList from './Components/UserCardsList/UserCardsList';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <Search />
      <ItemGroupsAction />
      <UserCardsList />
    </div>
  );
}

export default HomePage;
