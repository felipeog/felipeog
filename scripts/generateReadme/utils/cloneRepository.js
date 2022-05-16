const { execSync } = require("child_process");

function cloneRepository(repositoryName) {
  execSync(`gh repo clone ${repositoryName} repositories/${repositoryName}`);
}

module.exports = cloneRepository;
