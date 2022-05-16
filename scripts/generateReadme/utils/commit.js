const { execSync } = require("child_process");

const email = "17603069+felipeog@users.noreply.github.com";
const name = "felipeog";

function quietExecSync(command) {
  execSync(command, { stdio: "pipe" });
}

function commit() {
  console.log("Commiting...");

  try {
    quietExecSync(`git config user.email "${email}"`);
    quietExecSync(`git config user.name "${name}"`);
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
