const fs = require("fs");
const glob = require("glob");
const path = require("path");

const { dependencyRules } = require("../consts");

function checkRules({ string, rules }) {
  if (rules.equal.length) {
    const equal = rules.equal.some((equalRule) => {
      return string === equalRule;
    });

    if (equal) {
      return true;
    }
  }

  if (rules.include.length) {
    const include = rules.include.some((includeRule) => {
      return string.includes(includeRule);
    });

    if (include) {
      return true;
    }
  }

  if (rules.start.length) {
    const start = rules.start.some((startRule) => {
      return string.startsWith(startRule);
    });

    if (start) {
      return true;
    }
  }

  if (rules.end.length) {
    const end = rules.end.some((endRule) => {
      return string.endsWith(endRule);
    });

    if (end) {
      return true;
    }
  }

  return false;
}

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
    const isDependencyAllowed = checkRules({
      string: dependency,
      rules: dependencyRules.allowed,
    });

    if (isDependencyAllowed) {
      return true;
    }

    const isDependencyNotAllowed = checkRules({
      string: dependency,
      rules: dependencyRules.notAllowed,
    });

    if (isDependencyNotAllowed) {
      return false;
    }

    return true;
  });
  const sortedDependencies = filteredDependencies.sort((a, b) => {
    return a.localeCompare(b);
  });

  console.log("Done");

  return sortedDependencies;
}

module.exports = getDependenciesNames;
