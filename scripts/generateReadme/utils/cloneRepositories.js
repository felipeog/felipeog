const { exec } = require("child_process");

function cloneRepository(repositoryName) {
  return new Promise((resolve, reject) => {
    exec(
      `gh repo clone ${repositoryName} repositories/${repositoryName} -- --bare`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`error: ${error.message}`);
        }

        resolve(stdout);
      }
    );
  });
}

function cloneRepositories(repositoriesNames) {
  console.log("Cloning repositories...");

  const clonePromises = repositoriesNames.map((repositoryName) =>
    cloneRepository(repositoryName)
  );

  return Promise.all(clonePromises).then(() => console.log("Done"));
}

module.exports = cloneRepositories;
