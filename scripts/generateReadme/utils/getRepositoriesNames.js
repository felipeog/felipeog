const { octokit } = require("../services");

async function getRepositoriesNames() {
  console.log("Getting repositories names...");

  try {
    const response = await octokit.request("GET /users/felipeog/repos", {
      type: "owner",
      sort: "pushed",
      direction: "desc",
      per_page: 100,
      page: 1,
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

module.exports = getRepositoriesNames;
