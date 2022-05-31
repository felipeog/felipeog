const fs = require("fs");
const path = require("path");

const getRepositoriesNames = require("./utils/getRepositoriesNames");
const getDependenciesNames = require("./utils/getDependenciesNames");
const getReadmeContent = require("./utils/getReadmeContent");
const cloneRepositories = require("./utils/cloneRepositories");
const commit = require("./utils/commit");

async function generateReadme() {
  try {
    const repositoriesNames = await getRepositoriesNames();

    await cloneRepositories(repositoriesNames);

    const dependenciesNames = getDependenciesNames();
    const readmeContent = getReadmeContent(dependenciesNames);

    fs.writeFileSync(path.resolve(__dirname, "../../README.md"), readmeContent);

    if (process.env.NODE_ENV !== "development") {
      commit();
    }
  } catch (error) {
    console.log(`Error generating readme: ${error}`);
  }
}

generateReadme();
