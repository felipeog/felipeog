import { octokit } from "../services/index.js";

export async function getRepositoriesNames(user) {
  console.log("Getting repositories names...");

  try {
    const response = await octokit.request(`GET /users/${user.name}/repos`, {
      direction: "desc",
      page: 1,
      per_page: 100,
      sort: "pushed",
      type: "owner",
    });
    const repositories = response?.data ?? [];
    const repositoriesNames = repositories.map((repository) => {
      return repository.full_name;
    });

    console.log("Done");

    return repositoriesNames;
  } catch (error) {
    console.log(`Error getting repositories names: ${error}`);
  }
}
