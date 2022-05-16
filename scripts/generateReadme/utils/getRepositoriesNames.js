const { exec } = require("child_process");

function getRepositoriesNames() {
  console.log("Getting repositories names...");

  return new Promise((resolve, reject) => {
    exec(
      `gh repo list --public --json nameWithOwner`,
      // `gh repo list --visibility public --json nameWithOwner --limit 2`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`error: ${error.message}`);
        }

        const repositories = JSON.parse(stdout);
        const repositoriesNames = repositories.map(
          (repository) => repository.nameWithOwner
        );

        console.log("Done");

        resolve(repositoriesNames);
      }
    );
  });
}

module.exports = getRepositoriesNames;
