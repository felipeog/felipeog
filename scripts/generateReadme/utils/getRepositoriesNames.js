const { exec } = require("child_process");

function getRepositoriesNames() {
  return new Promise((resolve, reject) => {
    exec(
      `gh repo list --json nameWithOwner --limit 3`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`error: ${error.message}`);
        }

        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }

        const repositories = JSON.parse(stdout);
        const repositoriesNames = repositories.map(
          (repository) => repository.nameWithOwner
        );

        resolve(repositoriesNames);
      }
    );
  });
}

module.exports = getRepositoriesNames;
