if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const fs = require("fs");
const path = require("path");

const {
  getRepositoriesNames,
  getDependenciesNames,
  getReadmeContent,
  cloneRepositories,
  commit,
} = require("./utils");

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
