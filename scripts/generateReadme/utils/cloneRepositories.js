const { exec } = require("child_process");

function cloneRepository(repositoryName) {
  return new Promise((resolve, reject) => {
    exec(
      `git clone https://github.com/${repositoryName}.git repositories/${repositoryName} --depth 1`,
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

  const clonePromises = repositoriesNames.map((repositoryName) => {
    return cloneRepository(repositoryName);
  });

  return Promise.all(clonePromises)
    .then(() => {
      console.log("Done");
    })
    .catch((error) => {
      console.log(`Error cloning repositories: ${error}`);
    });
}

module.exports = cloneRepositories;
