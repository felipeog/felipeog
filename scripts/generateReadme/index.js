const fs = require("fs");
const path = require("path");

const getRepositoriesNames = require("./utils/getRepositoriesNames");
const cloneRepository = require("./utils/cloneRepository");
const getDependenciesNames = require("./utils/getDependenciesNames");
const getReadmeContent = require("./utils/getReadmeContent");
const commit = require("./utils/commit");

(async function () {
  try {
    const repositoriesNames = await getRepositoriesNames();

    for (let index = 0; index < repositoriesNames.length; index++) {
      const repositoryName = repositoriesNames[index];

      await cloneRepository(repositoryName);
    }

    const dependenciesNames = getDependenciesNames();
    const readmeContent = getReadmeContent(dependenciesNames);

    fs.writeFileSync(path.resolve(__dirname, "../../README.md"), readmeContent);

    commit();
  } catch (error) {
    console.log(error);
  }
})();
