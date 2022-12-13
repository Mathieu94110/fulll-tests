import UserCardItem from './UserCardItem';
import React from 'react';
import { render, screen } from '@testing-library/react';

const CHECKBOX_ID = 'card-checkbox';

const userInfosMocked = {
  login: 'mathieu',
  id: 17992,
  node_id: 'MDQ6VXNlcjE3OTky',
  avatar_url: 'https://avatars.githubusercontent.com/u/17992?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/mathieu',
  html_url: 'https://github.com/mathieu',
  followers_url: 'https://api.github.com/users/mathieu/followers',
  following_url: 'https://api.github.com/users/mathieu/following{/other_user}',
  gists_url: 'https://api.github.com/users/mathieu/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/mathieu/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/mathieu/subscriptions',
  organizations_url: 'https://api.github.com/users/mathieu/orgs',
  repos_url: 'https://api.github.com/users/mathieu/repos',
  events_url: 'https://api.github.com/users/mathieu/events{/privacy}',
  received_events_url: 'https://api.github.com/users/mathieu/received_events',
  type: 'User',
  site_admin: false,
  score: 1.0,
};

it('changes style of div as checkbox is checked/unchecked', () => {
  const setCheckedInfoMocked = jest.fn();

  const { rerender } = render(
    <UserCardItem
      userInfos={{ ...userInfosMocked, selected: false }}
      setCheckedInfo={() => setCheckedInfoMocked}
      isEditMode={true}
    />
  );
  const checkbox = screen.getByTestId(CHECKBOX_ID) as HTMLInputElement;
  expect(checkbox).not.toBeChecked();
  rerender(
    <UserCardItem
      userInfos={{ ...userInfosMocked, selected: true }}
      setCheckedInfo={() => setCheckedInfoMocked}
      isEditMode={true}
    />
  );
  expect(checkbox.checked).toEqual(true);
  rerender(
    <UserCardItem
      userInfos={{ ...userInfosMocked, selected: false }}
      setCheckedInfo={() => setCheckedInfoMocked}
      isEditMode={true}
    />
  );
  expect(checkbox.checked).toEqual(false);
});
it('should display the correct userId', () => {
  expect(userInfosMocked).toHaveProperty('id', 17992);
});
