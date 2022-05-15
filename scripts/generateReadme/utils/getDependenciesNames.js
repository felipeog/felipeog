const path = require("path");
const glob = require("glob");

function getDependenciesNames() {
  const packageGlobPattern = path
    .resolve(__dirname, "../repositories/**/package.json")
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
  const filteredDependencies = dedupedDependencies.filter(
    (dependency) => !dependency.startsWith("@types/")
  );
  const sortedDependencies = filteredDependencies.sort((a, b) =>
    a.localeCompare(b)
  );

  return sortedDependencies;
}

module.exports = getDependenciesNames;
