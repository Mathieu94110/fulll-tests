import { GithubApiSearchInterface } from '../interfaces/users.interface';

const baseUrl = 'https://api.github.com/search/users';

async function getUsersProfiles(
  value: string
): Promise<GithubApiSearchInterface | undefined> {
  try {
    console.log(`${baseUrl}?q=${value}`);
    const response = await fetch(`${baseUrl}?q=${value}`);
    const result = response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}

const githubSearchApi = {
  getUsersProfiles,
};

export default githubSearchApi;
