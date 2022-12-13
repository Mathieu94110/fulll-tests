import { GithubApiSearchInterface } from '../interfaces/users.interface';

const baseUrl: string = 'https://api.github.com/search/users';

async function getUsersProfiles(
  value: string
): Promise<GithubApiSearchInterface | undefined> {
  try {
    const response = await fetch(`${baseUrl}?q=${value}`);
    return response.json();
  } catch (err) {
    console.error(err);
  }
}

const githubSearchApi = {
  getUsersProfiles,
};

export default githubSearchApi;
