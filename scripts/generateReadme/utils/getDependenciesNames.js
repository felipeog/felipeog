const fs = require("fs");
const path = require("path");
const glob = require("glob");

const dependencyRules = require("../consts/dependencyRules");

function getDependenciesNames() {
  console.log("Getting dependencies names...");

  const packageGlobPattern = path
    .resolve(__dirname, "../../../repositories/**/package.json")
    .replaceAll("\\", "/");
  const packagesPaths = glob.sync(packageGlobPattern);
  const dependencies = packagesPaths.flatMap((packagePath) => {
    const packageFileBuffer = fs.readFileSync(packagePath);
    const package = JSON.parse(packageFileBuffer);
    const mergedDependencies = {
      ...package?.dependencies,
      ...package?.devDependencies,
    };

    return Object.keys(mergedDependencies);
  });
  const dedupedDependencies = [...new Set(dependencies)];
  const filteredDependencies = dedupedDependencies.filter((dependency) => {
    if (dependencyRules.allowedList.includes(dependency)) {
      return true;
    }

    const isStartsWithValid = dependencyRules.startsWithList.every(
      (notAllowed) => !dependency.startsWith(notAllowed)
    );
    const isIncludesValid = dependencyRules.includesList.every(
      (notAllowed) => !dependency.includes(notAllowed)
    );

    return isStartsWithValid && isIncludesValid;
  });
  const sortedDependencies = filteredDependencies.sort((a, b) =>
    a.localeCompare(b)
  );

  console.log("Done");

  return sortedDependencies;
}

module.exports = getDependenciesNames;
