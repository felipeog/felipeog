const { exec } = require("child_process");

function cloneRepository(repositoryName) {
  return new Promise((resolve, reject) => {
    exec(
      `gh repo clone ${repositoryName} repositories/${repositoryName}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`error: ${error.message}`);
        }

        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }

        resolve(stdout);
      }
    );
  });
}

module.exports = cloneRepository;
