import fs from "fs";
import glob from "glob";
import path from "path";

import { getCurrentDirectory } from "../utils/index.js";

export function getDependenciesNames() {
  console.log("Getting dependencies names...");

  const currentDirectory = getCurrentDirectory(import.meta.url);
  const packageGlobPattern = path
    .resolve(currentDirectory, "../../../repositories/**/package.json")
    .replaceAll("\\", "/");
  const packagesPaths = glob.sync(packageGlobPattern);
  const dependencies = packagesPaths.flatMap((packagePath) => {
    const packageFileBuffer = fs.readFileSync(packagePath);
    const packages = JSON.parse(packageFileBuffer);
    const mergedDependencies = {
      ...packages?.dependencies,
      ...packages?.devDependencies,
    };

    return Object.keys(mergedDependencies);
  });
  const dedupedDependencies = [...new Set(dependencies)];

  console.log("Done");

  return dedupedDependencies;
}
