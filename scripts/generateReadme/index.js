import fs from "fs";
import path from "path";

import {
  cloneRepositories,
  commit,
  getCurrentDirectory,
  getDependenciesNames,
  getReadmeContent,
  getRepositoriesNames,
} from "./utils/index.js";

async function generateReadme() {
  try {
    const repositoriesNames = await getRepositoriesNames();

    await cloneRepositories(repositoriesNames);

    const dependenciesNames = getDependenciesNames();
    const readmeContent = getReadmeContent(dependenciesNames);
    const currentDirectory = getCurrentDirectory(import.meta.url);

    fs.writeFileSync(
      path.resolve(currentDirectory, "../../README.md"),
      readmeContent
    );

    if (process.env.NODE_ENV !== "development") {
      commit();
    }
  } catch (error) {
    console.log(`Error generating readme: ${error}`);
  }
}

generateReadme();
