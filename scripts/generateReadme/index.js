import fs from "fs";
import path from "path";

import {
  cloneRepositories,
  commitReadme,
  getCurrentDirectory,
  getDependenciesNames,
  getReadmeContent,
  getRepositoriesNames,
} from "./utils/index.js";
import { user } from "./consts/index.js";

async function generateReadme() {
  try {
    const repositoriesNames = await getRepositoriesNames(user);

    await cloneRepositories(repositoriesNames);

    const dependenciesNames = getDependenciesNames();
    const readmeContent = getReadmeContent(dependenciesNames);
    const currentDirectory = getCurrentDirectory(import.meta.url);

    fs.writeFileSync(
      path.resolve(currentDirectory, "../../README.md"),
      readmeContent
    );

    if (process.env.NODE_ENV !== "development") {
      commitReadme(user);
    }
  } catch (error) {
    console.log(`Error generating readme: ${error}`);
  }
}

generateReadme();
