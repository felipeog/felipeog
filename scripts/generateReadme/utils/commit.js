const { execSync } = require("child_process");

const EMAIL = "17603069+felipeog@users.noreply.github.com";
const NAME = "felipeog";

function quietExecSync(command) {
  execSync(command, { stdio: "pipe" });
}

function commit() {
  console.log("Commiting...");

  try {
    quietExecSync(`git config user.email "${EMAIL}"`);
    quietExecSync(`git config user.name "${NAME}"`);
    quietExecSync("git add README.md");
    quietExecSync(
      'git diff-index --quiet HEAD || git commit -m "Update README.md"'
    );
    quietExecSync("git push -u origin HEAD");

    console.log("Done");
  } catch (error) {
    console.log(`Error commiting: ${error}`);
  }
}

module.exports = commit;
